import { FormShape } from '../components/form/Form';

export class ApiError extends Error {}

export async function hentOppgave(oppgaveid: string): Promise<unknown> {
  const OPPGAVE_URL = `/backend/api/v1/manuellOppgave/${oppgaveid}`;

  const response = await fetch(OPPGAVE_URL, { credentials: 'same-origin' });

  if (response.status === 401) {
    return Promise.reject(
      new ApiError(
        'Kunne ikke hente oppgave på grunn av autorisasjonsfeil. Sjekk med din leder om du har tilgang til å vurdere manuelle oppgaver',
      ),
    );
  } else if (response.status === 204) {
    return Promise.reject(new ApiError('Oppgaven du prøver å hente er allerede løst'));
  } else if (response.ok === false) {
    return Promise.reject(new ApiError(`Feil ved henting av oppgave. Feilkode: ${response.status}`));
  }

  return await response.json();
}

export async function vurderOppgave(oppgaveid: number, aktivEnhet: string, formValues: FormShape): Promise<void> {
  const VURDERING_URL = `/api/submitOppgave`;

  const createBody = (): SubmitOppgaveBody => ({ oppgaveid, aktivEnhet, formValues });

  const response = await fetch(VURDERING_URL, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(createBody()),
  });

  if (response.ok) {
    return;
  } else if (response.status === 401) {
    throw new ApiError(
      'Kunne ikke vurdere oppgaven på grunn av autorisasjonsfeil. Sjekk med din leder om du har tilgang til å vurdere manuelle oppgaver',
    );
  } else {
    throw new ApiError(`Feil ved ferdigstilling av oppgaven. Feilkode: ${response.status}`);
  }
}

export interface SubmitOppgaveBody {
  oppgaveid: number;
  aktivEnhet: string;
  formValues: FormShape;
}
