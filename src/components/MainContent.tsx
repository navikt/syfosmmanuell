import React, { useState } from 'react';
import Sykmeldingheader from './sykmelding/SykmeldingHeader';
import { Flatknapp } from 'nav-frontend-knapper';
import HeleSykmeldingen from './sykmelding/sykmeldingvarianter/HeleSykmeldingen';
import TilbakedatertForlengelse from './sykmelding/sykmeldingvarianter/TilbakedatertForlengelse';
import Form, { FormShape } from './form/Form';
import { ManuellOppgave } from '../types/manuellOppgave';
import { vurderOppgave } from '../utils/dataUtils';
import { logger } from '../utils/logger';

interface MainContentProps {
  manuellOppgave: ManuellOppgave;
  aktivEnhet: string;
}

const MainContent = ({ manuellOppgave, aktivEnhet }: MainContentProps) => {
  const [visHeleSykmeldingen, setVisHeleSykmeldingen] = useState(false);
  const { sykmelding, personNrPasient, mottattDato } = manuellOppgave;
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formState: FormShape) => {
    try {
      await vurderOppgave(manuellOppgave.oppgaveid, aktivEnhet, formState);
    } catch (e) {
      // @ts-expect-error
      logger.error(e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Ukjent feil');
      }
    }
  };

  return (
    <div className="panel">
      <Sykmeldingheader
        arbeidsgiverNavn={sykmelding.arbeidsgiver.navn}
        sykmelder={sykmelding.navnFastlege}
        mottattDato={mottattDato}
        personNrPasient={personNrPasient}
      />
      <TilbakedatertForlengelse sykmelding={sykmelding} personNrPasient={personNrPasient} />
      <Form onSubmit={handleSubmit} />
      {error && <div>Noko er jo feil her: {error}</div>}
      <div className="hele-sykmeldingen-visning">
        <Flatknapp
          form="kompakt"
          onClick={() => setVisHeleSykmeldingen(!visHeleSykmeldingen)}
          className="hele-sykmeldingen-visning__knapp"
        >
          {visHeleSykmeldingen ? 'Skjul hele sykmeldingen' : 'Vis hele sykmeldingen'}
        </Flatknapp>
      </div>
      {visHeleSykmeldingen && (
        <HeleSykmeldingen sykmelding={sykmelding} setVisHeleSykmeldingen={setVisHeleSykmeldingen} />
      )}
    </div>
  );
};

export default MainContent;
