import { TokenSet } from 'openid-client';
import { envVar } from '../auth/azureConfig';
import getAuthClient from '../auth/oidcClient';

export function hasValidAccessToken(tokenSet: TokenSet): boolean {
  return tokenSet.expired() === false;
}

// Requires valid userToken
async function getOboAccessToken(userToken: string, scope: string): Promise<string> {
  const oidcClient = await getAuthClient();
  const oboTokenSet = await oidcClient.grant({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    requested_token_use: 'on_behalf_of',
    scope,
    assertion: userToken,
  });

  if (!oboTokenSet.access_token) {
    throw new Error('Modia Context OBO Access token is undefined');
  }

  return oboTokenSet.access_token;
}

export async function getModiaContextOboAccessToken(userToken: string): Promise<string> {
  return getOboAccessToken(userToken, 'https://graph.microsoft.com/.default');
}
export async function getOppgaveOboAccessToken(userToken: string): Promise<string> {
  return getOboAccessToken(userToken, `api://${envVar('DOWNSTREAM_API_CLIENT_ID')}./default`);
}
