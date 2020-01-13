import fs from 'fs';

if (process.env.NODE_ENV === 'development') {
  require('dotenv/config');
} else {
  const CLIENT_ID = fs.readFileSync('/secrets/azuread/syfosmmanuell/client_id', 'utf8');
  const CLIENT_SECRET = fs.readFileSync('/secrets/azuread/syfosmmanuell/client_secret', 'utf8');
  const DOWNSTREAM_API_HOST = fs.readFileSync('/secrets/azuread/syfosmmanuell-backend/client_id', 'utf8');
  try {
    process.env['CLIENT_ID'] = CLIENT_ID;
    process.env['CLIENT_SECRET'] = CLIENT_SECRET;
    process.env['DOWNSTREAM_API_HOST'] = DOWNSTREAM_API_HOST;
  } catch (e) {
    console.log(e);
  }
}

const server = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080,
  proxy: process.env.HTTP_PROXY,
};

const azureAd = {
  discoveryUrl: process.env.AAD_DISCOVERY_URL,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.AAD_REDIRECT_URL,
  tokenEndpointAuthMethod: 'client_secret_post',
  responseTypes: ['code'],
  responseMode: 'form_post',
};

const downstreamApi = {
  clientId: process.env.DOWNSTREAM_API_CLIENT_ID,
  prefix: process.env.DOWNSTREAM_API_PREFIX || 'downstream',
  host: process.env.DOWNSTREAM_API_HOST,
};

export default { server, azureAd, downstreamApi };
