import React, { useEffect, useRef, useState } from 'react';
import { ManuellOppgave } from '../types/manuellOppgaveTypes';
import { hentOppgaveidFraUrlParameter } from '../utils/urlUtils';
import Spinner from 'nav-frontend-spinner';
import { Normaltekst } from 'nav-frontend-typografi';
import MainContent from './MainContent';
import { FormShape } from './form/Form';

interface AppProps {
  enhet: string | null | undefined;
}

const App = ({ enhet }: AppProps) => {
  const [manOppgave, setManOppgave] = useState<ManuellOppgave | null | undefined>(undefined);
  const [apiError, setApiError] = useState<Error | null>(null);
  const [missingEnhetError, setMissingEnhetError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Need to store enhet in a ref becuase setTimeout reads value of "enhet" at declaration
  const enhetRef = useRef(enhet);
  enhetRef.current = enhet;

  // if enhet is not passed from the decorator within 10s -> display error
  useEffect(() => {
    if (enhet) {
      setMissingEnhetError(null);
    } else {
      const timer = setTimeout(() => {
        if (!enhetRef.current) {
          setMissingEnhetError(
            new Error('Feil ved henting av valgt enhet. Har du husket å velge enhet i menyen øverst på siden?'),
          );
        }
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [enhet]);

  const hentOppgave = () => {
    try {
      const OPPGAVE_ID = hentOppgaveidFraUrlParameter(window.location.href);
      const URL = `/backend/api/v1/manuellOppgave/${OPPGAVE_ID}`;
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
          setManOppgave(new ManuellOppgave(oppgave));
        })
        .catch((error) => {
          console.error(error);
          setApiError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      setApiError(error);
    }
  };

  const ferdigstillOppgave = (result: FormShape) => {
    setIsLoading(true);
    const URL = `/backend/api/v1/vurderingmanuelloppgave/${manOppgave!.oppgaveid}`;
    fetch(URL, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', 'X-Nav-Enhet': enhet! },
      body: JSON.stringify(result),
    })
      .then((response) => {
        if (response.ok) {
          setIsCompleted(true);
          const GOSYS_URL = process.env.REACT_APP_GOSYS_URL;
          if (GOSYS_URL) {
            setTimeout(() => (window.location.href = GOSYS_URL), 1000);
          } else {
            throw new Error('Oppgaven ble ferdigstilt, men det var ikke mulig å sende deg tilbake til GOSYS');
          }
        } else if (response.status === 401) {
          throw new Error(
            'Kunne ikke vurdere oppgaven på grunn av autorisasjonsfeil. Sjekk med din leder om du har tilgang til å vurdere manuelle oppgaver',
          );
        } else {
          throw new Error(`Feil ved ferdigstilling av oppgaven. Feilkode: ${response.status}`);
        }
      })
      .catch((error) => {
        setApiError(error);
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

  if (apiError) {
    return (
      <div className="margin-top--2">
        <Normaltekst>{apiError.message}</Normaltekst>
      </div>
    );
  }

  if (missingEnhetError) {
    return (
      <div className="margin-top--2">
        <Normaltekst>{missingEnhetError.message}</Normaltekst>
      </div>
    );
  }

  if (isLoading || !enhet) {
    return (
      <div className="margin-top--2">
        <Spinner />
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="margin-top--2">
        <Normaltekst>Oppgaven er løst... Du videresendes til GOSYS</Normaltekst>
      </div>
    );
  }

  if (manOppgave) {
    return <MainContent manuellOppgave={manOppgave} ferdigstillOppgave={ferdigstillOppgave} />;
  }

  return <p>Ukjent feil</p>;
};

export default App;
