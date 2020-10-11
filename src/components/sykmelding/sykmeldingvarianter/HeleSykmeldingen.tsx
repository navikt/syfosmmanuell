import React from 'react';
import { Sykmelding } from '../../../types/sykmeldingTypes';
import doktor from '../../../svg/doktor.svg';
import doktorHover from '../../../svg/doktorHover.svg';
import { Flatknapp } from 'nav-frontend-knapper';
import InfoPanel from '../layout/infopanel/InfoPanel';
import SeksjonMedTittel from '../layout/infopanel/layout/SeksjonMedTittel';
import ArbeidsgiverSeksjon from '../layout/infopanel/panelelementer/ArbeidsgiverSeksjon';
import ArbeidsuforSeksjon from '../layout/infopanel/panelelementer/ArbeidsuforSeksjon';
import DiagnoseSeksjon from '../layout/infopanel/panelelementer/diagnose/DiagnoseSeksjon';
import FraverSeksjon from '../layout/infopanel/panelelementer/FraverSeksjon';
import LegeSeksjon from '../layout/infopanel/panelelementer/LegeSeksjon';
import SykmeldingPerioder from '../layout/infopanel/panelelementer/periode/SykmeldingPerioder';
import PrognoseSeksjon from '../layout/infopanel/panelelementer/PrognoseSeksjon';
import SkadeSeksjon from '../layout/infopanel/panelelementer/SkadeSeksjon';
import SvangerskapSeksjon from '../layout/infopanel/panelelementer/SvangerskapSeksjon';
import Annet from '../layout/infopanel/utdypendeelementer/Annet';
import Arbeidsevne from '../layout/infopanel/utdypendeelementer/Arbeidsevne';
import BehandlingsDatoer from '../layout/infopanel/utdypendeelementer/BehandlingsDatoer';
import Friskmelding from '../layout/infopanel/utdypendeelementer/Friskmelding';
import MulighetForArbeid from '../layout/infopanel/utdypendeelementer/MulighetForArbeid';
import UtdypendeOpplysninger from '../layout/infopanel/utdypendeelementer/UtdypendeOpplysninger';
import Utvidbar from '../layout/utvidbar/Utvidbar';

interface HeleSykmeldingenProps {
  sykmelding: Sykmelding;
  setVisHeleSykmeldingen: (value: boolean) => void;
}

const HeleSykmeldingen = ({ sykmelding, setVisHeleSykmeldingen }: HeleSykmeldingenProps) => {
  return (
    <>
      <InfoPanel tittel="Hele sykmeldingen" fargetema="info">
        <SykmeldingPerioder perioder={sykmelding.perioder} />
        <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering.hovedDiagnose} />
        {sykmelding.medisinskVurdering.biDiagnoser.map((diagnose, index) => (
          <DiagnoseSeksjon key={index.toString()} diagnose={diagnose} bidiagnose />
        ))}
        <FraverSeksjon annenFraversArsak={sykmelding.medisinskVurdering.annenFraversArsak} />
        <SvangerskapSeksjon svangerskap={sykmelding.medisinskVurdering.svangerskap} />
        <SkadeSeksjon medisinskVurdering={sykmelding.medisinskVurdering} />
        <ArbeidsuforSeksjon prognose={sykmelding.prognose} />
        <PrognoseSeksjon prognose={sykmelding.prognose} />
        <ArbeidsgiverSeksjon arbeidsgiver={sykmelding.arbeidsgiver} />
        <LegeSeksjon navn={sykmelding.navnFastlege} />
        <Utvidbar ikon={doktor} ikonHover={doktorHover} tittel="Flere opplysninger fra sykmelder">
          <SeksjonMedTittel understrek>
            <BehandlingsDatoer
              signaturDato={sykmelding.signaturDato}
              syketilfelleStartDato={sykmelding.syketilfelleStartDato}
            />
          </SeksjonMedTittel>
          <MulighetForArbeid perioder={sykmelding.perioder} />
          <Friskmelding prognose={sykmelding.prognose} />
          <UtdypendeOpplysninger opplysninger={sykmelding.utdypendeOpplysninger} />
          <Arbeidsevne
            tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen}
            tiltakNAV={sykmelding.tiltakNAV}
            andreTiltak={sykmelding.andreTiltak}
          />
          <Annet
            meldingTilNAV={sykmelding.meldingTilNAV}
            meldingTilArbeidsgiver={sykmelding.meldingTilArbeidsgiver}
            behandlerTelefon={sykmelding.behandler.tlf}
          />
        </Utvidbar>
        <div style={{ textAlign: 'center' }}>
          <Flatknapp
            form="kompakt"
            onClick={() => setVisHeleSykmeldingen(false)}
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
          >
            Skjul hele sykmeldingen
          </Flatknapp>
        </div>
      </InfoPanel>
    </>
  );
};

export default HeleSykmeldingen;
