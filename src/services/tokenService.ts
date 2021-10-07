import { TokenSet } from 'openid-client';
import { Session } from 'next-iron-session';

import { env, isDevOrDemo } from '../utils/env';
import { NextIronRequest } from '../auth/session';
import getAuthClient from '../auth/oidcClient';
import { logger } from '../utils/logger';
import azureConfig from '../auth/azureConfig';

export function hasValidAccessToken(accessToken: string, expiresAt: number): boolean {
  if (isDevOrDemo) {
    logger.warn(
      `In ${process.env.IS_NAIS_LABS_DEMO === 'true' ? 'demo' : 'development'} mode, fake local token is always valid`,
    );
    return true;
  }

  const tokenSet = new TokenSet({
    access_token: accessToken,
    expires_at: expiresAt,
  });

  return !tokenSet.expired();
}

async function getOboAccessToken(userToken: string, scope: string): Promise<string> {
  const oidcClient = await getAuthClient();

  const oboTokenSet = await oidcClient.grant({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
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
  return getOboAccessToken(userToken, env('GRAPH_API_SCOPES'));
}

export async function getOppgaveOboAccessToken(userToken: string): Promise<string> {
  return getOboAccessToken(userToken, `api://${env('SYFOSMMANUELL_BACKEND_SCOPE')}/.default`);
}

export async function getAuthUrl(session: Session): Promise<string> {
  const client = await getAuthClient();

  return client.authorizationUrl({
    scope: `openid ${azureConfig().clientId}/.default`,
    nonce: session.get('nonce'),
    state: session.get('state'),
  });
}

export async function getTokenSet(req: NextIronRequest): Promise<TokenSet> {
  const idportenClient = await getAuthClient();
  const params = idportenClient.callbackParams(req);
  const nonce = req.session.get('nonce');
  const state = req.session.get('state');
  const additionalClaims = {
    clientAssertionPayload: {
      aud: idportenClient.issuer.metadata.issuer,
    },
  };
  return idportenClient.callback(azureConfig().redirectUri, params, { nonce, state }, additionalClaims);
}
