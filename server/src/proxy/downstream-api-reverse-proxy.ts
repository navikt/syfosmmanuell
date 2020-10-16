import authUtils from '../auth/utils';
import config, { ProxyConfig } from '../config';
import proxy from 'express-http-proxy';
import url from 'url';
import { Client } from 'openid-client';
import { Request, Router } from 'express';
import { RequestOptions } from 'https';
import logger from '../logging';

const options = (proxyConfig: ProxyConfig, authClient: Client) => ({
  parseReqBody: true,
  proxyReqOptDecorator: (options: RequestOptions, req: Request) => {
    return new Promise<RequestOptions>((resolve, reject) =>
      authUtils.getOnBehalfOfAccessToken(authClient, req, proxyConfig, 'proxy').then(
        (access_token) => {
          if (options.headers) {
            options.headers.Authorization = `Bearer ${access_token}`;
            resolve(options);
          } else {
            throw new Error('Could not set Authorization header for downstream api proxy request');
          }
        },
        (error) => reject(error),
      ),
    );
  },
  proxyReqPathResolver: (req: Request) => {
    const urlFromApi = url.parse(proxyConfig.url);
    const pathFromApi = urlFromApi.pathname === '/' ? '' : urlFromApi.pathname;

    const urlFromRequest = url.parse(req.originalUrl);
    const pathFromRequest = urlFromRequest.pathname?.replace(`/${proxyConfig.path}/`, '/');

    const queryString = urlFromRequest.query;
    const newPath =
      (pathFromApi ? pathFromApi : '') +
      (pathFromRequest ? pathFromRequest : '') +
      (queryString ? '?' + queryString : '');

    logger.info(`Proxying request from '${req.originalUrl}' to '${stripTrailingSlash(urlFromApi.href)}${newPath}'`);
    return newPath;
  },
});

const stripTrailingSlash = (str: string): string => (str.endsWith('/') ? str.slice(0, -1) : str);

const setup = (router: Router, authClient: Client) => {
  const { path, url } = config.downstreamApiReverseProxy;
  logger.info(`Setting up proxy for '${path}'`);
  router.use(`/${path}/*`, proxy(url, options(config.downstreamApiReverseProxy, authClient)));
};

export default { setup };
