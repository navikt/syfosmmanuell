import React from 'react';

import { Prognose } from '../../../types/sykmeldingTypes';
import EtikettMedTekst from '../layout/EtikettMedTekst';

interface PrognoseSeksjonProps {
  prognose?: Prognose;
}

const PrognoseSeksjon = ({ prognose }: PrognoseSeksjonProps) => {
  if (!prognose?.hensynArbeidsplassen) {
    return null;
  }
  return (
    <EtikettMedTekst
      tittel="Beskriv eventuelle hensyn som må tas på arbeidsplassen"
      tekst={prognose.hensynArbeidsplassen}
      margin
    />
  );
};

export default PrognoseSeksjon;
