import React from 'react';

import SeksjonMedTittel from '../layout/SeksjonMedTittel';

import ElementMedTekst from '../layout/ElementMedTekst';
import EnkelCheckbox from '../layout/EnkelCheckbox';
import { tilLesbarPeriodeMedArstall } from '../../../utils/datoUtils';
import { ArbeidsrelatertArsakTypeValues, MedisinskArsakTypeValues, Periode } from '../../../types/sykmelding';

interface MulighetForArbeidProps {
  perioder: Periode[];
}

const MulighetForArbeid = ({ perioder }: MulighetForArbeidProps) => {
  const avventendeSykmeldingPerioder = perioder.filter((periode) => periode.avventendeInnspillTilArbeidsgiver);
  const gradertSykmeldingPerioder = perioder.filter((periode) => periode.gradert);
  const fullSykmeldingPerioder = perioder.filter((periode) => periode.aktivitetIkkeMulig);
  const behandlingsdagerSykmeldingPerioder = perioder.filter((periode) => periode.behandlingsdager);
  const reisetilskuddSykmeldingPerioder = perioder.filter((periode) => periode.reisetilskudd);

  return (
    <SeksjonMedTittel understrek tittel="4. Mulighet for arbeid">
      {avventendeSykmeldingPerioder.map((periode) => (
        <>
          <ElementMedTekst tittel="4.1. Pasienten kan benytte avventende sykmelding" margin />
          <ElementMedTekst
            tittel="4.1.1. f.o.m. - 4.1.2. t.o.m."
            tekst={tilLesbarPeriodeMedArstall(periode.fom, periode.tom)}
            margin
            innrykk
          />
          <ElementMedTekst
            tittel="4.1.3. Innspill til arbeidsgiver om tilrettelegging"
            tekst={periode.avventendeInnspillTilArbeidsgiver}
            margin
            innrykk
          />
        </>
      ))}
      {gradertSykmeldingPerioder.map((periode) => (
        <>
          <ElementMedTekst tittel="4.2. Pasienten kan være delvis i arbeid (gradert sykmelding)" margin />
          <ElementMedTekst
            tittel="4.2.1. f.o.m. - 4.2.2. t.o.m."
            tekst={tilLesbarPeriodeMedArstall(periode.fom, periode.tom)}
            margin
            innrykk
          />
          <ElementMedTekst
            tittel="4.2.3. Oppgi grad for sykmeldingen"
            tekst={periode.gradert?.grad ? String(periode.gradert?.grad) : '-'}
            margin
            innrykk
          />
          <EnkelCheckbox
            tittel="4.2.4. Pasienten kan være i delvis arbeid ved bruk av reisetilskudd"
            margin
            checked={!!periode.gradert?.reisetilskudd}
            bold
            vis
          />
        </>
      ))}
      {fullSykmeldingPerioder.map((periode) => (
        <>
          <ElementMedTekst tittel="4.3. Pasienten kan ikke være i arbeid (100 % sykmelding)" margin />
          <ElementMedTekst
            tittel="4.3.1. f.o.m. - 4.3.2. t.o.m."
            tekst={tilLesbarPeriodeMedArstall(periode.fom, periode.tom)}
            margin
            innrykk
          />
          <EnkelCheckbox
            tittel="4.3.3. Medisinske årsaker hindrer arbeidsrelatert aktivitet"
            margin
            checked={!!periode.aktivitetIkkeMulig?.medisinskArsak}
            listItems={periode.aktivitetIkkeMulig?.medisinskArsak?.arsak.map(
              (arsak) => MedisinskArsakTypeValues[arsak],
            )}
            bold
            vis
          />
          <ElementMedTekst
            vis
            tittel="Beskrivelse"
            tekst={periode.aktivitetIkkeMulig?.medisinskArsak?.beskrivelse}
            margin
            innrykk
          />
          <EnkelCheckbox
            tittel="4.3.4. Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet"
            margin
            bold
            checked={!!periode.aktivitetIkkeMulig?.arbeidsrelatertArsak}
            listItems={periode.aktivitetIkkeMulig?.arbeidsrelatertArsak?.arsak.map(
              (arsak) => ArbeidsrelatertArsakTypeValues[arsak],
            )}
            vis
          />
          <ElementMedTekst
            vis
            tittel="Beskrivelse"
            tekst={periode.aktivitetIkkeMulig?.arbeidsrelatertArsak?.beskrivelse}
            margin
            innrykk
          />
        </>
      ))}
      {behandlingsdagerSykmeldingPerioder.map((periode) => (
        <>
          <ElementMedTekst tittel="4.4. Pasienten kan ikke være i arbeid på behandlingsdager" margin />
          <ElementMedTekst
            tittel="4.4.1. f.o.m. - 4.4.2. t.o.m."
            tekst={tilLesbarPeriodeMedArstall(periode.fom, periode.tom)}
            margin
            innrykk
          />
          <ElementMedTekst
            vis
            tittel="4.4.3 Oppgi antall dager i perioden"
            tekst={periode.behandlingsdager ? String(periode.behandlingsdager) : '-'}
            margin
            innrykk
          />
        </>
      ))}
      {reisetilskuddSykmeldingPerioder.map((periode) => (
        <>
          <ElementMedTekst tittel="4.5. Pasienten kan være i fullt arbeid ved bruk av reisetilskudd" margin />
          <ElementMedTekst
            tittel="4.5.1. f.o.m. - 4.5.2. t.o.m."
            tekst={tilLesbarPeriodeMedArstall(periode.fom, periode.tom)}
            margin
            innrykk
          />
        </>
      ))}
    </SeksjonMedTittel>
  );
};

export default MulighetForArbeid;
