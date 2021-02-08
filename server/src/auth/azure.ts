import { Client, ClientMetadata, custom, Issuer, Strategy, TokenSet } from 'openid-client';
import authUtils from './utils';
import config, { AzureAd } from '../config';
import httpProxy from '../proxy/http-proxy';
import logger from '../logging';

const client = async (azureConfig: AzureAd) => {
  const metadata: ClientMetadata = {
    client_id: azureConfig.clientId,
    client_secret: azureConfig.clientSecret,
    redirect_uris: [azureConfig.redirectUri],
    token_endpoint_auth_method: azureConfig.tokenEndpointAuthMethod,
  };

  // see https://github.com/panva/node-openid-client/blob/master/docs/README.md#customizing-individual-http-requests
  if (httpProxy.agent) {
    custom.setHttpOptionsDefaults({
      agent: httpProxy.agent,
    });
  }
  const issuer = await Issuer.discover(azureConfig.discoveryUrl);
  logger.info(`Discovered issuer ${issuer.issuer}`);
  return new issuer.Client(metadata);
};

const strategy = (client: Client, azureConfig: AzureAd) => {
  const verify = (tokenSet: TokenSet, done: any) => {
    if (tokenSet.expired()) {
      return done(null, false);
    }
    const user = {
      tokenSets: {
        [authUtils.tokenSetSelfId]: tokenSet,
      },
      claims: tokenSet.claims(),
    };
    return done(null, user);
  };
  const options = {
    client: client,
    params: {
      response_types: azureConfig.responseTypes,
      response_mode: azureConfig.responseMode,
      scope: `openid ${authUtils.appendDefaultScope(azureConfig.clientId)}`,
    },
    passReqToCallback: false,
    usePKCE: 'S256',
  };
  return new Strategy(options, verify);
};

export default { client, strategy };
