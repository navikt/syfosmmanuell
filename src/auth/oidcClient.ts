import { Agent } from 'http';

import tunnel from 'tunnel';
import { Client, ClientMetadata, custom, Issuer } from 'openid-client';

import { logger } from '../utils/logger';
import { env } from '../utils/env';

import getAzureConfig from './azureConfig';

let client: Client | null = null;

const getHttpProxyAgent = (proxyUri: string): Agent => {
  logger.info(`Proxying requests via ${proxyUri} for openid-client`);
  const hostPort = proxyUri.replace('https://', '').replace('http://', '').split(':', 2);
  return tunnel.httpsOverHttp({
    proxy: {
      host: hostPort[0],
      port: parseInt(hostPort[1]),
    },
  });
};

async function getAuthClient(): Promise<Client> {
  if (client) {
    return client;
  }

  const azureConfig = getAzureConfig();

  const metadata: ClientMetadata = {
    client_id: azureConfig.clientId,
    client_secret: azureConfig.clientSecret,
    redirect_uris: [azureConfig.redirectUri],
    token_endpoint_auth_method: azureConfig.tokenEndpointAuthMethod,
    response_types: azureConfig.responseTypes,
    response_mode: azureConfig.responseMode,
  };

  const webProxyUrl = env('HTTP_PROXY');
  const agent = getHttpProxyAgent(webProxyUrl);
  custom.setHttpOptionsDefaults({
    // TODO: Figure out how to use newest version. Figure out why proxy is needed.
    agent: agent,
  });

  const issuer = await Issuer.discover(azureConfig.discoveryUrl);
  client = new issuer.Client(metadata);
  return client;
}

export default getAuthClient;
