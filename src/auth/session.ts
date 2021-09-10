import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiRequest, NextApiResponse } from 'next';
import { applySession as applyIronSession, Session } from 'next-iron-session';
import { envVar } from './azureConfig';
import { TokenSet } from 'openid-client';
import { logger } from '../utils/logger';
import { BasePageRequiredProps } from '../pages/_app';

export type NextIronRequest = NextApiRequest & { session: Session };
export type ServerSideContext = GetServerSidePropsContext & { req: NextIronRequest };

export type IronApiHandler = (req: NextIronRequest, res: NextApiResponse) => void | Promise<unknown>;
export type IronSsrHandler = (
  context: ServerSideContext,
) => void | Promise<GetServerSidePropsResult<BasePageRequiredProps>>;

export async function applySession(
  req: NextApiRequest | GetServerSidePropsContext['req'],
  res: NextApiResponse | GetServerSidePropsContext['res'],
): Promise<void> {
  await applyIronSession(req, res, {
    password: envVar('SECRET_COOKIE_PASSWORD'),
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
    const tokenSet: TokenSet | string | null | undefined = request?.session?.get('tokenSet');
    if (!tokenSet) {
      logger.debug('Session exists, but token does not. Redirecting to login.');

      // Todo sett session for where to return?

      return {
        redirect: {
          destination: `/api/login`,
          permanent: false,
        },
      };
    }

    return handler(context);
  };
}
