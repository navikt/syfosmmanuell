import fs from 'fs';

if (process.env.NODE_ENV === 'development') {
  require('dotenv/config');
}

const server = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080,
  proxy: process.env.HTTP_PROXY,
};

const azureAd = {
  discoveryUrl: process.env.AAD_DISCOVERY_URL,
  clientId: process.env.CLIENT_ID || fs.readFileSync('/secrets/azuread/syfosmmanuell/client_id', 'utf8'),
  clientSecret: process.env.CLIENT_SECRET || fs.readFileSync('/secrets/azuread/syfosmmanuell/client_secret', 'utf8'),
  redirectUri: process.env.AAD_REDIRECT_URL,
  tokenEndpointAuthMethod: 'client_secret_post',
  responseTypes: ['code'],
  responseMode: 'form_post',
};

const downstreamApi = {
  clientId:
    process.env.DOWNSTREAM_API_CLIENT_ID || fs.readFileSync('/secrets/azuread/syfosmmanuell-backend/client_id', 'utf8'),
  prefix: process.env.DOWNSTREAM_API_PREFIX || 'downstream',
  host: process.env.DOWNSTREAM_API_HOST,
};

export default { server, azureAd, downstreamApi };
