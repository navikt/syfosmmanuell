import React, { useEffect, useState } from 'react';
import './App.less';
import useFetch, { isNotStarted, FetchState, isNotStartedOrPending, isAnyPending } from './hooks/useFetch';
import { ManuellOppgave } from './types/manuellOppgaveTypes';
import { hentOppgaveidFraUrlParameter, hentOppgaveUrl, hentOppgaveUrlPut } from './utils/urlUtils';
import Spinner from 'nav-frontend-spinner';
import EnRegel from './components/EnRegel';
import FlereRegler from './components/FlereRegler';
import { ValidationResult, Status } from './types/validationresultTypes';
import { Undertittel } from 'nav-frontend-typografi';

const App = () => {
  const [manOppgave, setManOppgave] = useState<ManuellOppgave | null>();
  const [feilMelding, setFeilmelding] = useState<string | null>(null);
  const manOppgaveFetcher = useFetch<ManuellOppgave[]>();
  const manOppgavePutter = useFetch<ManuellOppgave>();

  useEffect(() => {
    if (isNotStarted(manOppgaveFetcher)) {
      let OPPGAVE_ID = '';
      try {
        OPPGAVE_ID = hentOppgaveidFraUrlParameter(window.location.href);
      } catch (error) {
        console.error(error);
      }
      const URL = hentOppgaveUrl(OPPGAVE_ID);
      console.log(URL);
      manOppgaveFetcher.fetch(URL, undefined, (fetchState: FetchState<ManuellOppgave[]>) => {
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resultat),
          },
          () => {
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
