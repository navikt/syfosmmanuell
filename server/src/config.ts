import logger from './logging';

if (process.env.NODE_ENV === 'development') {
  require('dotenv/config');
}

const envVar = ({ name, required = true }: { name: string; required?: boolean }) => {
  if (!process.env[name] && required) {
    logger.error(`Missing required environment variable '${name}'`);
    process.exit(1);
  }
  return process.env[name];
};

const server = {
  host: envVar({ name: 'HOST', required: false }) || 'localhost',
  port: envVar({ name: 'PORT', required: false }) || 3000,
  proxy: envVar({ name: 'HTTP_PROXY', required: false }), // optional, only set if requests to Azure AD must be performed through a corporate proxy (i.e. traffic to login.microsoftonline.com is blocked by the firewall)
  sessionKey: envVar({ name: 'SESSION_KEY' })!,
  cookieName: 'syfosmmanuell',
};

interface AzureAd {
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
const azureAd: AzureAd = {
  discoveryUrl: envVar({ name: 'AAD_DISCOVERY_URL' })!,
  clientId: envVar({ name: 'CLIENT_ID' })!,
  clientSecret: envVar({ name: 'CLIENT_SECRET' })!,
  redirectUri: envVar({ name: 'AAD_REDIRECT_URL' })!,
  logoutRedirectUri: envVar({ name: 'AAD_LOGOUT_REDIRECT_URL', required: false }),
  tokenEndpointAuthMethod: 'client_secret_post',
  responseTypes: ['code'],
  responseMode: 'query',
};

const redis = {
  host: envVar({ name: 'REDIS_HOST' })!,
  port: parseInt(envVar({ name: 'REDIS_PORT' })!), // Will exit the process if var dont exist
  password: envVar({ name: 'REDIS_PASSWORD', required: false }),
};

export interface ProxyConfig {
  clientId: string;
  path: string;
  url: string;
  scopes?: string[];
}

const downstreamApiReverseProxy: ProxyConfig = {
  clientId: envVar({ name: 'DOWNSTREAM_API_CLIENT_ID' })!,
  path: envVar({ name: 'DOWNSTREAM_API_PATH' })!,
  url: envVar({ name: 'DOWNSTREAM_API_URL' })!,
  scopes: envVar({ name: 'DOWNSTREAM_API_SCOPES', required: false })?.split(','),
};

const modiaContextReverseProxy: ProxyConfig = {
  clientId: envVar({ name: 'GRAPH_API_CLIENT_ID' })!,
  path: envVar({ name: 'MODIA_CONTEXT_PATH' })!,
  url: envVar({ name: 'MODIA_CONTEXT_URL' })!,
  scopes: envVar({ name: 'GRAPH_API_SCOPES' })?.split(','),
};

export default { server, azureAd, redis, downstreamApiReverseProxy, modiaContextReverseProxy };
