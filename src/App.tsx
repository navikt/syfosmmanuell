import React, { useEffect, useState } from 'react';
import './App.less';
import useFetch, { isNotStarted, FetchState, isNotStartedOrPending, isAnyPending } from './hooks/useFetch';
import { ManuellOppgave } from './types/manuellOppgaveTypes';
import {
  hentOppgaveidFraUrlParameter,
  hentOppgaveUrl,
  hentOppgaveUrlPut,
  UrlError,
  hentLoginUrl,
} from './utils/urlUtils';
import Spinner from 'nav-frontend-spinner';
import EnRegel from './components/EnRegel';
import FlereRegler from './components/FlereRegler';
import { ValidationResult, Status } from './types/validationresultTypes';
import { Undertittel } from 'nav-frontend-typografi';

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
        // Lagre oppgaveid i sessionStorage
        sessionStorage.setItem('OPPGAVE_ID', OPPGAVE_ID);
      } catch (e) {
        if (e instanceof UrlError) {
          // Prøv og hent oppgaveid fra sessionStorage
          const OPPGAVE_ID_FRA_STORAGE = sessionStorage.getItem('OPPGAVE_ID');
          if (OPPGAVE_ID_FRA_STORAGE === null) {
            // Hvis oppgaveid ikke finnes har det skjedd noe feil
            setFeilmelding(
              'Kunne ikke finne oppgaveid i URL eller sessionStorage. Lukk vinduet/fanen og forsøk å åpne oppgaven på nytt fra Gosys.',
            );
          } else {
            OPPGAVE_ID = OPPGAVE_ID_FRA_STORAGE;
          }
        } else {
          setFeilmelding('Ukjent feil');
          console.error(e);
        }
      }

      const URL = hentOppgaveUrl(OPPGAVE_ID);
      console.log('Henter manuell oppgave fra: ' + URL);
      manOppgaveFetcher.fetch(URL, { credentials: 'include' }, (fetchState: FetchState<ManuellOppgave[]>) => {
        if (fetchState.httpCode === 401) {
          window.location.href = hentLoginUrl();
        }
        if (!fetchState.data) {
          setFeilmelding('Ingen oppgaver funnet');
          console.error('Ingen oppgave funnet');
        } else {
          try {
            setManOppgave(new ManuellOppgave(fetchState.data.shift()));
          } catch (error) {
            setFeilmelding('Kunne ikke formattere manuell oppgave.');
            console.error(error);
          }
        }
      });
    }
  }, [manOppgaveFetcher]);

  const handterAvgjorelse = (avgjorelse: boolean | undefined): void => {
    if (avgjorelse === undefined) {
      // Skal ikke kunne skje
      console.error('Avgjørelse ble satt til "undefined"');
    }
    if (manOppgave) {
      if (isNotStartedOrPending(manOppgavePutter)) {
        const URL = hentOppgaveUrlPut(manOppgave.oppgaveid);
        const resultat = new ValidationResult({
          status: avgjorelse ? Status.OK : Status.INVALID,
          ruleHits: manOppgave.validationResult.ruleHits,
        });
        manOppgavePutter.fetch(
          URL,
          {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resultat),
          },
          (fetchState: FetchState) => {
            if (fetchState.httpCode === 401) {
              window.location.href = hentLoginUrl();
            }
            setManOppgave(null);
          },
        );
      }
    } else {
      console.error('Manuell oppgave ble ikke funnet');
    }
  };

  if (feilMelding) {
    return <p>{feilMelding}</p>;
  }

  if (manOppgave === null) {
    return <Undertittel>Oppgaven er løst</Undertittel>;
  }

  if (isAnyPending([manOppgaveFetcher, manOppgavePutter])) {
    return (
      <div style={{ marginLeft: '2rem', marginTop: '2rem' }}>
        <Spinner />
      </div>
    );
  }

  if (manOppgave?.validationResult.ruleHits.length === 1) {
    return (
      <EnRegel
        sykmelding={manOppgave.sykmelding}
        regel={manOppgave.validationResult.ruleHits[0].ruleName}
        handterAvgjorelse={handterAvgjorelse}
        handterAvbryt={() =>
          setFeilmelding(
            'Du har avbrutt oppgaven. Du kan enten lukke vinduet, eller laste inn siden på nytt for hente oppgaven tilbake.',
          )
        }
      />
    );
  }

  if (manOppgave) {
    if (manOppgave.validationResult.ruleHits.length > 1) {
      return <FlereRegler manOppgave={manOppgave} handterAvgjorelse={handterAvgjorelse} />;
    }
  }

  return <p>Ukjent feil</p>;
};

export default App;
