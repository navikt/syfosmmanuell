import React from 'react';

import SeksjonMedTittel from '../layout/SeksjonMedTittel';
import ElementMedTekst from '../layout/ElementMedTekst';
import Margin from '../layout/Margin';
import EnkelCheckbox from '../layout/EnkelCheckbox';
import { MeldingTilNAV } from '../../../../../types/sykmeldingTypes';

interface AnnetProps {
  meldingTilNAV?: MeldingTilNAV;
  meldingTilArbeidsgiver?: string;
  behandlerTelefon?: string;
}

const Annet = ({ meldingTilArbeidsgiver, meldingTilNAV, behandlerTelefon }: AnnetProps) => {
  if (!meldingTilArbeidsgiver && !meldingTilNAV && !behandlerTelefon) {
    return null;
  }

  return (
    <SeksjonMedTittel understrek tittel="Annet">
      <ElementMedTekst vis={!!meldingTilNAV} margin tittel="Melding til NAV" tekst={meldingTilNAV?.beskrivBistand} />
      <Margin>
        <EnkelCheckbox
          tittel={'Krever bistand umiddelbart'}
          bold
          margin
          checked={!!meldingTilNAV?.bistandUmiddelbart}
          vis={!!meldingTilNAV?.bistandUmiddelbart}
        />
      </Margin>
      <ElementMedTekst
        vis={!!meldingTilArbeidsgiver}
        margin
        tittel="Melding til Arbeidsgiver"
        tekst={meldingTilArbeidsgiver}
      />
      <ElementMedTekst vis={!!behandlerTelefon} margin tittel="Telefon til lege/sykmelder" tekst={behandlerTelefon} />
    </SeksjonMedTittel>
  );
};

export default Annet;
