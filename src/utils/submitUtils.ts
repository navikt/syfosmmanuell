import { FormShape } from '../components/form/Form';

export async function vurderOppgave(oppgaveid: number, aktivEnhet: string, formValues: FormShape): Promise<void> {
  const createBody = (): SubmitOppgaveBody => ({ oppgaveid, aktivEnhet, formValues });

  const response = await fetch(`/api/submitOppgave`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(createBody()),
  });

  if (response.ok) {
    return;
  } else if (response.status === 401) {
    throw new Error(
      'Kunne ikke vurdere oppgaven på grunn av autorisasjonsfeil. Sjekk med din leder om du har tilgang til å vurdere manuelle oppgaver',
    );
  } else if (response.status === 403) {
    throw new Error('Du har blitt logget ut. Vennligst logg inn igjen ved å laste siden på nytt.');
  } else {
    throw new Error(`Feil ved ferdigstilling av oppgaven. Feilkode: ${response.status}`);
  }
}

export interface SubmitOppgaveBody {
  oppgaveid: number;
  aktivEnhet: string;
  formValues: FormShape;
}
