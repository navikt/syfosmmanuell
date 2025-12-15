import * as z from 'zod'
import { logger } from '@navikt/next-logger'
import { requestOboToken } from '@navikt/oasis'

import { ClientError } from '../utils/typeUtils'
import { getServerEnv, isLocalOrDemo } from '../utils/env'
import { verifiedAccessToken } from '../auth/authentication'

export interface ModiaContext {
    fornavn: string
    etternavn: string
    ident: string
    aktivEnhet: string | null
    enheter: { enhetId: string; navn: string }[]
}

export type ModiaContextError = ClientError<'MODIA_ERROR' | 'PARSE_ERROR' | 'AUTH_ERROR'>

export async function getModiaContext(): Promise<ModiaContext | ModiaContextError> {
    if (isLocalOrDemo) {
        logger.warn('Using mocked modia context for local development (or demo)')
        return {
            fornavn: 'Johan J.',
            etternavn: 'Johansson',
            ident: '0129381203',
            enheter: [
                { enhetId: '0312', navn: 'NAV Sagene' },
                { enhetId: '0314', navn: 'NAV Fagene' },
            ],
            aktivEnhet: '0312',
        }
    }

    const verifiedResult = await verifiedAccessToken()
    if (!verifiedResult.ok) {
        return verifiedResult
    }

    const modiaContextAccessToken = await requestOboToken(verifiedResult.token, getServerEnv().MODIA_CONTEXT_SCOPE)
    if (!modiaContextAccessToken.ok) {
        return {
            errorType: 'MODIA_ERROR',
            message: `Unable to get modia context access token: ${modiaContextAccessToken.error.message}`,
        }
    }

    const [veileder, aktivEnhet] = await Promise.all([
        getVeileder(modiaContextAccessToken.token),
        getAktivEnhet(modiaContextAccessToken.token),
    ])

    if ('errorType' in aktivEnhet) {
        return aktivEnhet
    } else if ('errorType' in veileder) {
        return veileder
    }

    return {
        aktivEnhet: aktivEnhet.aktivEnhet,
        fornavn: veileder.fornavn,
        etternavn: veileder.etternavn,
        ident: veileder.ident,
        enheter: veileder.enheter,
    }
}

async function getVeileder(oboToken: string): Promise<Veileder | ModiaContextError> {
    const url = `${process.env['MODIA_CONTEXT_URL']}/api/decorator/v2`

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${oboToken}`,
            },
        })

        if (!response.ok) {
            const errorMessage = `Modia context responded with ${response.status} ${
                response.statusText
            }, body: ${await response.text()}`
            logger.error(errorMessage)
            return {
                errorType: 'MODIA_ERROR',
                message: errorMessage,
            }
        }

        const maybeVeileder = Veileder.safeParse(await response.json())

        if (maybeVeileder.success) {
            return maybeVeileder.data
        } else {
            const errorMessage = `Unable to parse modia context response: ${maybeVeileder.error.message}`
            logger.error(errorMessage)
            return {
                errorType: 'PARSE_ERROR',
                message: errorMessage,
            }
        }
    } catch (e) {
        logger.error('Unknown modia error: Unable to get veileder from modia context')
        throw e
    }
}

async function getAktivEnhet(oboToken: string): Promise<AktivEnhet | ModiaContextError> {
    const url = `${process.env['MODIA_CONTEXT_URL']}/api/context/aktivenhet`

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${oboToken}`,
            },
        })

        if (!response.ok) {
            logger.error(`Modia aktiv enhet responded with ${response.status} ${response.statusText}`)

            return {
                errorType: 'MODIA_ERROR',
                message: `Modia aktiv enhet responded with ${response.status} ${response.statusText}`,
            }
        }

        const maybeAktivEnhet = AktivEnhet.safeParse(await response.json())

        if (maybeAktivEnhet.success) {
            return maybeAktivEnhet.data
        } else {
            logger.error(`Unable to parse modia aktiv enhet response: ${maybeAktivEnhet.error.message}`)

            return {
                errorType: 'PARSE_ERROR',
                message: `Unable to parse modia aktiv enhet response: ${maybeAktivEnhet.error.message}`,
            }
        }
    } catch (e) {
        logger.error('Unable to get aktiv enhet from modia context')
        throw e
    }
}

const Veileder = z.object({
    ident: z.string(),
    fornavn: z.string(),
    etternavn: z.string(),
    enheter: z.array(
        z.object({
            enhetId: z.string(),
            navn: z.string(),
        }),
    ),
})

const AktivEnhet = z.object({
    aktivEnhet: z.string().nullable(),
})

type Veileder = z.infer<typeof Veileder>
type AktivEnhet = z.infer<typeof AktivEnhet>
