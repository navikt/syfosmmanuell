import React from 'react';

import { tilLesbarDatoMedArstall } from '../../../utils/datoUtils';

import SeksjonMedTittel from '../layout/SeksjonMedTittel';
import ElementMedTekst from '../layout/ElementMedTekst';

interface BehandlingsDatoerProps {
  signaturDato?: Date;
  syketilfelleStartDato?: Date;
}

const BehandlingsDatoer = ({ signaturDato, syketilfelleStartDato }: BehandlingsDatoerProps) => {
  return (
    <SeksjonMedTittel >
      <ElementMedTekst
        vis={!!signaturDato}
        tittel="Dato sykmeldingen ble skrevet"
        tekst={tilLesbarDatoMedArstall(signaturDato)}
        margin
      />
      <ElementMedTekst
        vis={!!syketilfelleStartDato}
        tittel="Når startet det legemeldte fraværet?"
        tekst={tilLesbarDatoMedArstall(syketilfelleStartDato)}
        margin
      />
    </SeksjonMedTittel>
  );
};

export default BehandlingsDatoer;
