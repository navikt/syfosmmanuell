import React from 'react';
import ElementMedTekst from '../layout/ElementMedTekst';
import { hentDagerMellomDatoer, tilLesbarDatoMedArstall } from '../../../utils/datoUtils';

import './Tilbakedateringsinfo.less';

interface TilbakedateringsinfoProps {
  kontaktDato?: Date;
  syketilfelleStartDato?: Date;
  begrunnelseIkkeKontakt?: string;
}

const Tilbakedateringsinfo = ({
  kontaktDato,
  syketilfelleStartDato,
  begrunnelseIkkeKontakt,
}: TilbakedateringsinfoProps) => {
  const tilbakedatertDuration = hentDagerMellomDatoer(syketilfelleStartDato, kontaktDato);
  return (
    <div className="tilbakedateringsinfo">
      <ElementMedTekst
        vis={!!kontaktDato}
        tittel="Dato pasienten oppsøkte behandler"
        tekst={tilLesbarDatoMedArstall(kontaktDato)}
        margin
      />
      <ElementMedTekst
        vis={!!syketilfelleStartDato}
        tittel="Dato sykmeldingen ble skrevet fra"
        tekst={`${tilLesbarDatoMedArstall(syketilfelleStartDato)} • tilbakedatert ${tilbakedatertDuration} dag${
          tilbakedatertDuration > 1 && 'er'
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
