import React, { useEffect, useState } from 'react';
import useFetch, { isNotStarted, FetchState, isNotStartedOrPending, isAnyPending } from '../hooks/useFetch';
import { ManuellOppgave } from '../types/manuellOppgaveTypes';
import { hentOppgaveidFraUrlParameter, hentOppgaveUrl, hentOppgaveUrlPut, UrlError } from '../utils/urlUtils';
import Spinner from 'nav-frontend-spinner';
import EnRegel from './EnRegel';
import FlereRegler from './FlereRegler';
import { ValidationResult } from '../types/validationresultTypes';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';

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
      } catch (e) {
        if (e instanceof UrlError) {
          const OPPGAVE_ID_FRA_STORAGE = sessionStorage.getItem('OPPGAVE_ID');
          if (OPPGAVE_ID_FRA_STORAGE === null) {
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
      manOppgaveFetcher.fetch(URL, { credentials: 'same-origin' }, (fetchState: FetchState<ManuellOppgave[]>) => {
        if (fetchState.httpCode === 401) {
          setFeilmelding(
            'Kunne ikke hente oppgave på grunn av autorisasjonsfeil. Sjekk med din leder om du har tilgang til å vurdere manuelle oppgaver',
          );
        }
        if (!fetchState.data) {
          setFeilmelding('Ingen oppgave funnet');
          console.error('Ingen oppgave funnet');
        } else {
          try {
            setManOppgave(new ManuellOppgave(fetchState.data.shift()));
          } catch (error) {
            setFeilmelding('Kunne ikke formattere manuell oppgave');
            console.error(error);
          }
        }
      });
    }
  }, [manOppgaveFetcher]);

  const handterAvgjorelse = (avgjorelse: boolean | undefined): void => {
    if (avgjorelse === undefined) {
      // Skal ikke kunne skje
      const error = new Error('Avgjørelse ble satt til "undefined"');
      setFeilmelding(error.message);
      console.error(error);
    } else {
      if (manOppgave) {
        if (isNotStartedOrPending(manOppgavePutter)) {
          const URL = hentOppgaveUrlPut(manOppgave.oppgaveid);
          const valideringsresultat = new ValidationResult(manOppgave.validationResult);
          valideringsresultat.setStatus(avgjorelse);
          valideringsresultat.setTilbakemeldinger();
          manOppgavePutter.fetch(
            URL,
            {
              method: 'PUT',
              credentials: 'same-origin',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(valideringsresultat),
            },
            (fetchState: FetchState) => {
              if (fetchState.httpCode >= 401) {
                setFeilmelding(`Det har oppstått en feil med feilkode: ${fetchState.httpCode}`);
              } else {
                setManOppgave(null);
                sessionStorage.clear();
                const GOSYS_URL = process.env.REACT_APP_GOSYS_URL;
                if (GOSYS_URL) {
                  setTimeout(() => (window.location.href = GOSYS_URL), 2000);
                } else {
                  setFeilmelding('Oppagven ble ferdigstillt, men det var ikke mulig å sende deg tilbake til GOSYS');
                }
              }
            },
          );
        }
      } else {
        console.error('Manuell oppgave ble ikke funnet');
      }
    }
  };

  if (feilMelding) {
    return <Normaltekst>{feilMelding}</Normaltekst>;
  }

  if (manOppgave === null) {
    return <Undertittel>Oppgaven er løst... Du videresendes til GOSYS</Undertittel>;
  }

  if (isAnyPending([manOppgaveFetcher, manOppgavePutter])) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
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
