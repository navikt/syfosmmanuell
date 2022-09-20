import { ResponseType } from 'openid-client';

import { env } from '../utils/env';

export interface AzureConfig {
    discoveryUrl: string;
    clientId: string;
    clientSecret: string;
    responseTypes: ResponseType[];
    tokenEndpointAuthMethod:
        | 'client_secret_post'
        | 'client_secret_basic'
        | 'client_secret_jwt'
        | 'private_key_jwt'
        | 'tls_client_auth'
        | 'self_signed_tls_client_auth'
        | 'none'
        | undefined;
    responseMode: string;
}

function getAzureConfig(): AzureConfig {
    return {
        clientId: env('AZURE_APP_CLIENT_ID'),
        clientSecret: env('AZURE_APP_CLIENT_SECRET'),
        discoveryUrl: env('AZURE_APP_WELL_KNOWN_URL'),
        tokenEndpointAuthMethod: 'client_secret_post',
        responseTypes: ['code'],
        responseMode: 'query',
    };
}

export default getAzureConfig;
