import React from 'react';
import { Sykmelding } from '../../../types/sykmeldingTypes';
import DiagnoseSeksjon from '../../infopanel/panelelementer/diagnose/DiagnoseSeksjon';
import InfoPanel from '../../infopanel/InfoPanel';
import SykmeldingPerioder from '../../infopanel/panelelementer/periode/SykmeldingPerioder';
import BehandlingsDatoer from '../../infopanel/utdypendeelementer/BehandlingsDatoer';
import Friskmelding from '../../infopanel/utdypendeelementer/Friskmelding';
import Arbeidsevne from '../../infopanel/utdypendeelementer/Arbeidsevne';
import UtdypendeOpplysninger from '../../infopanel/utdypendeelementer/UtdypendeOpplysninger';
import Tilbakedateringsinfo from '../../infopanel/utdypendeelementer/Tilbakedateringsinfo';
import SeksjonMedTittel from '../../infopanel/layout/SeksjonMedTittel';

interface TilbakedatertForlengelseProps {
  sykmelding: Sykmelding;
}

const TilbakedatertForlengelse = ({ sykmelding }: TilbakedatertForlengelseProps) => {
  return (
    <InfoPanel tittel="Utdrag fra sykmeldingen" fargetema="advarsel">
      <SeksjonMedTittel understrek>
        <BehandlingsDatoer behandletTidspunkt={sykmelding.signaturDato} />
        <Tilbakedateringsinfo
          dokumenterbarKontaktDato={sykmelding.kontaktMedPasient.kontaktDato}
          kanIkkeIvaretaEgneInteresser={sykmelding.kontaktMedPasient.begrunnelseIkkeKontakt}
        />
        <SykmeldingPerioder perioder={sykmelding.perioder} />
        <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering.hovedDiagnose} />
      </SeksjonMedTittel>
      <Friskmelding prognose={sykmelding.prognose} />
      <UtdypendeOpplysninger opplysninger={sykmelding.utdypendeOpplysninger} />
      <Arbeidsevne
        tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen}
        tiltakNAV={sykmelding.tiltakNAV}
        andreTiltak={sykmelding.andreTiltak}
      />
    </InfoPanel>
  );
};

export default TilbakedatertForlengelse;
