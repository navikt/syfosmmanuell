import React from 'react';

import SeksjonMedTittel from '../layout/SeksjonMedTittel';
import ElementMedTekst from '../layout/ElementMedTekst';
import { tilLesbarDatoMedArstall } from '../../../utils/datoUtils';

interface TilbakedateringsSeksjonProps {
  kontaktDato?: Date;
  begrunnelseIkkeKontakt?: string;
}

const TilbakedateringsSeksjon = ({ kontaktDato, begrunnelseIkkeKontakt }: TilbakedateringsSeksjonProps) => {
  if (!kontaktDato) {
    return null;
  }

  return (
    <SeksjonMedTittel understrek tittel="11. Tilbakedatering">
      <ElementMedTekst
        vis={!!kontaktDato}
        tittel="11.1. Dato for dokumenterbar kontakt med pasient"
        tekst={tilLesbarDatoMedArstall(kontaktDato)}
        margin
      />
      <ElementMedTekst
        vis={!!begrunnelseIkkeKontakt}
        tittel="11.2. Begrunnelse for tilbakedatering"
        tekst={begrunnelseIkkeKontakt}
        margin
      />
    </SeksjonMedTittel>
  );
};

export default TilbakedateringsSeksjon;
