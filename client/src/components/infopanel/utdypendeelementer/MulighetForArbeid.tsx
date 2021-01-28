import React from 'react';
import { Periode } from '../../../types/sykmeldingTypes';

import SeksjonMedTittel from '../layout/SeksjonMedTittel';

import tekster from '../infopanel-tekster';
import Margin from '../layout/Margin';
import ElementMedTekst from '../layout/ElementMedTekst';
import EnkelCheckbox from '../layout/EnkelCheckbox';

interface MulighetForArbeidProps {
  perioder: Periode[];
}

const MulighetForArbeid = ({ perioder }: MulighetForArbeidProps) => {
  const harMedisinskArsak = perioder.some((periode) => periode.aktivitetIkkeMulig?.medisinskArsak?.arsak);
  const harArbeidsrelatertArsak = perioder.some((periode) => periode.aktivitetIkkeMulig?.arbeidsrelatertArsak?.arsak);

  if (!harMedisinskArsak && !harArbeidsrelatertArsak) {
    return null;
  }

  const medisinskeBeskrivelser = perioder.filter((periode) => periode.aktivitetIkkeMulig?.medisinskArsak?.beskrivelse);

  const arbeidsrelaterteBeskrivelser = perioder.filter(
    (periode) => periode.aktivitetIkkeMulig?.arbeidsrelatertArsak?.beskrivelse,
  );

  return (
    <SeksjonMedTittel understrek tittel={tekster['muliget-for-arbeid.tittel']}>
      <Margin>
        <ElementMedTekst vis={!!harMedisinskArsak} tittel={tekster['muliget-for-arbeid.medisinske-arsaker.tittel']} />
        <br />
        <EnkelCheckbox
          tittel={tekster['muliget-for-arbeid.medisinske-arsaker']}
          margin
          checked
          vis={!!harMedisinskArsak}
        />
      </Margin>

      {medisinskeBeskrivelser.map((periode, index) => (
        <ElementMedTekst
          key={index}
          vis
          tittel="Beskrivelse"
          tekst={periode.aktivitetIkkeMulig?.medisinskArsak?.beskrivelse}
          margin
          innrykk
        />
      ))}

      <Margin>
        <ElementMedTekst
          vis={!!harArbeidsrelatertArsak}
          tittel={tekster['muliget-for-arbeid.forhold-pa-arbeidsplassen.tittel']}
        />
        <br />
        <EnkelCheckbox
          vis={!!harArbeidsrelatertArsak}
          tittel={tekster['muliget-for-arbeid.forhold-pa-arbeidsplassen']}
          margin
          checked
        />
      </Margin>

      {arbeidsrelaterteBeskrivelser.map((periode, index) => (
        <ElementMedTekst
          key={index}
          vis
          tittel="Beskrivelse"
          tekst={periode.aktivitetIkkeMulig?.arbeidsrelatertArsak?.beskrivelse}
          margin
          innrykk
        />
      ))}
    </SeksjonMedTittel>
  );
};

export default MulighetForArbeid;
