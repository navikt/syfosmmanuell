import {ResponseType} from "openid-client";

import { env } from '../utils/env';

export interface AzureConfig {
  discoveryUrl: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
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
  logoutRedirectUri?: string;
}

function getAzureConfig(): AzureConfig {
  const azureAd: AzureConfig = {
    clientId: env('AZURE_APP_CLIENT_ID'),
    clientSecret: env('AZURE_APP_CLIENT_SECRET'),
    discoveryUrl: env('AZURE_APP_WELL_KNOWN_URL'),
    redirectUri: env('AAD_REDIRECT_URL'),
    logoutRedirectUri: env('AAD_LOGOUT_REDIRECT_URL', false),
    tokenEndpointAuthMethod: 'client_secret_post',
    responseTypes: ['code'],
    responseMode: 'query',
  };
  return azureAd;
}

export default getAzureConfig;
