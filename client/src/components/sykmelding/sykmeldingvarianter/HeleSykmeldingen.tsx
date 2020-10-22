import React from 'react';
import { Sykmelding } from '../../../types/sykmeldingTypes';
import DiagnoseSeksjon from '../../infopanel/panelelementer/diagnose/DiagnoseSeksjon';
import InfoPanel from '../../infopanel/InfoPanel';
import SykmeldingPerioder from '../../infopanel/panelelementer/periode/SykmeldingPerioder';
import BehandlingsDatoer from '../../infopanel/utdypendeelementer/BehandlingsDatoer';
import FraverSeksjon from '../../infopanel/panelelementer/FraverSeksjon';
import SvangerskapSeksjon from '../../infopanel/panelelementer/SvangerskapSeksjon';
import SkadeSeksjon from '../../infopanel/panelelementer/SkadeSeksjon';
import PrognoseSeksjon from '../../infopanel/panelelementer/PrognoseSeksjon';
import ArbeidsuforSeksjon from '../../infopanel/panelelementer/ArbeidsuforSeksjon';
import ArbeidsgiverSeksjon from '../../infopanel/panelelementer/ArbeidsgiverSeksjon';
import LegeSeksjon from '../../infopanel/panelelementer/LegeSeksjon';
import Utvidbar from '../../utvidbar/Utvidbar';
import doktor from '../../../svg/doktor.svg';
import doktorHover from '../../../svg/doktorHover.svg';
import MulighetForArbeid from '../../infopanel/utdypendeelementer/MulighetForArbeid';
import Friskmelding from '../../infopanel/utdypendeelementer/Friskmelding';
import UtdypendeOpplysninger from '../../infopanel/utdypendeelementer/UtdypendeOpplysninger';
import Arbeidsevne from '../../infopanel/utdypendeelementer/Arbeidsevne';
import Annet from '../../infopanel/utdypendeelementer/Annet';
import SeksjonMedTittel from '../../infopanel/layout/SeksjonMedTittel';
import { Flatknapp } from 'nav-frontend-knapper';

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
