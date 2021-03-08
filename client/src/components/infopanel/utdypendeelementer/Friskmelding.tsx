import React from 'react';

import { Prognose } from '../../../types/sykmeldingTypes';
import { tilLesbarDatoMedArstall } from '../../../utils/datoUtils';

import SeksjonMedTittel from '../layout/SeksjonMedTittel';

import ElementMedTekst from '../layout/ElementMedTekst';
import EnkelCheckbox from '../layout/EnkelCheckbox';

interface FriskmeldingProps {
  prognose?: Prognose;
}

const Friskmelding = ({ prognose }: FriskmeldingProps) => {
  if (!prognose) {
    return null;
  }

  const { erIArbeid, erIkkeIArbeid, hensynArbeidsplassen, arbeidsforEtterPeriode } = prognose;

  return (
    <SeksjonMedTittel understrek tittel="5. Friskmelding/prognose">
      <EnkelCheckbox
        tittel="5.1. Pasienten er 100 prosent arbeidsfør etter denne perioden"
        checked={arbeidsforEtterPeriode}
        margin
        bold
        vis={arbeidsforEtterPeriode}
      />
      <ElementMedTekst
        tittel="5.1.1. Beskriv eventuelle hensyn som må tas på arbeidsplassen"
        tekst={hensynArbeidsplassen}
        margin
        vis={!!hensynArbeidsplassen}
      />

      {erIArbeid && (
        <>
          <ElementMedTekst
            tittel="5.2.1. Kan pasienten på sikt komme tilbake til samme arbeidsgiver?"
            tekst={erIArbeid.egetArbeidPaSikt ? 'Ja' : 'Nei'}
            margin
          />
          <ElementMedTekst
            vis={erIArbeid.egetArbeidPaSikt && !!erIArbeid.arbeidFOM}
            tittel="Anslå når du tror dette kan skje"
            tekst={tilLesbarDatoMedArstall(erIArbeid.arbeidFOM)}
            margin
            innrykk
          />
          <ElementMedTekst
            tittel="5.2.2. Kan pasienten på sikt komme i arbeid hos en annen arbeidsgiver?"
            tekst={erIArbeid.annetArbeidPaSikt ? 'Ja' : 'Nei'}
            margin
          />
          <ElementMedTekst
            vis={erIArbeid.annetArbeidPaSikt && !!erIArbeid.vurderingsdato}
            tittel="Når antar du å kunne gi tilbakemelding på dette?"
            tekst={tilLesbarDatoMedArstall(erIArbeid.vurderingsdato)}
            margin
            innrykk
          />
        </>
      )}
      {erIkkeIArbeid && (
        <>
          <ElementMedTekst
            tittel="5.3.1. Kan pasienten på sikt komme tilbake i arbeid?"
            tekst={erIkkeIArbeid.arbeidsforPaSikt ? 'Ja' : 'Nei'}
            margin
          />
          <ElementMedTekst
            vis={!!erIkkeIArbeid.arbeidsforFOM}
            tittel="Anslå når du tror dette kan skje"
            tekst={tilLesbarDatoMedArstall(erIkkeIArbeid.arbeidsforFOM)}
            margin
            innrykk
          />
          <ElementMedTekst
            vis={!!erIkkeIArbeid.vurderingsdato}
            tittel="5.3.2. Når antar du å kunne gi tilbakemelding på dette?"
            tekst={tilLesbarDatoMedArstall(erIkkeIArbeid.vurderingsdato)}
            margin
          />
        </>
      )}
    </SeksjonMedTittel>
  );
};

export default Friskmelding;
