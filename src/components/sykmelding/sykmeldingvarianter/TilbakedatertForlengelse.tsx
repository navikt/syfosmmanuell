import React from 'react';

import DiagnoseSeksjon from '../../infopanel/panelelementer/diagnose/DiagnoseSeksjon';
import InfoPanel from '../../infopanel/InfoPanel';
import SykmeldingPerioder from '../../infopanel/panelelementer/periode/SykmeldingPerioder';
import Tilbakedateringsinfo from '../../infopanel/utdypendeelementer/Tilbakedateringsinfo';
import { Sykmelding } from '../../../types/sykmelding';

interface TilbakedatertForlengelseProps {
  sykmelding: Sykmelding;
}

const TilbakedatertForlengelse = ({ sykmelding }: TilbakedatertForlengelseProps) => {
  return (
    <InfoPanel tittel="Utdrag fra sykmeldingen" fargetema="advarsel">
      <SykmeldingPerioder perioder={sykmelding.perioder} />
      <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering.hovedDiagnose} />
      {sykmelding.medisinskVurdering.biDiagnoser.map((diagnose) => (
        <DiagnoseSeksjon key={diagnose.kode} diagnose={diagnose} bidiagnose />
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
