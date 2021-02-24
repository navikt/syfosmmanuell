import React from 'react';
import { Sykmelding } from '../../../types/sykmeldingTypes';
import DiagnoseSeksjon from '../../infopanel/panelelementer/diagnose/DiagnoseSeksjon';
import SykmeldingPerioder from '../../infopanel/panelelementer/periode/SykmeldingPerioder';
import MulighetForArbeid from '../../infopanel/utdypendeelementer/MulighetForArbeid';
import Friskmelding from '../../infopanel/utdypendeelementer/Friskmelding';
import UtdypendeOpplysninger from '../../infopanel/utdypendeelementer/UtdypendeOpplysninger';
import Arbeidsevne from '../../infopanel/utdypendeelementer/Arbeidsevne';
import Annet from '../../infopanel/utdypendeelementer/Annet';
import { Flatknapp } from 'nav-frontend-knapper';
import { tilLesbarDatoMedArstall } from '../../../utils/datoUtils';
import ElementMedTekst from '../../infopanel/layout/ElementMedTekst';

import './HeleSykmeldingen.less';

interface HeleSykmeldingenProps {
  sykmelding: Sykmelding;
  setVisHeleSykmeldingen: (value: boolean) => void;
}

const HeleSykmeldingen = ({ sykmelding, setVisHeleSykmeldingen }: HeleSykmeldingenProps) => {
  return (
    <div className="helesykmeldingen">
      <SykmeldingPerioder perioder={sykmelding.perioder} />
      <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering.hovedDiagnose} />
      {sykmelding.medisinskVurdering.biDiagnoser.map((diagnose, index) => (
        <DiagnoseSeksjon key={index.toString()} diagnose={diagnose} bidiagnose />
      ))}
      <ElementMedTekst
        vis={!!sykmelding.behandletTidspunkt}
        tittel="Dato sykmeldingen ble skrevet"
        tekst={tilLesbarDatoMedArstall(sykmelding.behandletTidspunkt)}
        margin
      />
      <ElementMedTekst
        vis={!!sykmelding.kontaktMedPasient.kontaktDato}
        tittel="Dato for dokumenterbar kontakt med pasienten"
        tekst={tilLesbarDatoMedArstall(sykmelding.kontaktMedPasient.kontaktDato)}
        margin
      />
      <ElementMedTekst
        vis={!!sykmelding.kontaktMedPasient.begrunnelseIkkeKontakt}
        tittel="Begrunnelse for tilbakedatering"
        tekst={sykmelding.kontaktMedPasient.begrunnelseIkkeKontakt}
        margin
      />
      <ElementMedTekst
        tittel="Pasienten er 100% arbeidsfør etter perioden"
        tekst={sykmelding.prognose?.arbeidsforEtterPeriode ? 'Ja' : 'Nei'}
        margin
      />
      <ElementMedTekst
        vis={!!sykmelding.arbeidsgiver.harArbeidsgiver}
        tittel="Arbeidsgiver som legen har skrevet inn"
        tekst={sykmelding.arbeidsgiver.navn}
        margin
      />
      <ElementMedTekst vis={!!sykmelding.navnFastlege} tittel="Sykmelder" tekst={sykmelding.navnFastlege} margin />
      <hr />
      <MulighetForArbeid perioder={sykmelding.perioder} />
      <Friskmelding prognose={sykmelding.prognose} />
      <UtdypendeOpplysninger opplysninger={sykmelding.utdypendeOpplysninger} />
      <Arbeidsevne tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen} tiltakNAV={sykmelding.tiltakNAV} />
      <Annet
        meldingTilNAV={sykmelding.meldingTilNAV}
        meldingTilArbeidsgiver={sykmelding.meldingTilArbeidsgiver}
        behandlerTelefon={sykmelding.behandler.tlf}
      />
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
