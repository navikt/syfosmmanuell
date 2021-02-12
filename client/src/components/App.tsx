import React, { useEffect, useRef, useState } from 'react';
import { ManuellOppgave } from '../types/manuellOppgaveTypes';
import Spinner from 'nav-frontend-spinner';
import { Normaltekst } from 'nav-frontend-typografi';
import MainContent from './MainContent';
import { FormShape } from './form/Form';
import { ApiError, hentOppgave, vurderOppgave } from '../utils/dataUtils';

class MissingEnhetError extends Error {}

interface AppProps {
  enhet: string | null | undefined;
}

const App = ({ enhet }: AppProps) => {
  const [manOppgave, setManOppgave] = useState<ManuellOppgave | null | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Need to store enhet in a ref becuase setTimeout reads value of "enhet" at declaration
  const enhetRef = useRef(enhet);
  enhetRef.current = enhet;

  // if enhet is not passed from the decorator within 10s -> display error
  useEffect(() => {
    if (enhet) {
      setError(null);
    } else {
      const timer = setTimeout(() => {
        if (!enhetRef.current) {
          setError(
            new MissingEnhetError(
              'Feil ved henting av valgt enhet. Har du husket å velge enhet i menyen øverst på siden?',
            ),
          );
        }
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [enhet]);

  const ferdigstillOppgave = async (result: FormShape) => {
    setIsLoading(true);
    try {
      await vurderOppgave(`${manOppgave?.oppgaveid}`, enhet!!, result);
      setIsCompleted(true);
    } catch (error) {
      console.error(error);
      if (error instanceof ApiError) {
        setError(error);
      } else {
        setError(new Error('En ukjnet feil oppsto ved vurdering av oppgaven.'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!manOppgave) {
      (async () => {
        setIsLoading(true);
        try {
          const OPPGAVE_ID = new URL(window.location.href).searchParams.get('oppgaveid');
          if (OPPGAVE_ID === null) {
            throw new Error('Oppgaveid mangler i lenken.');
          } else {
            const manuellOppgaveRawJson = await hentOppgave(OPPGAVE_ID);
            const manuellOppgave = new ManuellOppgave(manuellOppgaveRawJson);
            setManOppgave(manuellOppgave);
          }
        } catch (error) {
          console.error(error);
          if (error instanceof ApiError) {
            setError(error);
          } else if (error instanceof TypeError) {
            setError(new Error('Det oppsto en feil med oppgaven.'));
          } else {
            setError(new Error('En ukjent feil oppsto.'));
          }
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [manOppgave]);

  if (error) {
    return (
      <div className="margin-top--2">
        <Normaltekst>{error.message}</Normaltekst>
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
