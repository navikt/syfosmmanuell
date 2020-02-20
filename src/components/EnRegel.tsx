import React, { useState } from 'react';
import './EnRegel.less';
import Sykmeldingheader from './sykmelding/SykmeldingHeader';
import RadioOgKnapper from './RadioOgKnapper';
import { Sykmelding as SykmeldingType } from '../types/sykmeldingTypes';
import Sykmelding from './sykmelding/SykmeldingVelger';
import { RuleNames } from '../types/validationresultTypes';
import { Panel } from 'nav-frontend-paneler';
import { Flatknapp } from 'nav-frontend-knapper';
import HeleSykmeldingen from './sykmelding/sykmeldingvarianter/HeleSykmeldingen';

interface EnRegelProps {
  sykmelding: SykmeldingType;
  regel: RuleNames;
  finnesFlereRegler?: boolean;
  handterAvgjorelse: (avgjorelse: boolean) => void;
  handterAvbryt: () => void;
}

const EnRegel = ({ sykmelding, regel, finnesFlereRegler, handterAvgjorelse, handterAvbryt }: EnRegelProps) => {
  const [visHeleSykmeldingen, setVisHeleSykmeldingen] = useState(false);

  return (
    <Panel border className="panel">
      <Sykmeldingheader regel={regel} arbeidsgiver={sykmelding.arbeidsgiver.navn} sykmelder={sykmelding.navnFastlege} />
      <Sykmelding sykmelding={sykmelding} regel={regel} />
      <RadioOgKnapper
        regel={regel}
        knappetekst={finnesFlereRegler ? 'Lagre' : 'Ferdigstill'}
        handterAvgjorelse={handterAvgjorelse}
        handterAvbryt={handterAvbryt}
      />
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
