import React, { useState } from 'react';
import './Controller.less';
import Sykmeldingheader from './sykmelding/SykmeldingHeader';
import Vurderingspanel from './Vurderingspanel';
import { Panel } from 'nav-frontend-paneler';
import { Flatknapp } from 'nav-frontend-knapper';
import HeleSykmeldingen from './sykmelding/sykmeldingvarianter/HeleSykmeldingen';
import { ManuellOppgave } from '../types/manuellOppgaveTypes';
import { Result } from '../types/resultTypes';
import TilbakedatertForlengelse from './sykmelding/sykmeldingvarianter/TilbakedatertForlengelse';

interface ControllerProps {
  manuellOppgave: ManuellOppgave;
  ferdigstillOppgave: (result: Result, oppgaveid: number) => void;
}

const Controller = ({ manuellOppgave, ferdigstillOppgave }: ControllerProps) => {
  const [visHeleSykmeldingen, setVisHeleSykmeldingen] = useState(false);
  const { receivedSykmelding, validationResult, oppgaveid } = manuellOppgave;
  const { ruleHits } = validationResult;
  const { sykmelding, personNrPasient, mottattDato } = receivedSykmelding;

  const handterAvgjorelse = (avgjorelse: boolean): void => {
    const result: Result = {
      godkjent: avgjorelse,
      messageForSender: '', // TODO: Correct message for sender
    };

    ferdigstillOppgave(result, oppgaveid);
  };

  const handterAvbryt = (): void => {
    console.log('avbryt trykket');
  };

  return (
    <Panel border className="panel">
      <Sykmeldingheader
        regelUtslag={ruleHits}
        arbeidsgiver={sykmelding.arbeidsgiver.navn}
        sykmelder={sykmelding.navnFastlege}
        mottattDato={mottattDato}
      />
      <TilbakedatertForlengelse sykmelding={sykmelding} personNrPasient={personNrPasient} />
      <Vurderingspanel handterAvgjorelse={handterAvgjorelse} handterAvbryt={handterAvbryt} />
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
    </Panel>
  );
};

export default Controller;
