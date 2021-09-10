import tunnel from 'tunnel';
import { Client, ClientMetadata, custom, Issuer } from 'openid-client';
import { logger } from '../utils/logger';
import { Agent } from 'http';
import getAzureConfig, { envVar } from './azureConfig';

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
  };

  const webProxyUrl = envVar('HTTP_PROXY');
  const agent = getHttpProxyAgent(webProxyUrl);
  custom.setHttpOptionsDefaults({
    // TODO: Dragon?
    agent: {
      http: agent,
    },
  });
  const issuer = await Issuer.discover(azureConfig.discoveryUrl);

  logger.info(`Discovered issuer ${issuer.issuer}`);

  client = new issuer.Client(metadata);
  return client;
}

export default getAuthClient;
