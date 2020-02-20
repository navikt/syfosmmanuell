import React, { useEffect, useState } from 'react';
import useFetch, { isNotStarted, FetchState, isAnyPending } from '../hooks/useFetch';
import { ManuellOppgave } from '../types/manuellOppgaveTypes';
import { hentOppgaveidFraUrlParameter, hentOppgaveUrl, hentOppgaveUrlPut, UrlError } from '../utils/urlUtils';
import Spinner from 'nav-frontend-spinner';
import FlereReglerController from './FlereReglerController';
import { ValidationResult } from '../types/validationresultTypes';
import { Normaltekst } from 'nav-frontend-typografi';
import EnRegelController from './EnRegelController';

const App = () => {
  const [manOppgave, setManOppgave] = useState<ManuellOppgave | null>();
  const [feilMelding, setFeilmelding] = useState<string | null>(null);
  const manOppgaveFetcher = useFetch<ManuellOppgave[]>();
  const manOppgavePutter = useFetch<any>();

  useEffect(() => {
    if (isNotStarted(manOppgaveFetcher)) {
      let OPPGAVE_ID = '';
      try {
        OPPGAVE_ID = hentOppgaveidFraUrlParameter(window.location.href);
        sessionStorage.setItem('OPPGAVE_ID', OPPGAVE_ID);
      } catch (error) {
        if (error instanceof UrlError) {
          const OPPGAVE_ID_FRA_STORAGE = sessionStorage.getItem('OPPGAVE_ID');
          if (OPPGAVE_ID_FRA_STORAGE === null) {
            setFeilmelding(
              'Kunne ikke finne oppgaveid i URL eller sessionStorage. Lukk vinduet/fanen og forsøk å åpne oppgaven på nytt fra Gosys.',
            );
            console.error(`Kunne ikke finne oppgaveid i URL eller sessionStorage. ${error}`);
          } else {
            OPPGAVE_ID = OPPGAVE_ID_FRA_STORAGE;
          }
        } else {
          setFeilmelding('Ukjent feil');
          console.error(error);
        }
      }
      const URL = hentOppgaveUrl(OPPGAVE_ID);
      manOppgaveFetcher.fetch(URL, { credentials: 'same-origin' }, (fetchState: FetchState<ManuellOppgave[]>) => {
        if (fetchState.httpCode === 401) {
          setFeilmelding(
            'Kunne ikke hente oppgave på grunn av autorisasjonsfeil. Sjekk med din leder om du har tilgang til å vurdere manuelle oppgaver',
          );
        } else if (fetchState.httpCode === 204) {
          setFeilmelding('Oppgaven du prøver å hente er allerede løst');
          console.error(`Oppgaven du prøver å hente er allerede løst. HTTP status code: ${fetchState.httpCode}`);
        } else if (fetchState.httpCode >= 400) {
          setFeilmelding(`Feil ved henting av oppgave. HTTP status code: ${fetchState.httpCode}`);
          console.error(`Feil ved henting av oppgave. HTTP status code: ${fetchState.httpCode}`);
        } else if (!fetchState.data || fetchState.data.length === 0) {
          setFeilmelding('Ingen oppgave funnet');
          console.error('Ingen oppgave funnet');
        } else {
          try {
            setManOppgave(new ManuellOppgave(fetchState.data[0]));
          } catch (error) {
            setFeilmelding(`Feil ved formattering av manuell oppgave. Feilkode: ${error}`);
            console.error(`Feil ved formattering av manuell oppgave. Feilkode: ${error}`);
          }
        }
      });
    }
  }, [manOppgaveFetcher]);

  useEffect(() => {
    if (manOppgave?.validationResult.totalVurdering !== undefined) {
      if (isNotStarted(manOppgavePutter)) {
        const URL = hentOppgaveUrlPut(manOppgave.oppgaveid);
        const valideringsresultat = new ValidationResult(manOppgave.validationResult);
        manOppgavePutter.fetch(
          URL,
          {
            method: 'PUT',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(valideringsresultat),
          },
          (fetchState: FetchState) => {
            if (fetchState.httpCode !== 204) {
              setFeilmelding(`Det oppsto en feil ved innsending. HTTPfeilkode: ${fetchState.httpCode}`);
              console.error(`Det oppsto en feil ved innsending. HTTPfeilkode: ${fetchState.httpCode}`);
            } else {
              setManOppgave(null);
              sessionStorage.clear();
              const GOSYS_URL = process.env.REACT_APP_GOSYS_URL;
              if (GOSYS_URL) {
                setTimeout(() => (window.location.href = GOSYS_URL), 1000);
              } else {
                setFeilmelding('Oppagven ble ferdigstillt, men det var ikke mulig å sende deg tilbake til GOSYS');
                console.error('Oppagven ble ferdigstillt, men det var ikke mulig å sende deg tilbake til GOSYS');
              }
            }
          },
        );
      }
    }
  }, [manOppgave, manOppgavePutter]);

  if (feilMelding) {
    return <Normaltekst>{feilMelding}</Normaltekst>;
  }

  if (manOppgave === null) {
    return <Normaltekst>Oppgaven er løst... Du videresendes til GOSYS</Normaltekst>;
  }

  if (isAnyPending([manOppgaveFetcher, manOppgavePutter])) {
    return <Spinner />;
  }

  if (manOppgave?.validationResult.ruleHits.length === 1) {
    return <EnRegelController manuellOppgave={manOppgave} setManOppgave={setManOppgave} />;
  }

  if (manOppgave) {
    if (manOppgave.validationResult.ruleHits.length > 1) {
      return <FlereReglerController manOppgave={manOppgave} setManOppgave={setManOppgave} />;
    }
  }

  return <p>Ukjent feil</p>;
};

export default App;
