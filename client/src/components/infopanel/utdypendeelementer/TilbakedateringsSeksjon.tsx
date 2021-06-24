import React from 'react';

import SeksjonMedTittel from '../layout/SeksjonMedTittel';
import ElementMedTekst from '../layout/ElementMedTekst';
import { tilLesbarDatoMedArstall } from '../../../utils/datoUtils';

interface TilbakedateringsSeksjonProps {
  kontaktDato: Date | null;
  begrunnelseIkkeKontakt: string | null;
}

const TilbakedateringsSeksjon = ({ kontaktDato, begrunnelseIkkeKontakt }: TilbakedateringsSeksjonProps) => {
  return (
    <SeksjonMedTittel understrek tittel="11. Tilbakedatering">
      <ElementMedTekst
        vis={!!kontaktDato}
        tittel="11.1. Datoen for dokumenterbar kontakt med pasienten"
        tekst={tilLesbarDatoMedArstall(kontaktDato)}
        margin
      />
      <ElementMedTekst
        vis={!!begrunnelseIkkeKontakt}
        tittel="11.2. Begrunnelsen for tilbakedateringen"
        tekst={begrunnelseIkkeKontakt}
        margin
      />
    </SeksjonMedTittel>
  );
};

export default TilbakedateringsSeksjon;
