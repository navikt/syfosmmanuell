import React from 'react';
import { AktivitetIkkeMulig } from '../../../types/sykmeldingTypes';

import SeksjonMedTittel from '../layout/SeksjonMedTittel';

import tekster from '../infopanel-tekster';
import Margin from '../layout/Margin';
import ElementMedTekst from '../layout/ElementMedTekst';
import EnkelCheckbox from '../layout/EnkelCheckbox';

interface MulighetForArbeidProps {
  aktivitetIkkeMulig: AktivitetIkkeMulig;
}

const MulighetForArbeid = ({ aktivitetIkkeMulig }: MulighetForArbeidProps) => {
  if (!aktivitetIkkeMulig.arbeidsrelatertArsak && !aktivitetIkkeMulig.medisinskArsak) {
    return null;
  }

  return (
    <SeksjonMedTittel understrek tittel={tekster['muliget-for-arbeid.tittel']}>
      <Margin>
        <ElementMedTekst
          vis={!!aktivitetIkkeMulig.medisinskArsak}
          tittel={tekster['muliget-for-arbeid.medisinske-arsaker.tittel']}
        />
        <EnkelCheckbox
          tittel={tekster['muliget-for-arbeid.medisinske-arsaker']}
          margin
          checked
          vis={!!aktivitetIkkeMulig.medisinskArsak}
        />
      </Margin>

      <ElementMedTekst
        tittel={tekster['muliget-for-arbeid.medisinske-arsaker.beskriv']}
        tekst={aktivitetIkkeMulig.medisinskArsak?.beskrivelse}
        margin
        vis={!!aktivitetIkkeMulig.medisinskArsak?.beskrivelse}
      />

      <Margin>
        <ElementMedTekst
          vis={!!aktivitetIkkeMulig.arbeidsrelatertArsak}
          tittel={tekster['muliget-for-arbeid.forhold-pa-arbeidsplassen.tittel']}
        />
        <EnkelCheckbox
          vis={!!aktivitetIkkeMulig.arbeidsrelatertArsak}
          tittel={tekster['muliget-for-arbeid.forhold-pa-arbeidsplassen']}
          margin
          checked
        />
      </Margin>

      <ElementMedTekst
        vis={!!aktivitetIkkeMulig.arbeidsrelatertArsak?.beskrivelse}
        tittel={tekster['muliget-for-arbeid.forhold-pa-arbeidsplassen.angi']}
        tekst={aktivitetIkkeMulig.arbeidsrelatertArsak?.beskrivelse}
        margin
      />
    </SeksjonMedTittel>
  );
};

export default MulighetForArbeid;
