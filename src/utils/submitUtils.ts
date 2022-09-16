import { logger } from '@navikt/next-logger';

import { FormShape } from '../components/form/Form';

interface VurderOppgaveError {
    message: string;
}

export async function vurderOppgave(
    oppgaveid: number,
    aktivEnhet: string,
    formValues: FormShape,
): Promise<VurderOppgaveError | 'ok'> {
    const createBody = (): SubmitOppgaveBody => ({ oppgaveid, aktivEnhet, formValues });

    const response = await fetch(`/api/submitOppgave`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createBody()),
    });

    if (response.ok) {
        return 'ok';
    } else if (response.status === 401) {
        const message =
            'Kunne ikke vurdere oppgaven på grunn av autorisasjonsfeil. Sjekk med din leder om du har tilgang til å vurdere manuelle oppgaver';
        logger.warn(message);
        return { message };
    } else if (response.status === 403) {
        const message = 'Du har blitt logget ut. Vennligst logg inn igjen ved å laste siden på nytt.';
        logger.warn(message);
        return { message };
    } else {
        const message = `Feil ved ferdigstilling av oppgaven. Feilkode: ${response.status}`;
        logger.error(message);
        return { message };
    }
}

export interface SubmitOppgaveBody {
    oppgaveid: number;
    aktivEnhet: string;
    formValues: FormShape;
}
