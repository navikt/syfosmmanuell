import { Router } from 'express';
import proxy, { ProxyOptions } from 'express-http-proxy';
import { Client } from 'openid-client';
import { ProxyConfig } from '../config';
import { RequestOptions } from 'http';
import utils from '../auth/utils';
import logger from '../logging';

const options = (proxyConfig: ProxyConfig, authClient: Client): ProxyOptions => ({
  parseReqBody: true,
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    return new Promise<RequestOptions>((resolve, reject) => {
      utils.getOnBehalfOfAccessToken(authClient, srcReq, proxyConfig, 'graph').then(
        (access_token) => {
          if (proxyReqOpts && proxyReqOpts.headers && srcReq.user?.tokenSets.self.access_token) {
            // Need to set self-token as Authorization header and graph-token as isso-accesstoken cookie
            // for modicontextholder to work
            proxyReqOpts.headers['Authorization'] = `Bearer ${srcReq.user?.tokenSets.self.access_token}`;
            proxyReqOpts.headers['Cookie'] = `isso-accesstoken=${access_token}`;
            return resolve(proxyReqOpts);
          } else {
            throw new Error('Could not set Authorization header and Cookie for modiacontextholder proxy request');
          }
        },
        (error) => reject(error),
      );
    });
  },
  proxyReqPathResolver: (srcReq) => {
    logger.info(`Proxying request from '${srcReq.originalUrl} to '${proxyConfig.url + srcReq.originalUrl}'`);
    return srcReq.originalUrl;
  },
});

const setup = (router: Router, authClient: Client, proxyConfig: ProxyConfig) => {
  const { path, url } = proxyConfig;
  logger.info(`Setting up proxy for '${path}'`);
  router.use(`/${path}/*`, proxy(url, options(proxyConfig, authClient)));
};

export default { setup };
