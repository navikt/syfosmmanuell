import React from 'react';
import { MedisinskVurdering } from '../../../types/sykmeldingTypes';

import { tilLesbarDatoMedArstall } from '../../../utils/datoUtils';

import CheckboxMedDato from '../layout/CheckboxMedDato';

interface SkadeSeksjonProps {
  medisinskVurdering: MedisinskVurdering;
}

const SkadeSeksjon = ({ medisinskVurdering }: SkadeSeksjonProps) => {
  const { yrkesskadeDato, yrkesskade } = medisinskVurdering;
  if (!yrkesskade) {
    return null;
  }

  return (
    <CheckboxMedDato
      checkboxTittel="Sykdommen kan skyldes en skade/yrkessykdom"
      checked
      tittel="Skadedato"
      tekst={tilLesbarDatoMedArstall(yrkesskadeDato)}
    />
  );
};

export default SkadeSeksjon;
