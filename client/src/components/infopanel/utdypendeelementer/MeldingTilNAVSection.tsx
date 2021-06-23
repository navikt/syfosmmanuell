import React from 'react';

import SeksjonMedTittel from '../layout/SeksjonMedTittel';
import ElementMedTekst from '../layout/ElementMedTekst';
import Margin from '../layout/Margin';
import EnkelCheckbox from '../layout/EnkelCheckbox';
import { MeldingTilNAV } from '../../../types/sykmelding';

interface MeldingTilNAVSectionProps {
  meldingTilNAV: MeldingTilNAV | null;
}

const MeldingTilNAVSection = ({ meldingTilNAV }: MeldingTilNAVSectionProps) => {
  if (!meldingTilNAV) {
    return null;
  }

  return (
    <SeksjonMedTittel understrek tittel="8. Melding til NAV">
      <Margin>
        <EnkelCheckbox
          tittel={'8.1. Ønskes bistand fra NAV nå?'}
          bold
          margin
          checked={!!meldingTilNAV?.bistandUmiddelbart}
          vis={!!meldingTilNAV?.bistandUmiddelbart}
        />
      </Margin>
      <ElementMedTekst
        vis={!!meldingTilNAV}
        margin
        tittel="8.2. Beskriv nærmere"
        tekst={meldingTilNAV?.beskrivBistand}
      />
    </SeksjonMedTittel>
  );
};

export default MeldingTilNAVSection;
