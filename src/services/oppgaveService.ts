import { logger } from '@navikt/next-logger';

import { ManuellOppgave } from '../types/manuellOppgave';
import { manuellOppgave } from '../mock/manuellOppgave';
import { FormShape } from '../components/form/Form';
import { env, isLocalOrDemo } from '../utils/env';
import { ClientError } from '../utils/typeUtils';
import { getOppgaveOboAccessToken } from '../auth/azureTokens';

export type OppgaveFetchingError = ClientError<
    'AUTHORIZATION' | 'OPPGAVE_NOT_FOUND' | 'ALREADY_RESOLVED' | 'GENERAL_ERROR' | 'PARSE_ERROR'
>;

export async function getOppgave(
    oppgaveid: string,
    accessToken: string,
): Promise<ManuellOppgave | OppgaveFetchingError> {
    if (isLocalOrDemo) {
        return ManuellOppgave.parse(manuellOppgave);
    }

    const token: string = await getOppgaveOboAccessToken(accessToken);
    const OPPGAVE_URL = `${env('SYFOSMMANUELL_BACKEND_URL', true)}/api/v1/manuellOppgave/${oppgaveid}`;
    const response = await fetch(OPPGAVE_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        logger.warn(`API responded with 401 when fetching oppgaveid ${oppgaveid}`);
        return {
            errorType: 'AUTHORIZATION',
            message:
                'Kunne ikke hente oppgave på grunn av autorisasjonsfeil. Sjekk med din leder om du har tilgang til å vurdere manuelle oppgaver',
        };
    } else if (response.status === 204) {
        return {
            errorType: 'ALREADY_RESOLVED',
            message: 'Oppgaven du prøver å hente er allerede løst',
        };
    } else if (response.status === 404) {
        return {
            errorType: 'OPPGAVE_NOT_FOUND',
            message: 'Oppgaven finnes ikke',
        };
    } else if (!response.ok) {
        logger.error(
            `API responded with ${response.status} ${response.statusText} when fetching oppgaveid ${oppgaveid}`,
        );
        return {
            errorType: 'GENERAL_ERROR',
            message: `Feil ved henting av oppgave. Feilkode: ${response.status}`,
        };
    }

    const parseResult = ManuellOppgave.safeParse(await response.json());
    if (!parseResult.success) {
        logger.error(`Unable to parse oppgave, parse error: ${parseResult.error.message}`);
        return {
            errorType: 'PARSE_ERROR',
            message: 'Feil ved lasting av oppgave.',
        };
    }

    logger.info(`Oppgave med id ${oppgaveid} hentet OK`);
    return parseResult.data;
}

export async function submitOppgave(
    oppgaveid: number,
    aktivEnhet: string,
    body: FormShape,
    accessToken: string,
): Promise<void> {
    if (isLocalOrDemo) {
        logger.warn(`Mocking submit for development, valgt enhet: ${aktivEnhet}, oppgaveid: ${oppgaveid}`);
        return;
    }

    const token = await getOppgaveOboAccessToken(accessToken);
    const VURDE_OPPGAVE_URL = `${env('SYFOSMMANUELL_BACKEND_URL', true)}/api/v1/vurderingmanuelloppgave/${oppgaveid}`;
    const result = await fetch(VURDE_OPPGAVE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Nav-Enhet': aktivEnhet, Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
    });

    if (result.ok) {
        logger.info(`Oppgave med id ${oppgaveid} ferdigstilt OK`);
        return;
    } else {
        throw new Error(`Unable to submit oppgave: ${result.status} ${result.statusText}`);
    }
}
