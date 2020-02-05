import React from 'react';
import { Sykmelding } from '../../../types/sykmeldingTypes';
import DiagnoseSeksjon from '../../infopanel/panelelementer/diagnose/DiagnoseSeksjon';
import InfoPanel from '../../infopanel/InfoPanel';
import SykmeldingPerioder from '../../infopanel/panelelementer/periode/SykmeldingPerioder';
import Friskmelding from '../../infopanel/utdypendeelementer/Friskmelding';
import BehandlingsDatoer from '../../infopanel/utdypendeelementer/BehandlingsDatoer';
import Arbeidsevne from '../../infopanel/utdypendeelementer/Arbeidsevne';
import Tilbakedateringsinfo from '../../infopanel/utdypendeelementer/Tilbakedateringsinfo';
import SeksjonMedTittel from '../../infopanel/layout/SeksjonMedTittel';

interface TilbakedatertProps {
  sykmelding: Sykmelding;
}

const Tilbakedatert = ({ sykmelding }: TilbakedatertProps) => {
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
      <Arbeidsevne
        tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen}
        tiltakNAV={sykmelding.tiltakNAV}
        andreTiltak={sykmelding.andreTiltak}
      />
    </InfoPanel>
  );
};

export default Tilbakedatert;
