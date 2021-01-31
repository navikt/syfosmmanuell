import React from 'react';
import { Sykmelding } from '../../../types/sykmeldingTypes';
import DiagnoseSeksjon from '../../infopanel/panelelementer/diagnose/DiagnoseSeksjon';
import InfoPanel from '../../infopanel/InfoPanel';
import SykmeldingPerioder from '../../infopanel/panelelementer/periode/SykmeldingPerioder';
import Tilbakedateringsinfo from '../../infopanel/utdypendeelementer/Tilbakedateringsinfo';

interface TilbakedatertForlengelseProps {
  sykmelding: Sykmelding;
  personNrPasient: string;
}

const TilbakedatertForlengelse = ({ sykmelding, personNrPasient }: TilbakedatertForlengelseProps) => {
  return (
    <InfoPanel tittel="Utdrag fra sykmeldingen" fargetema="advarsel">
      <SykmeldingPerioder perioder={sykmelding.perioder} />
      <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering.hovedDiagnose} />
      {sykmelding.medisinskVurdering.biDiagnoser.map((diagnose, index) => (
        <DiagnoseSeksjon key={index.toString()} diagnose={diagnose} bidiagnose />
      ))}

      <Tilbakedateringsinfo
        perioder={sykmelding.perioder}
        kontaktDato={sykmelding.kontaktMedPasient.kontaktDato}
        behandletTidspunkt={sykmelding.behandletTidspunkt}
        begrunnelseIkkeKontakt={sykmelding.kontaktMedPasient.begrunnelseIkkeKontakt}
      />
    </InfoPanel>
  );
};

export default TilbakedatertForlengelse;
