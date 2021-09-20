import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiRequest, NextApiResponse } from 'next';
import { applySession as applyIronSession, Session } from 'next-iron-session';
import { TokenSet } from 'openid-client';

import { logger } from '../utils/logger';
import { BasePageRequiredProps } from '../pages/_app';
import { hasValidAccessToken } from '../services/tokenService';
import { env } from '../utils/env';

export type NextIronRequest = NextApiRequest & { session: Session };
export type ServerSideContext = GetServerSidePropsContext & { req: NextIronRequest };

export type IronApiHandler = (
  req: NextIronRequest,
  res: NextApiResponse,
  accessToken: string,
) => void | Promise<unknown>;
export type IronSsrHandler = (
  context: ServerSideContext,
  accessToken: string,
) => void | Promise<GetServerSidePropsResult<BasePageRequiredProps>>;

export async function applySession(
  req: NextApiRequest | GetServerSidePropsContext['req'],
  res: NextApiResponse | GetServerSidePropsContext['res'],
): Promise<void> {
  await applyIronSession(req, res, {
    password: env('SECRET_COOKIE_PASSWORD'),
    cookieName: 'syfosmmanuell-azure',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
}

export function withAuthenticatedPage(handler: IronSsrHandler) {
  return async function withIronSessionHandler(context: ServerSideContext): Promise<ReturnType<typeof handler>> {
    await applySession(context.req, context.res);

    const request = context.req as NextIronRequest | undefined;
    if (request?.session == null) {
      throw new Error('Session is undefined. This should not happen');
    }

    // If user is logged out or cookie has expired, redirect to login, but only during SSR.
    const accessToken: TokenSet['access_token'] | null | undefined = request?.session?.get('access_token');
    const accessTokenExpiry: TokenSet['expires_at'] | null | undefined = request?.session?.get('access_token_expiry');
    if (!accessToken || !accessTokenExpiry || !hasValidAccessToken(accessToken, accessTokenExpiry)) {
      logger.debug('Session exists, but token does not. Redirecting to login.');

      if (!request.url) {
        throw new Error('No request URL');
      }

      const requestUrl = new URL(request.url, `https://${request.headers.host}`);
      const redirectPath = requestUrl.pathname + requestUrl.search;

      return {
        redirect: {
          destination: `/login?redirect_path=${encodeURI(redirectPath)}`,
          permanent: false,
        },
      };
    }

    return handler(context, accessToken);
  };
}

export function withAuthenticatedApi(handler: IronApiHandler) {
  return async function withIronSessionHandler(
    req: NextIronRequest,
    res: NextApiResponse,
  ): Promise<ReturnType<typeof handler>> {
    await applySession(req, res);

    // If user is logged out or cookie has expired, redirect to login, but only during SSR.
    const accessToken: TokenSet['access_token'] | null | undefined = req?.session?.get('access_token');
    const accessTokenExpiry: TokenSet['expires_at'] | null | undefined = req?.session?.get('access_token_expiry');
    if (!accessToken || !accessTokenExpiry || !hasValidAccessToken(accessToken, accessTokenExpiry)) {
      res.status(403);
      res.json({ message: 'Session has expired' });
      return;
    }

    return handler(req, res, accessToken);
  };
}
