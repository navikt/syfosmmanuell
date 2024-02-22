import { headers } from 'next/headers'
import { logger } from '@navikt/next-logger'
import { validateToken, getToken } from '@navikt/oasis'
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

    const redirectPath = requestHeaders.get('x-path')
    if (!redirectPath == null) {
        logger.warn("Missing 'x-path' header, is middleware middlewaring?")
    }
    logger.info(`Redirect path is ${redirectPath}`)

    const token = getToken(requestHeaders)
    if (!token) {
        logger.info('Found no token, redirecting to login')
        redirect(`/oauth2/login?redirect=${redirectPath}`)
    }

    const result = await validateToken(token)
    if (!result.ok) {
        if (result.errorType !== 'token expired') {
            logger.error(
                new Error(
                    `Invalid JWT token found (${result.errorType}) (cause: ${result.errorType} ${result.error.message}, redirecting to login.`,
                    { cause: result.error },
                ),
            )
        }
        redirect(`/oauth2/login?redirect=${redirectPath}`)
    }
}

export function getUserToken(headers: Headers): string {
    if (isLocalOrDemo) return 'fake-token'

    return getToken(headers) ?? raise(new Error('Tried to get token, but header is missing'))
}
