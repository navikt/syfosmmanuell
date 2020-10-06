import React, { useState } from 'react';
import './EnRegel.less';
import Sykmeldingheader from './sykmelding/SykmeldingHeader';
import RadioOgKnapper from './RadioOgKnapper';
import Sykmelding from './sykmelding/SykmeldingVelger';
import { RuleInfo } from '../types/validationresultTypes';
import { Panel } from 'nav-frontend-paneler';
import { Flatknapp } from 'nav-frontend-knapper';
import HeleSykmeldingen from './sykmelding/sykmeldingvarianter/HeleSykmeldingen';
import { ReceivedSykmelding } from '../types/manuellOppgaveTypes';

interface EnRegelProps {
  receivedSykmelding: ReceivedSykmelding;
  regelUtslag: RuleInfo[];
  handterAvgjorelse: (avgjorelse: boolean) => void;
  handterAvbryt: () => void;
}

const EnRegel = ({ receivedSykmelding, regelUtslag, handterAvgjorelse, handterAvbryt }: EnRegelProps) => {
  const [visHeleSykmeldingen, setVisHeleSykmeldingen] = useState(false);
  const { sykmelding, personNrPasient, mottattDato } = receivedSykmelding;

  return (
    <Panel border className="panel">
      <Sykmeldingheader
        regelUtslag={regelUtslag}
        arbeidsgiver={sykmelding.arbeidsgiver.navn}
        sykmelder={sykmelding.navnFastlege}
        mottattDato={mottattDato}
      />
      <Sykmelding sykmelding={sykmelding} personNrPasient={personNrPasient} />
      <RadioOgKnapper handterAvgjorelse={handterAvgjorelse} handterAvbryt={handterAvbryt} />
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

export default EnRegel;
