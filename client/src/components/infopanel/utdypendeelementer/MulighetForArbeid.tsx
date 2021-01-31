import React from 'react';
import { Periode } from '../../../types/sykmeldingTypes';

import SeksjonMedTittel from '../layout/SeksjonMedTittel';

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
    <SeksjonMedTittel understrek tittel="Mulighet for arbeid">
      <Margin>
        <ElementMedTekst vis={!!harMedisinskArsak} tittel="Pasienten kan ikke være i arbeid (100% sykmeldt)" />
        <br />
        <EnkelCheckbox
          tittel="Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet"
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
        <ElementMedTekst vis={!!harArbeidsrelatertArsak} tittel="Pasienten kan ikke være i arbeid (100% sykmeldt)" />
        <br />
        <EnkelCheckbox
          vis={!!harArbeidsrelatertArsak}
          tittel="Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
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
