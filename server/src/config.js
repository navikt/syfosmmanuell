if (process.env.NODE_ENV === 'development') {
  require('dotenv/config');
}

const envVar = ({ name, required = true }) => {
  if (!process.env[name] && required) {
    console.error(`Missing required environment variable '${name}'`);
    process.exit(1);
  }
  return process.env[name];
};

const server = {
  host: envVar({ name: 'HOST', required: false }) || 'localhost',
  port: envVar({ name: 'PORT', required: false }) || 3000,
  proxy: envVar({ name: 'HTTP_PROXY', required: false }), // optional, only set if requests to Azure AD must be performed through a corporate proxy (i.e. traffic to login.microsoftonline.com is blocked by the firewall)
  sessionKey: envVar({ name: 'SESSION_KEY' }),
  cookieName: 'syfosmmanuell',
};

const azureAd = {
  discoveryUrl: envVar({ name: 'AAD_DISCOVERY_URL' }),
  clientId: envVar({ name: 'CLIENT_ID' }),
  clientSecret: envVar({ name: 'CLIENT_SECRET' }),
  redirectUri: envVar({ name: 'AAD_REDIRECT_URL' }),
  logoutRedirectUri: envVar({ name: 'AAD_LOGOUT_REDIRECT_URL', required: false }),
  tokenEndpointAuthMethod: 'client_secret_post',
  responseTypes: ['code'],
  responseMode: 'query',
};

const redis = {
  host: envVar({ name: 'REDIS_HOST' }),
  port: parseInt(envVar({ name: 'REDIS_PORT' })),
  password: envVar({ name: 'REDIS_PASSWORD', required: false }),
};

const downstreamApiReverseProxy = {
  clientId: envVar({ name: 'DOWNSTREAM_API_CLIENT_ID' }),
  path: envVar({ name: 'DOWNSTREAM_API_PATH' }),
  url: envVar({ name: 'DOWNSTREAM_API_URL' }),
  scopes: envVar({ name: 'DOWNSTREAM_API_SCOPES', required: false }),
};

const modiaContextReverseProxy = {
  clientId: envVar({ name: 'GRAPH_API_CLIENT_ID' }),
  path: envVar({ name: 'MODIA_CONTEXT_PATH' }),
  url: envVar({ name: 'MODIA_CONTEXT_URL' }),
  scopes: envVar({ name: 'GRAPH_API_SCOPES' }),
};

export default { server, azureAd, redis, downstreamApiReverseProxy, modiaContextReverseProxy };
