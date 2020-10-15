import { TokenSet } from 'openid-client';

const tokenSetSelfId = 'self';

const getOnBehalfOfAccessToken = (authClient, req, proxyConfig) => {
  return new Promise((resolve, reject) => {
    if (hasValidAccessToken(req, proxyConfig.clientId)) {
      const tokenSets = getTokenSetsFromSession(req);
      resolve(tokenSets[proxyConfig.clientId].access_token);
    } else {
      authClient
        .grant({
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
          requested_token_use: 'on_behalf_of',
          scope: createOnBehalfOfScope(proxyConfig),
          assertion: req.user.tokenSets[tokenSetSelfId].access_token,
        })
        .then((tokenSet) => {
          req.user.tokenSets[proxyConfig.clientId] = tokenSet;
          resolve(tokenSet.access_token);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    }
  });
};

const appendDefaultScope = (scope) => `${scope}/.default`;

const formatClientIdScopeForV2Clients = (clientId) => appendDefaultScope(`api://${clientId}`);

const createOnBehalfOfScope = (proxyConfig) => {
  if (proxyConfig.scopes && proxyConfig.scopes.length > 0) {
    return `${proxyConfig.scopes.join(' ')}`;
  } else {
    return `${formatClientIdScopeForV2Clients(proxyConfig.clientId)}`;
  }
};

const getTokenSetsFromSession = (req) => {
  if (req && req.user) {
    return req.user.tokenSets;
  }
  return null;
};

const hasValidAccessToken = (req, key = tokenSetSelfId) => {
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
