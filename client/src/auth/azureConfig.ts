import { logger } from '../utils/logger';

export interface AzureConfig {
  discoveryUrl: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  responseTypes: string[];
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

export function envVar(name: string, required: false): string | undefined;
export function envVar(name: string, required: true): string;
export function envVar(name: string, required?: true): string;
export function envVar(name: string, required: boolean = true) {
  if (!process.env[name] && required) {
    logger.error(`Missing required environment variable '${name}'`);
    process.exit(1);
  }
  return process.env[name];
}

function getAzureConfig(): AzureConfig {
  const azureAd: AzureConfig = {
    discoveryUrl: envVar('AAD_DISCOVERY_URL'),
    clientId: envVar('CLIENT_ID'),
    clientSecret: envVar('CLIENT_SECRET'),
    redirectUri: envVar('AAD_REDIRECT_URL'),
    logoutRedirectUri: envVar('AAD_LOGOUT_REDIRECT_URL', false),
    tokenEndpointAuthMethod: 'client_secret_post',
    responseTypes: ['code'],
    responseMode: 'query',
  };
  return azureAd;
}

export default getAzureConfig;
