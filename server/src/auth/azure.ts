import { Client, ClientMetadata, custom, Issuer, Strategy, TokenSet } from 'openid-client';
import authUtils from './utils';
import { AzureAd, Config } from '../config';
import httpProxyAgent from '../proxy/http-proxy';
import logger from '../logging';

const client = async (config: Config) => {
  const metadata: ClientMetadata = {
    client_id: config.azureAd.clientId,
    client_secret: config.azureAd.clientSecret,
    redirect_uris: [config.azureAd.redirectUri],
    token_endpoint_auth_method: config.azureAd.tokenEndpointAuthMethod,
  };

  // see https://github.com/panva/node-openid-client/blob/master/docs/README.md#customizing-individual-http-requests
  const agent = httpProxyAgent(config.server.proxy);
  if (agent) {
    custom.setHttpOptionsDefaults({
      agent: agent,
    });
  }

  const issuer = await Issuer.discover(config.azureAd.discoveryUrl);
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
