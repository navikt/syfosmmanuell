import { logger } from '@navikt/next-logger'
import { grantAzureOboToken, isInvalidTokenSet } from '@navikt/next-auth-wonderwall'
import { z } from 'zod'

import { ManuellOppgave } from '../types/manuellOppgave'
import { manuellOppgave } from '../mock/manuellOppgave'
import { getServerEnv, isLocalOrDemo } from '../utils/env'
import { ClientError } from '../utils/typeUtils'
import { UlostOppgave, UlostOppgaveSchema } from '../types/ulost-oppgave'
import { ulosteOppgaver } from '../mock/ulosteOppgaver'
import { ValidatedFormValues } from '../components/submit-oppgave-action'

export type OppgaveFetchingError = ClientError<
    'AUTHORIZATION' | 'OPPGAVE_NOT_FOUND' | 'ALREADY_RESOLVED' | 'GENERAL_ERROR' | 'PARSE_ERROR'
>

export async function getOppgave(
    oppgaveid: string,
    accessToken: string,
): Promise<ManuellOppgave | OppgaveFetchingError> {
    if (isLocalOrDemo) {
        return ManuellOppgave.parse(manuellOppgave)
    }

    const serverEnv = getServerEnv()
    const token = await grantAzureOboToken(accessToken, serverEnv.SYFOSMMANUELL_BACKEND_SCOPE)
    if (isInvalidTokenSet(token)) {
        return {
            errorType: 'AUTHORIZATION',
            message: `Unable to get access token: ${token.message}`,
        }
    }

    const OPPGAVE_URL = `${serverEnv.SYFOSMMANUELL_BACKEND_URL}/api/v1/manuellOppgave/${oppgaveid}`
    const response = await fetch(OPPGAVE_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (response.status === 401) {
        logger.warn(`API responded with 401 when fetching oppgaveid ${oppgaveid}`)
        return {
            errorType: 'AUTHORIZATION',
            message:
                'Kunne ikke hente oppgave på grunn av autorisasjonsfeil. Sjekk med din leder om du har tilgang til å vurdere manuelle oppgaver',
        }
    } else if (response.status === 204) {
        return {
            errorType: 'ALREADY_RESOLVED',
            message: 'Oppgaven du prøver å hente er allerede løst',
        }
    } else if (response.status === 404) {
        return {
            errorType: 'OPPGAVE_NOT_FOUND',
            message: 'Oppgaven finnes ikke',
        }
    } else if (!response.ok) {
        logger.error(
            `API responded with ${response.status} ${response.statusText} when fetching oppgaveid ${oppgaveid}`,
        )
        return {
            errorType: 'GENERAL_ERROR',
            message: `Feil ved henting av oppgave. Feilkode: ${response.status}`,
        }
    }

    const parseResult = ManuellOppgave.safeParse(await response.json())
    if (!parseResult.success) {
        logger.error(`Unable to parse oppgave, parse error: ${parseResult.error.message}`)
        return {
            errorType: 'PARSE_ERROR',
            message: 'Feil ved lasting av oppgave.',
        }
    }

    logger.info(`Oppgave med id ${oppgaveid} hentet OK`)
    return parseResult.data
}

export type UlosteOppgaverFetchingError = ClientError<'AUTHORIZATION' | 'GENERAL_ERROR' | 'PARSE_ERROR'>

export async function getUlosteOppgaver(accessToken: string): Promise<UlostOppgave[] | UlosteOppgaverFetchingError> {
    if (isLocalOrDemo) {
        logger.warn(`Is local or demo: Mocking uloste oppgaver`)
        return z.array(UlostOppgaveSchema).parse(ulosteOppgaver)
    }

    const serverEnv = getServerEnv()
    const token = await grantAzureOboToken(accessToken, serverEnv.SYFOSMMANUELL_BACKEND_SCOPE)
    if (isInvalidTokenSet(token)) {
        throw new Error(`Unable to get access token: ${token.message}`)
    }

    const OPPGAVE_URL = `${serverEnv.SYFOSMMANUELL_BACKEND_URL}/api/v1/oppgaver`
    const response = await fetch(OPPGAVE_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (response.status === 401) {
        logger.warn(`API responded with 401 when fetching uløste oppgaver`)
        return {
            errorType: 'AUTHORIZATION',
            message:
                'Kunne ikke hente uløste oppgaver på grunn av autorisasjonsfeil. Sjekk med din leder om du har tilgang til å vurdere manuelle oppgaver',
        }
    } else if (!response.ok) {
        logger.error(`API responded with ${response.status} ${response.statusText} when fetching uløste oppgaver`)
        return {
            errorType: 'GENERAL_ERROR',
            message: `Feil ved henting av oppgave. Feilkode: ${response.status}`,
        }
    }

    const parseResult = z.array(UlostOppgaveSchema).safeParse(await response.json())
    if (!parseResult.success) {
        logger.error(`Unable to parse oppgave, parse error: ${parseResult.error.message}`)
        return {
            errorType: 'PARSE_ERROR',
            message: 'Feil ved lasting av oppgave.',
        }
    }

    logger.info(`Uløste oppgaver fetched`)
    return parseResult.data
}

export async function submitOppgave(
    oppgaveid: number,
    aktivEnhet: string,
    body: ValidatedFormValues,
    accessToken: string,
): Promise<void> {
    if (isLocalOrDemo) {
        logger.warn(`Mocking submit for development, valgt enhet: ${aktivEnhet}, oppgaveid: ${oppgaveid}`)
        return
    }

    const serverEnv = getServerEnv()
    const token = await grantAzureOboToken(accessToken, serverEnv.SYFOSMMANUELL_BACKEND_SCOPE)
    if (isInvalidTokenSet(token)) {
        throw new Error(`Unable to get access token: ${token.message}`)
    }

    const VURDERE_OPPGAVE_URL = `${serverEnv.SYFOSMMANUELL_BACKEND_URL}/api/v1/vurderingmanuelloppgave/${oppgaveid}`
    const result = await fetch(VURDERE_OPPGAVE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Nav-Enhet': aktivEnhet, Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
    })

    if (result.ok) {
        logger.info(`Oppgave med id ${oppgaveid} ferdigstilt OK`)
        return
    } else {
        throw new Error(`Unable to submit oppgave: ${result.status} ${result.statusText}`)
    }
}
