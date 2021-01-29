import React from 'react';
import { Prognose } from '../../../types/sykmeldingTypes';

import EnkelCheckbox from '../layout/EnkelCheckbox';

interface ArbeidsuforSeksjonProps {
  prognose?: Prognose;
}

const ArbeidsuforSeksjon = ({ prognose }: ArbeidsuforSeksjonProps) => {
  if (!prognose || !prognose.arbeidsforEtterPeriode) {
    return null;
  }

  return <EnkelCheckbox tittel="Pasienten er 100 % arbeidsfør etter perioden" checked margin vis />;
};

export default ArbeidsuforSeksjon;
