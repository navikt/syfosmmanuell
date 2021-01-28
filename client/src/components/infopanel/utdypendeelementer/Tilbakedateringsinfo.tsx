import React from 'react';
import ElementMedTekst from '../layout/ElementMedTekst';
import { hentDagerMellomDatoer, tilLesbarDatoMedArstall } from '../../../utils/datoUtils';

import './Tilbakedateringsinfo.less';

interface TilbakedateringsinfoProps {
  kontaktDato?: Date;
  signaturDato?: Date;
  begrunnelseIkkeKontakt?: string;
}

const Tilbakedateringsinfo = ({ kontaktDato, signaturDato, begrunnelseIkkeKontakt }: TilbakedateringsinfoProps) => {
  const tilbakedatertDuration = hentDagerMellomDatoer(signaturDato, kontaktDato);
  return (
    <div className="tilbakedateringsinfo">
      <ElementMedTekst
        vis={!!kontaktDato}
        tittel="Dato pasienten oppsøkte behandler"
        tekst={tilLesbarDatoMedArstall(kontaktDato)}
        margin
      />
      <ElementMedTekst
        vis={!!signaturDato}
        tittel="Dato sykmeldingen ble skrevet fra"
        tekst={`${tilLesbarDatoMedArstall(signaturDato)} • tilbakedatert ${tilbakedatertDuration} dag${
          tilbakedatertDuration > 1 ? 'er' : ''
        }`}
        margin
      />
      <ElementMedTekst
        vis={!!begrunnelseIkkeKontakt}
        tittel="Begrunnelse for tilbakedatering"
        tekst={begrunnelseIkkeKontakt}
      />
    </div>
  );
};

export default Tilbakedateringsinfo;
