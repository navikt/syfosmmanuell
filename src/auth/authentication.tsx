import { headers } from 'next/headers'
import { logger } from '@navikt/next-logger'
import { validateAzureToken } from '@navikt/next-auth-wonderwall'
import { redirect } from 'next/navigation'

import { isLocalOrDemo } from '../utils/env'
import { raise } from '../utils/ts-utils'

export async function verifyUserLoggedIn(): Promise<void> {
    logger.info('Getting headers')
    const requestHeaders = headers()

    if (isLocalOrDemo) {
        logger.warn('Is running locally, skipping RSC auth')
        return
    }

    const bearerToken: string | null | undefined = requestHeaders.get('authorization')
    if (!bearerToken) {
        logger.info('Found no token, redirecting to login')
        redirect(`/oauth2/login`)
    }

    const validationResult = await validateAzureToken(bearerToken)
    if (validationResult !== 'valid') {
        if (validationResult.errorType !== 'EXPIRED') {
            logger.error(
                new Error(
                    `Invalid JWT token found (cause: ${validationResult.errorType} ${validationResult.message}, redirecting to login.`,
                    { cause: validationResult.error },
                ),
            )
        }
        redirect(`/oauth2/login`)
    }
}

export function getToken(headers: Headers): string {
    if (isLocalOrDemo) return 'fake-token'

    return (
        headers.get('authorization')?.replace('Bearer ', '') ??
        raise(new Error('Tried to get token, but header is missing'))
    )
}
