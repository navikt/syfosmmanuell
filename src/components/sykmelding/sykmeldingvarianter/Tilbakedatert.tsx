import React from 'react';
import { Sykmelding } from '../../../types/sykmeldingTypes';
import InfoPanel from '../layout/infopanel/InfoPanel';
import ElementMedTekst from '../layout/infopanel/layout/ElementMedTekst';
import SeksjonMedTittel from '../layout/infopanel/layout/SeksjonMedTittel';
import DiagnoseSeksjon from '../layout/infopanel/panelelementer/diagnose/DiagnoseSeksjon';
import SykmeldingPerioder from '../layout/infopanel/panelelementer/periode/SykmeldingPerioder';
import Arbeidsevne from '../layout/infopanel/utdypendeelementer/Arbeidsevne';
import BehandlingsDatoer from '../layout/infopanel/utdypendeelementer/BehandlingsDatoer';
import Friskmelding from '../layout/infopanel/utdypendeelementer/Friskmelding';
import Tilbakedateringsinfo from '../layout/infopanel/utdypendeelementer/Tilbakedateringsinfo';

interface TilbakedatertProps {
  sykmelding: Sykmelding;
  personNrPasient: string;
}

const Tilbakedatert = ({ sykmelding, personNrPasient }: TilbakedatertProps) => {
  return (
    <InfoPanel tittel="Utdrag fra sykmeldingen" fargetema="advarsel">
      <SeksjonMedTittel understrek>
        <ElementMedTekst vis tittel="Fødselsnummer pasient" tekst={personNrPasient} margin />
        <BehandlingsDatoer signaturDato={sykmelding.signaturDato} />
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
