import React, { useContext, useEffect } from 'react';
import { ManuellOppgave } from '../types/manuellOppgaveTypes';
import Spinner from 'nav-frontend-spinner';
import { Normaltekst } from 'nav-frontend-typografi';
import MainContent from './MainContent';
import { ApiError, hentOppgave } from '../utils/dataUtils';
import { StoreContext } from '../data/store';

const App = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { manuellOppgave, isLoading, isCompleted, error } = state;

  useEffect(() => {
    if (!manuellOppgave) {
      (async () => {
        dispatch({ type: 'FETCHING' });
        try {
          const OPPGAVE_ID = new URL(window.location.href).searchParams.get('oppgaveid');
          if (OPPGAVE_ID === null) {
            throw new Error('Oppgaveid mangler i lenken.');
          } else {
            const manuellOppgaveRawJson = await hentOppgave(OPPGAVE_ID);
            const manuellOppgave = new ManuellOppgave(manuellOppgaveRawJson);

            dispatch({ type: 'TASK_LOADED', payload: manuellOppgave });
          }
        } catch (error) {
          console.error(error);
          if (error instanceof ApiError) {
            dispatch({ type: 'ERROR', payload: error });
          } else if (error instanceof TypeError) {
            dispatch({ type: 'ERROR', payload: new Error('Det oppsto en feil med oppgaven.') });
          } else {
            dispatch({ type: 'ERROR', payload: new Error('En ukjent feil oppsto.') });
          }
        }
      })();
    }
  }, [manuellOppgave]);

  useEffect(() => {
    if (isCompleted) {
      const GOSYS_URL = process.env.REACT_APP_GOSYS_URL;
      if (GOSYS_URL) {
        setTimeout(() => {
          window.location.href = GOSYS_URL;
        }, 1000);
      } else {
        dispatch({
          type: 'ERROR',
          payload: new Error(
            'Oppgaven ble registrert, men det oppsto en feil da vi forsøkte å sende deg tilbake til GOSYS.',
          ),
        });
      }
    }
  }, [isCompleted]);

  if (error) {
    return (
      <div className="margin-top--2">
        <Normaltekst>{error.message}</Normaltekst>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="margin-top--2">
        <Spinner />
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="margin-top--2">
        <Normaltekst>Oppgaven er registrert. Du videresendes automatisk til GOSYS.</Normaltekst>
      </div>
    );
  }

  if (manuellOppgave) {
    return <MainContent manuellOppgave={manuellOppgave} />;
  }

  return <p>Ukjent feil</p>;
};

export default App;
