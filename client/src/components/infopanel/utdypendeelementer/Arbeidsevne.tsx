import React from 'react';

import SeksjonMedTittel from '../layout/SeksjonMedTittel';
import ElementMedTekst from '../layout/ElementMedTekst';

interface ArbeidsevneProps {
  tiltakArbeidsplassen?: string;
  tiltakNAV?: string;
}

const Arbeidsevne = ({ tiltakArbeidsplassen, tiltakNAV }: ArbeidsevneProps) => {
  if (!tiltakArbeidsplassen && !tiltakNAV) {
    return null;
  }

  return (
    <SeksjonMedTittel understrek tittel="Hva skal til for å bedre arbeidsevnen?">
      <ElementMedTekst
        vis={!!tiltakArbeidsplassen}
        tittel="Tilrettelegging/hensyn som bør tas på arbeidsplassen"
        tekst={tiltakArbeidsplassen}
        margin
      />
      <ElementMedTekst vis={!!tiltakNAV} tittel="Tiltak i regi av NAV" tekst={tiltakNAV} margin />
    </SeksjonMedTittel>
  );
};

export default Arbeidsevne;
