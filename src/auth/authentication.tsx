import { headers } from 'next/headers'
import { logger } from '@navikt/next-logger'
import { getToken, validateToken } from '@navikt/oasis'

type VerifiedAccessTokenResult =
    | { ok: false; errorType: 'AUTH_ERROR'; message: string }
    | {
          ok: true
          token: string
      }

export async function verifiedAccessToken(): Promise<VerifiedAccessTokenResult> {
    const accessToken = getToken(await headers())
    if (!accessToken) {
        logger.warn('No access token found when trying to get modia context, why is wonderwall not wonderwalling?')
        return {
            ok: false,
            errorType: 'AUTH_ERROR',
            message: 'No access token found',
        }
    }

    const validatedToken = await validateToken(accessToken)
    if (!validatedToken.ok) {
        logger.warn(`Invalid access token found when trying to get modia context: ${validatedToken.error.message}`)
        return {
            ok: false,
            errorType: 'AUTH_ERROR',
            message: `Invalid access token`,
        }
    }

    return { ok: true, token: accessToken }
}
