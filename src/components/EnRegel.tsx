import React, { useState } from 'react';
import './regel.less';
import Sykmeldingheader from './sykmelding/SykmeldingHeader';
import RadioOgKnapper from './RadioOgKnapper';
import { Sykmelding as SykmeldingType } from '../types/sykmeldingTypes';
import Sykmelding from '../components/sykmelding/Sykmelding';
import { RuleNames } from '../types/validationresultTypes';
import { Panel } from 'nav-frontend-paneler';
import { Systemtittel } from 'nav-frontend-typografi';
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
      <div className="sykmelding-wrapper" style={{ padding: '1rem' }}>
        <Systemtittel style={{ marginBottom: '1rem', textAlign: 'center' }}>
          En sykmelding må vurderes manuelt
        </Systemtittel>
        <Sykmeldingheader
          regel={regel}
          arbeidsgiver={sykmelding.arbeidsgiver.navn}
          sykmelder={sykmelding.navnFastlege}
        />
        <Sykmelding sykmelding={sykmelding} regel={regel} />
        <RadioOgKnapper
          regel={regel}
          knappetekst={finnesFlereRegler ? 'Lagre' : 'Ferdigstill'}
          handterAvgjorelse={handterAvgjorelse}
          handterAvbryt={handterAvbryt}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <Flatknapp
          form="kompakt"
          onClick={() => setVisHeleSykmeldingen(!visHeleSykmeldingen)}
          style={{ marginTop: '2rem', marginBottom: '2rem' }}
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
