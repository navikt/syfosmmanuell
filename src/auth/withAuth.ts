import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiRequest, NextApiResponse } from 'next';
import { logger } from '@navikt/next-logger';
import { validateAzureToken } from '@navikt/next-auth-wonderwall';

import { isLocalOrDemo } from '../utils/env';
import { BasePageRequiredProps } from '../pages/_app';

type ApiHandler = (req: NextApiRequest, res: NextApiResponse, accessToken: string) => void | Promise<unknown>;
type PageHandler = (
    context: GetServerSidePropsContext,
    accessToken: string,
) => Promise<GetServerSidePropsResult<BasePageRequiredProps>>;

/**
 * Used to authenticate Next.JS pages. Assumes application is behind
 * Wonderwall (https://doc.nais.io/security/auth/azure-ad/sidecar/). Will automatically redirect to login if
 * Wonderwall-cookie is missing.
 *
 */
export function withAuthenticatedPage(handler: PageHandler) {
    return async function withBearerTokenHandler(
        context: GetServerSidePropsContext,
    ): Promise<ReturnType<typeof handler>> {
        if (isLocalOrDemo) {
            logger.info('Is running locally or in demo, skipping authentication for page');
            return handler(context, 'fake-local-token');
        }

        const request = context.req;
        const bearerToken: string | null | undefined = request.headers['authorization'];
        if (!bearerToken) {
            logger.info('Could not find any bearer token on the request. Redirecting to login.');
            return {
                redirect: { destination: `/oauth2/login?redirect=${context.resolvedUrl}`, permanent: false },
            };
        }

        const validationResult = await validateAzureToken(bearerToken);
        if (validationResult !== 'valid') {
            logger.error(`Invalid JWT token found (${validationResult.message}), redirecting to login.`);

            return {
                redirect: { destination: `/oauth2/login?redirect=${context.resolvedUrl}`, permanent: false },
            };
        }

        return handler(context, bearerToken.replace('Bearer ', ''));
    };
}

export function withAuthenticatedApi(handler: ApiHandler): ApiHandler {
    return async function withBearerTokenHandler(req, res): Promise<ReturnType<typeof handler>> {
        if (isLocalOrDemo) {
            logger.info('Is running locally or in demo, skipping authentication for API');
            return handler(req, res, 'fake-local-token');
        }

        const bearerToken: string | null | undefined = req.headers['authorization'];
        if (!bearerToken || !(await validateAzureToken(bearerToken))) {
            res.status(401).json({ message: 'Access denied' });
            return;
        }

        return handler(req, res, bearerToken.replace('Bearer ', ''));
    };
}
