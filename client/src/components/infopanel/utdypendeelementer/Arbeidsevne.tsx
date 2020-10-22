import React from 'react';

import tekster from '../infopanel-tekster';

import SeksjonMedTittel from '../layout/SeksjonMedTittel';
import ElementMedTekst from '../layout/ElementMedTekst';

interface ArbeidsevneProps {
  tiltakArbeidsplassen?: string;
  tiltakNAV?: string;
  andreTiltak?: string;
}

const Arbeidsevne = ({ tiltakArbeidsplassen, tiltakNAV, andreTiltak }: ArbeidsevneProps) => {
  if (!tiltakArbeidsplassen && !tiltakNAV && !andreTiltak) {
    return null;
  }

  return (
    <SeksjonMedTittel understrek tittel={tekster['arbeidsevne.tittel']}>
      <ElementMedTekst
        vis={!!tiltakArbeidsplassen}
        tittel={tekster['arbeidsevne.tilrettelegging.tittel']}
        tekst={tiltakArbeidsplassen}
        margin
      />
      <ElementMedTekst vis={!!tiltakNAV} tittel={tekster['arbeidsevne.tiltak.tittel']} tekst={tiltakNAV} margin />
      <ElementMedTekst
        vis={!!andreTiltak}
        tittel={tekster['arbeidsevne.andre-tiltak.tittel']}
        tekst={andreTiltak}
        margin
      />
    </SeksjonMedTittel>
  );
};

export default Arbeidsevne;
