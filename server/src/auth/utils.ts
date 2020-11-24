import { Request } from 'express';
import { Client, TokenSet } from 'openid-client';
import { TokenSets } from '../@types/express';
import { ProxyConfig } from '../config';
import logger from '../logging';

const tokenSetSelfId = 'self';

const getOnBehalfOfAccessToken = (
  authClient: Client,
  req: Request,
  proxyConfig: ProxyConfig,
  forApi: keyof TokenSets,
) => {
  return new Promise((resolve, reject) => {
    if (hasValidAccessToken(req, forApi)) {
      const tokenSets = getTokenSetsFromSession(req);
      resolve(tokenSets![forApi]!.access_token);
    } else {
      authClient
        .grant({
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
          requested_token_use: 'on_behalf_of',
          scope: createOnBehalfOfScope(proxyConfig),
          assertion: req.user!.tokenSets.self.access_token,
        })
        .then((tokenSet) => {
          req.user!.tokenSets[forApi] = tokenSet;
          resolve(tokenSet.access_token);
        })
        .catch((err) => {
          logger.error(err);
          reject(err);
        });
    }
  });
};

const appendDefaultScope = (scope: string): string => `${scope}/.default`;

const formatClientIdScopeForV2Clients = (clientId: string): string => appendDefaultScope(`api://${clientId}`);

const createOnBehalfOfScope = (proxyConfig: ProxyConfig) => {
  if (proxyConfig.scopes && proxyConfig.scopes.length > 0) {
    return `${proxyConfig.scopes.join(' ')}`;
  } else {
    return `${formatClientIdScopeForV2Clients(proxyConfig.clientId)}`;
  }
};

const getTokenSetsFromSession = (req: Request) => {
  if (req && req.user) {
    return req.user.tokenSets;
  }
  return null;
};

const hasValidAccessToken = (req: Request, key: keyof TokenSets = tokenSetSelfId) => {
  const tokenSets = getTokenSetsFromSession(req);
  if (!tokenSets) {
    return false;
  }
  const tokenSet = tokenSets[key];
  if (!tokenSet) {
    return false;
  }
  return new TokenSet(tokenSet).expired() === false;
};

export default {
  getOnBehalfOfAccessToken,
  appendDefaultScope,
  hasValidAccessToken,
  tokenSetSelfId,
};
