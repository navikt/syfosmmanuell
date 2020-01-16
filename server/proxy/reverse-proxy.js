import authUtils from '../auth/utils';
import config from '../config';
import proxy from 'express-http-proxy';

const options = authClient => ({
  proxyReqOptDecorator: (options, req) => {
    return new Promise((resolve, reject) =>
      authUtils
        .getOnBehalfOfTokenSet(authClient, req.user.tokenSet.access_token_self || req.user.tokenSet.access_token)
        .then(
          tokenSet => {
            options.headers.Authorization = `Bearer ${tokenSet.access_token}`;
            resolve(options);
          },
          error => reject(error),
        ),
    );
  },
  proxyReqPathResolver: req => {
    const parts = req.originalUrl.split('?');
    const path = parts[0].replace(`/${config.downstreamApi.prefix}/`, '/');
    const query = parts[1];
    const pathWithQuery = path + (query ? '?' + query : '');
    console.log('proxy url:', pathWithQuery);
    return pathWithQuery;
  },
});

const setup = authClient => proxy(config.downstreamApi.host, options(authClient));

export default { setup };
