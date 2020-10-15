import authUtils from '../auth/utils';
import config from '../config';
import proxy from 'express-http-proxy';
import url from 'url';

const options = (proxyConfig, authClient) => ({
  parseReqBody: true,
  proxyReqOptDecorator: (options, req) => {
    return new Promise((resolve, reject) =>
      authUtils.getOnBehalfOfAccessToken(authClient, req, proxyConfig).then(
        (access_token) => {
          options.headers.Authorization = `Bearer ${access_token}`;
          resolve(options);
        },
        (error) => reject(error),
      ),
    );
  },
  proxyReqPathResolver: (req) => {
    const urlFromApi = url.parse(proxyConfig.url);
    const pathFromApi = urlFromApi.pathname === '/' ? '' : urlFromApi.pathname;

    const urlFromRequest = url.parse(req.originalUrl);
    const pathFromRequest = urlFromRequest.pathname.replace(`/${proxyConfig.path}/`, '/');

    const queryString = urlFromRequest.query;
    const newPath =
      (pathFromApi ? pathFromApi : '') +
      (pathFromRequest ? pathFromRequest : '') +
      (queryString ? '?' + queryString : '');

    console.log(`Proxying request from '${req.originalUrl}' to '${stripTrailingSlash(urlFromApi.href)}${newPath}'`);
    return newPath;
  },
});

const stripTrailingSlash = (str) => (str.endsWith('/') ? str.slice(0, -1) : str);

const setup = (router, authClient) => {
  const proxyConfig = config.downstreamApiReverseProxy;
  router.use(`/${proxyConfig.path}/*`, proxy(proxyConfig.url, options(proxyConfig, authClient)));
};

export default { setup };
