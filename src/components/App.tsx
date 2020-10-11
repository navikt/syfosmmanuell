import React, { useEffect, useState } from 'react';
import { ManuellOppgave } from '../types/manuellOppgaveTypes';
import { hentOppgaveidFraUrlParameter, hentOppgaveUrl, hentOppgaveUrlPut } from '../utils/urlUtils';
import Spinner from 'nav-frontend-spinner';
import { Normaltekst } from 'nav-frontend-typografi';
import { Result } from '../types/resultTypes';
import MainContent from './MainContent';

const App = () => {
  const [manOppgave, setManOppgave] = useState<ManuellOppgave | null | undefined>(undefined);
  const [feilMelding, setFeilmelding] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const hentOppgave = () => {
    try {
      const OPPGAVE_ID = hentOppgaveidFraUrlParameter(window.location.href);
      const URL = hentOppgaveUrl(OPPGAVE_ID);
      setIsLoading(true);
      fetch(URL, {
        credentials: 'same-origin',
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 401) {
            throw new Error(
              'Kunne ikke hente oppgave på grunn av autorisasjonsfeil. Sjekk med din leder om du har tilgang til å vurdere manuelle oppgaver',
            );
          } else if (response.status === 204) {
            throw new Error('Oppgaven du prøver å hente er allerede løst');
          } else {
            throw new Error(`Feil ved henting av oppgave. Feilkode: ${response.status}`);
          }
        })
        .then((oppgave) => {
          setManOppgave(new ManuellOppgave(oppgave[0]));
        })
        .catch((error) => {
          console.error(error);
          setFeilmelding(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      setFeilmelding(error.message);
    }
  };

  const ferdigstillOppgave = (result: Result) => {
    setIsLoading(true);
    fetch(hentOppgaveUrlPut(manOppgave!.oppgaveid), {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    })
      .then((response) => {
        if (response.ok) {
          setIsCompleted(true);
          const GOSYS_URL = process.env.REACT_APP_GOSYS_URL;
          if (GOSYS_URL) {
            setTimeout(() => (window.location.href = GOSYS_URL), 1000);
          } else {
            throw new Error('Oppgaven ble ferdigstilt, men det var ikke mulig å sende deg tilbake til GOSY');
          }
        } else if (response.status === 401) {
          throw new Error(
            'Kunne vurdere oppgaven på grunn av autorisasjonsfeil. Sjekk med din leder om du har tilgang til å vurdere manuelle oppgaver',
          );
        } else {
          throw new Error(`Feil ved ferdigstilling av oppgaven. Feilkode: ${response.status}`);
        }
      })
      .catch((error) => {
        setFeilmelding(error.message);
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!manOppgave) {
      hentOppgave();
    }
  }, [manOppgave]);

  if (feilMelding) {
    return <Normaltekst>{feilMelding}</Normaltekst>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isCompleted) {
    return <Normaltekst>Oppgaven er løst... Du videresendes til GOSYS</Normaltekst>;
  }

  if (manOppgave) {
    return <MainContent manuellOppgave={manOppgave} ferdigstillOppgave={ferdigstillOppgave} />;
  }

  return <p>Ukjent feil</p>;
};

export default App;
