import React, { useState } from 'react';
import './MainContent.less';
import Sykmeldingheader from './sykmelding/SykmeldingHeader';
import { Flatknapp } from 'nav-frontend-knapper';
import HeleSykmeldingen from './sykmelding/sykmeldingvarianter/HeleSykmeldingen';
import { ManuellOppgave } from '../types/manuellOppgaveTypes';
import { Result } from '../types/resultTypes';
import TilbakedatertForlengelse from './sykmelding/sykmeldingvarianter/TilbakedatertForlengelse';
import Form from './form/Form';

interface MainContentProps {
  manuellOppgave: ManuellOppgave;
  ferdigstillOppgave: (result: Result) => void;
}

const MainContent = ({ manuellOppgave, ferdigstillOppgave }: MainContentProps) => {
  const [visHeleSykmeldingen, setVisHeleSykmeldingen] = useState(false);
  const { receivedSykmelding, validationResult } = manuellOppgave;
  const { ruleHits } = validationResult;
  const { sykmelding, personNrPasient, mottattDato } = receivedSykmelding;

  return (
    <div className="panel">
      <Sykmeldingheader
        regelUtslag={ruleHits}
        arbeidsgiver={sykmelding.arbeidsgiver.navn}
        sykmelder={sykmelding.navnFastlege}
        mottattDato={mottattDato}
      />
      <TilbakedatertForlengelse sykmelding={sykmelding} personNrPasient={personNrPasient} />
      <Form ferdigstillOppgave={ferdigstillOppgave} />
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
