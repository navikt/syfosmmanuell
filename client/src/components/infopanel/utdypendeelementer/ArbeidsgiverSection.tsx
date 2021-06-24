import React from 'react';

import SeksjonMedTittel from '../layout/SeksjonMedTittel';
import ElementMedTekst from '../layout/ElementMedTekst';
import { Arbeidsgiver, HarArbeidsgiverValues } from '../../../types/sykmelding';

interface ArbeidsgiverSectionProps {
  arbeidsgiver: Arbeidsgiver;
}

const ArbeidsgiverSection = ({ arbeidsgiver }: ArbeidsgiverSectionProps) => {
  return (
    <SeksjonMedTittel understrek tittel="2. Arbeidsgiver">
      <ElementMedTekst tittel="2.1. Pasienten har" tekst={HarArbeidsgiverValues[arbeidsgiver.harArbeidsgiver]} margin />
      <ElementMedTekst
        vis={!!arbeidsgiver.navn}
        tittel="2.2. Arbeidsgiver for denne sykmeldingen"
        tekst={arbeidsgiver.navn}
        margin
      />
      <ElementMedTekst
        vis={!!arbeidsgiver.yrkesbetegnelse}
        tittel="2.3. Yrke/stilling for dette arbeidsforholdet"
        tekst={arbeidsgiver.yrkesbetegnelse}
        margin
      />
      <ElementMedTekst
        vis={!!arbeidsgiver.stillingsprosent}
        tittel="2.4. Stillingsprosent"
        tekst={String(arbeidsgiver.stillingsprosent)}
        margin
      />
    </SeksjonMedTittel>
  );
};

export default ArbeidsgiverSection;
