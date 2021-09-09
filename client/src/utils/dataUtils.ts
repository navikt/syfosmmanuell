import { FormShape } from '../components/form/Form';

export class ApiError extends Error {}

/**
 * Makes a GET request for the task
 * @param {string} oppgaveid
 * @return {Promise<unknown>} Promise resolving in an unknown json object.
 * @throws {ApiError} Something went wrong with the request.
 */
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

/**
 * Makes a POST request to solve the task
 * @param {string} oppgaveid
 * @param {string} enhet NAV enhet chosen by the logged in user.
 * @param {FormShape} result The result from the form to send in the body of the request.
 * @return {Promise<void>} Promise resolving to null if request is successfull.
 * @throws {ApiError} Something went wrong with the request.
 */
export async function vurderOppgave(oppgaveid: string, enhet: string, result: FormShape): Promise<void> {
  // const VURDERING_URL = `/backend/api/v1/vurderingmanuelloppgave/${oppgaveid}`;
  const VURDERING_URL = `/api/submitOppgave`;

  const response = await fetch(VURDERING_URL, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', 'X-Nav-Enhet': enhet },
    body: JSON.stringify(result),
  });

  if (response.ok) {
    return Promise.resolve();
  } else if (response.status === 401) {
    return Promise.reject(
      new ApiError(
        'Kunne ikke vurdere oppgaven på grunn av autorisasjonsfeil. Sjekk med din leder om du har tilgang til å vurdere manuelle oppgaver',
      ),
    );
  } else {
    return Promise.reject(new ApiError(`Feil ved ferdigstilling av oppgaven. Feilkode: ${response.status}`));
  }
}
