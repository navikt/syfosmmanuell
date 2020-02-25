import React, { useEffect, useState } from 'react';
import { ManuellOppgave } from '../types/manuellOppgaveTypes';
import { hentOppgaveidFraUrlParameter, hentOppgaveUrl, hentOppgaveUrlPut, UrlError } from '../utils/urlUtils';
import Spinner from 'nav-frontend-spinner';
import FlereReglerController from './FlereReglerController';
import { ValidationResult } from '../types/validationresultTypes';
import { Normaltekst } from 'nav-frontend-typografi';
import EnRegelController from './EnRegelController';

const App = () => {
  const [manOppgave, setManOppgave] = useState<ManuellOppgave | null | undefined>(undefined);
  const [feilMelding, setFeilmelding] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const manOppgaveFetcher = async () => {
    try {
      const OPPGAVE_ID = hentOppgaveidFraUrlParameter(window.location.href);
      const URL = hentOppgaveUrl(OPPGAVE_ID);
      const response = await fetch(URL, { credentials: 'same-origin' });
      if (response.status === 401) {
        setFeilmelding(
          'Kunne ikke hente oppgave på grunn av autorisasjonsfeil. Sjekk med din leder om du har tilgang til å vurdere manuelle oppgaver',
        );
        console.error(
          'Kunne ikke hente oppgave på grunn av autorisasjonsfeil. Sjekk med din leder om du har tilgang til å vurdere manuelle oppgaver',
        );
      } else if (response.status === 204) {
        setFeilmelding('Oppgaven du prøver å hente er allerede løst');
        console.error('Oppgaven du prøver å hente er allerede løst');
      } else if (response.status >= 400) {
        setFeilmelding(`Feil ved henting av oppgave. Feilkode: ${response.status}`);
        console.error(`Feil ved henting av oppgave. Feilkode: ${response.status}`);
      } else {
        const data = await response.json();
        if (data.length === 0) {
          setFeilmelding('Ingen oppgaver funnet');
          console.error('Ingen oppgaver funnet');
        } else {
          setManOppgave(new ManuellOppgave(data[0]));
        }
      }
    } catch (error) {
      if (error instanceof UrlError) {
        setFeilmelding('Kunne ikke hente oppgaveid fra URL. Er du sikker på at du er på riktig sted?');
      }
      if (error instanceof TypeError) {
        setFeilmelding('Kunne ikke formattere oppgaven');
        setManOppgave(null);
      }
      console.error(error);
    }
  };

  const manOppgavePutter = async (manOppgave: ManuellOppgave) => {
    try {
      const URL = hentOppgaveUrlPut(manOppgave.oppgaveid);
      const valideringsresultat = new ValidationResult(manOppgave.validationResult);
      const response = await fetch(URL, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valideringsresultat),
      });
      if (response.status === 401) {
        setFeilmelding(
          'Kunne vurdere oppgaven på grunn av autorisasjonsfeil. Sjekk med din leder om du har tilgang til å vurdere manuelle oppgaver',
        );
        console.error(
          'Kunne vurdere oppgaven på grunn av autorisasjonsfeil. Sjekk med din leder om du har tilgang til å vurdere manuelle oppgaver',
        );
      } else if (response.status > 401) {
        setFeilmelding(`Det har oppstått en feil med feilkode: ${response.status}`);
        console.error(`Det har oppstått en feil med feilkode: ${response.status}`);
      } else if (response.ok) {
        const GOSYS_URL = process.env.REACT_APP_GOSYS_URL;
        if (GOSYS_URL) {
          setTimeout(() => (window.location.href = GOSYS_URL), 1000);
        } else {
          setFeilmelding('Oppagven ble ferdigstillt, men det var ikke mulig å sende deg tilbake til GOSYS');
          console.error('Oppagven ble ferdigstillt, men det var ikke mulig å sende deg tilbake til GOSYS');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (manOppgave === undefined && !isLoading) {
      setIsLoading(true);
      manOppgaveFetcher().finally(() => setIsLoading(false));
    }

    if (manOppgave?.validationResult.totalVurdering !== undefined && !isLoading) {
      setIsLoading(true);
      manOppgavePutter(manOppgave).finally(() => {
        setManOppgave(null);
        setIsLoading(false);
      });
    }
  }, [isLoading, manOppgave]);

  if (feilMelding) {
    return <Normaltekst>{feilMelding}</Normaltekst>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (manOppgave === null) {
    return <Normaltekst>Oppgaven er løst... Du videresendes til GOSYS</Normaltekst>;
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
