import { Client, ClientMetadata, custom, Issuer } from 'openid-client';

import getAzureConfig from './azureConfig';

let client: Client | null = null;

async function getAuthClient(): Promise<Client> {
    if (client) {
        return client;
    }

    const azureConfig = getAzureConfig();

    const metadata: ClientMetadata = {
        client_id: azureConfig.clientId,
        client_secret: azureConfig.clientSecret,
        token_endpoint_auth_method: azureConfig.tokenEndpointAuthMethod,
        response_types: azureConfig.responseTypes,
        response_mode: azureConfig.responseMode,
    };

    const issuer = await Issuer.discover(azureConfig.discoveryUrl);
    client = new issuer.Client(metadata);
    return client;
}

export default getAuthClient;
