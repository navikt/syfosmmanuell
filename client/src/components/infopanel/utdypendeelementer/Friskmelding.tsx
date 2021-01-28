import React from 'react';

import { Prognose } from '../../../types/sykmeldingTypes';
import { tilLesbarDatoMedArstall } from '../../../utils/datoUtils';

import SeksjonMedTittel from '../layout/SeksjonMedTittel';

import tekster from '../infopanel-tekster';
import Margin from '../layout/Margin';
import ElementMedTekst from '../layout/ElementMedTekst';
import EnkelCheckbox from '../layout/EnkelCheckbox';

interface FriskmeldingProps {
  prognose?: Prognose;
}

const Friskmelding = ({ prognose }: FriskmeldingProps) => {
  if (!prognose) {
    return null;
  }

  const { erIArbeid, erIkkeIArbeid } = prognose;

  return (
    <SeksjonMedTittel understrek tittel="Friskmelding/prognose">
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
        <Margin>
          <EnkelCheckbox
            tittel={tekster['friskmelding.ingen-arbeidsgiver']}
            bold
            margin
            checked={erIkkeIArbeid.arbeidsforPaSikt}
            vis={erIkkeIArbeid.arbeidsforPaSikt}
          />
          <ElementMedTekst
            vis={!!erIkkeIArbeid.arbeidsforFOM}
            tittel={tekster['friskmelding.arbeidfom']}
            tekst={tilLesbarDatoMedArstall(erIkkeIArbeid.arbeidsforFOM)}
          />
          <ElementMedTekst
            vis={!!erIkkeIArbeid.vurderingsdato}
            tittel={tekster['friskmelding.ingen-arbeidsgiver.vurdering']}
            tekst={tilLesbarDatoMedArstall(erIkkeIArbeid.vurderingsdato)}
          />
        </Margin>
      )}
    </SeksjonMedTittel>
  );
};

export default Friskmelding;
