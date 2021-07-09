import React, { useState } from 'react';
import './MainContent.less';
import Sykmeldingheader from './sykmelding/SykmeldingHeader';
import { Flatknapp } from 'nav-frontend-knapper';
import HeleSykmeldingen from './sykmelding/sykmeldingvarianter/HeleSykmeldingen';
import TilbakedatertForlengelse from './sykmelding/sykmeldingvarianter/TilbakedatertForlengelse';
import Form from './form/Form';
import { ManuellOppgave } from '../types/manuellOppgave';

interface MainContentProps {
  manuellOppgave: ManuellOppgave;
}

const MainContent = ({ manuellOppgave }: MainContentProps) => {
  const [visHeleSykmeldingen, setVisHeleSykmeldingen] = useState(false);
  const { sykmelding, personNrPasient, mottattDato } = manuellOppgave;

  return (
    <div className="panel">
      <Sykmeldingheader
        arbeidsgiverNavn={sykmelding.arbeidsgiver.navn}
        sykmelder={sykmelding.navnFastlege}
        mottattDato={mottattDato}
        personNrPasient={personNrPasient}
      />
      <TilbakedatertForlengelse sykmelding={sykmelding} personNrPasient={personNrPasient} />
      <Form />
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
