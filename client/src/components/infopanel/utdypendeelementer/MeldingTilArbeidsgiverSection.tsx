import React from 'react';

import SeksjonMedTittel from '../layout/SeksjonMedTittel';
import ElementMedTekst from '../layout/ElementMedTekst';

interface MeldingTilArbeidsgiverSectionProps {
  meldingTilArbeidsgiver?: string;
}

const MeldingTilArbeidsgiverSection = ({ meldingTilArbeidsgiver }: MeldingTilArbeidsgiverSectionProps) => {
  if (!meldingTilArbeidsgiver) {
    return null;
  }

  return (
    <SeksjonMedTittel understrek tittel="9. Melding til arbeidsgiver">
      <ElementMedTekst
        vis={!!meldingTilArbeidsgiver}
        margin
        tittel="9.1. Andre innspill til arbeidsgiveren"
        tekst={meldingTilArbeidsgiver}
      />
    </SeksjonMedTittel>
  );
};

export default MeldingTilArbeidsgiverSection;
