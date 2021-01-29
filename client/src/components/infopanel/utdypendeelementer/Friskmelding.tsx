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
    <SeksjonMedTittel understrek tittel="Friskmelding/prognose">
      <ElementMedTekst
        tittel="Beskriv eventuelle hensyn som må tas på arbeidsplassen"
        tekst={hensynArbeidsplassen}
        margin
        vis={!!hensynArbeidsplassen}
      />
      <EnkelCheckbox
        tittel="Pasienten er 100 prosent arbeidsfør etter denne perioden"
        checked={arbeidsforEtterPeriode}
        margin
        bold
        vis={arbeidsforEtterPeriode}
      />
      {erIArbeid && (
        <>
          <ElementMedTekst
            tittel="Kan pasienten på sikt komme tilbake til samme arbeidsgiver?"
            tekst={erIArbeid.egetArbeidPaSikt ? 'Ja' : 'Nei'}
            margin
          />
          <ElementMedTekst
            vis={erIArbeid.egetArbeidPaSikt && !!erIArbeid.arbeidFOM}
            tittel="Anslå når du tror dette kan skje"
            tekst={tilLesbarDatoMedArstall(erIArbeid.arbeidFOM)}
            margin
          />
          <ElementMedTekst
            tittel="Kan pasienten på sikt komme i arbeid hos en annen arbeidsgiver?"
            tekst={erIArbeid.annetArbeidPaSikt ? 'Ja' : 'Nei'}
            margin
          />
          <ElementMedTekst
            vis={erIArbeid.annetArbeidPaSikt && !!erIArbeid.vurderingsdato}
            tittel="Når antar du å kunne gi tilbakemelding på dette?"
            tekst={tilLesbarDatoMedArstall(erIArbeid.vurderingsdato)}
            margin
          />
        </>
      )}
      {erIkkeIArbeid && (
        <>
          <ElementMedTekst
            tittel="Kan pasienten på sikt komme tilbake i arbeid?"
            tekst={erIkkeIArbeid.arbeidsforPaSikt ? 'Ja' : 'Nei'}
            margin
          />
          <ElementMedTekst
            vis={!!erIkkeIArbeid.arbeidsforFOM}
            tittel="Anslå når du tror dette kan skje"
            tekst={tilLesbarDatoMedArstall(erIkkeIArbeid.arbeidsforFOM)}
            margin
          />
          <ElementMedTekst
            vis={!!erIkkeIArbeid.vurderingsdato}
            tittel="Når antar du å kunne gi tilbakemelding på dette?"
            tekst={tilLesbarDatoMedArstall(erIkkeIArbeid.vurderingsdato)}
            margin
          />
        </>
      )}
    </SeksjonMedTittel>
  );
};

export default Friskmelding;
