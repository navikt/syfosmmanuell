import React from 'react';
import { Sykmelding } from '../../../types/sykmeldingTypes';
import MulighetForArbeid from '../../infopanel/utdypendeelementer/MulighetForArbeid';
import Friskmelding from '../../infopanel/utdypendeelementer/Friskmelding';
import UtdypendeOpplysninger from '../../infopanel/utdypendeelementer/UtdypendeOpplysninger';
import Arbeidsevne from '../../infopanel/utdypendeelementer/Arbeidsevne';
import Annet from '../../infopanel/utdypendeelementer/Annet';
import { Flatknapp } from 'nav-frontend-knapper';
import { tilLesbarDatoMedArstall } from '../../../utils/datoUtils';
import ElementMedTekst from '../../infopanel/layout/ElementMedTekst';

import './HeleSykmeldingen.less';
import MeldingTilNAVSection from '../../infopanel/utdypendeelementer/MeldingTilNAVSection';
import MeldingTilArbeidsgiverSection from '../../infopanel/utdypendeelementer/MeldingTilArbeidsgiverSection';
import Diagnoser from '../../infopanel/utdypendeelementer/Diagnoser';
import TilbakedateringsSeksjon from '../../infopanel/utdypendeelementer/TilbakedateringsSeksjon';
import ArbeidsgiverSection from '../../infopanel/utdypendeelementer/ArbeidsgiverSection';

interface HeleSykmeldingenProps {
  sykmelding: Sykmelding;
  setVisHeleSykmeldingen: (value: boolean) => void;
}

const HeleSykmeldingen = ({ sykmelding, setVisHeleSykmeldingen }: HeleSykmeldingenProps) => {
  return (
    <div className="helesykmeldingen">
      <ElementMedTekst
        vis={!!sykmelding.behandletTidspunkt}
        tittel="Datoen sykmeldingen ble skrevet"
        tekst={tilLesbarDatoMedArstall(sykmelding.signaturDato)}
        margin
      />
      <ElementMedTekst
        vis={!!sykmelding.kontaktMedPasient.kontaktDato}
        tittel="Datoen for dokumenterbar kontakt med pasienten"
        tekst={tilLesbarDatoMedArstall(sykmelding.kontaktMedPasient.kontaktDato)}
        margin
      />
      <ElementMedTekst vis={!!sykmelding.navnFastlege} tittel="Sykmelder" tekst={sykmelding.navnFastlege} margin />
      <hr />
      <ArbeidsgiverSection arbeidsgiver={sykmelding.arbeidsgiver} />
      <Diagnoser
        medisinskVurdering={sykmelding.medisinskVurdering}
        skjermesForPasient={sykmelding.skjermesForPasient}
      />
      <MulighetForArbeid perioder={sykmelding.perioder} />
      <Friskmelding prognose={sykmelding.prognose} />
      <UtdypendeOpplysninger opplysninger={sykmelding.utdypendeOpplysninger} />
      <Arbeidsevne
        tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen}
        tiltakNAV={sykmelding.tiltakNAV}
        andreTiltak={sykmelding.andreTiltak}
      />
      <MeldingTilNAVSection meldingTilNAV={sykmelding.meldingTilNAV} />
      <MeldingTilArbeidsgiverSection meldingTilArbeidsgiver={sykmelding.meldingTilArbeidsgiver} />
      <TilbakedateringsSeksjon
        kontaktDato={sykmelding.kontaktMedPasient.kontaktDato}
        begrunnelseIkkeKontakt={sykmelding.kontaktMedPasient.begrunnelseIkkeKontakt}
      />
      <Annet behandlerTelefon={sykmelding.behandler.tlf} />
      <div style={{ textAlign: 'center' }}>
        <Flatknapp
          form="kompakt"
          onClick={() => setVisHeleSykmeldingen(false)}
          style={{ marginTop: '1rem', marginBottom: '1rem' }}
        >
          Skjul hele sykmeldingen
        </Flatknapp>
      </div>
    </div>
  );
};

export default HeleSykmeldingen;
