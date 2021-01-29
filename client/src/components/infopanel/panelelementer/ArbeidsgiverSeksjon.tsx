import React from 'react';
import { Arbeidsgiver } from '../../../types/sykmeldingTypes';

import EtikettMedTekst from '../layout/EtikettMedTekst';

interface ArbeidsgiverSeksjonProps {
  arbeidsgiver: Arbeidsgiver;
}

const ArbeidsgiverSeksjon = ({ arbeidsgiver }: ArbeidsgiverSeksjonProps) => {
  if (!arbeidsgiver.harArbeidsgiver) {
    return null;
  }

  return (
    <EtikettMedTekst
      tittel="Arbeidsgiver som legen har skrevet inn"
      tekst={arbeidsgiver.navn}
      undertekst={`${arbeidsgiver.stillingsprosent}% stilling`}
      margin
    />
  );
};

export default ArbeidsgiverSeksjon;
