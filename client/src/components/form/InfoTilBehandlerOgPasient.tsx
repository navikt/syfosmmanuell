import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import './InfoTilBehandlerOgPasient.less';
import Expandable from '../expandable/Expandable';
import { Merknad, AvvisningType } from './Form';

const BeskjedTilBehandler: Record<AvvisningType, string> = {
  MANGLER_BEGRUNNELSE:
    'Sykmelding gjelder som hovedregel fra den dagen pasienten oppsøker behandler. Sykmeldingen er tilbakedatert uten at det kommer tydelig nok fram hvorfor dette var nødvendig. Sykmeldingen er derfor avvist, og det må skrives en ny hvis det fortsatt er aktuelt med sykmelding. Pasienten har fått beskjed om å vente på ny sykmelding fra deg.',
  UGYLDIG_BEGRUNNELSE:
    'NAV kan ikke godta tilbakedateringen. Sykmeldingen er derfor avvist. Hvis sykmelding fortsatt er aktuelt, må det skrives ny sykmelding der f.o.m.-dato er dagen du var i kontakt med pasienten. Pasienten har fått beskjed om å vente på ny sykmelding fra deg.',
};

const BeskjedTilPasient: Record<Merknad | AvvisningType, string> = {
  MANGLER_BEGRUNNELSE:
    'Sykmelding gjelder som hovedregel fra den dagen du oppsøker behandler. Sykmeldingen din er tilbakedatert uten at det er gitt en god nok begrunnelse for dette. Behandleren din må skrive ut en ny sykmelding og begrunne bedre hvorfor den er tilbakedatert. Din behandler har mottatt melding fra NAV om dette.',
  UGYLDIG_BEGRUNNELSE:
    'NAV kan ikke godta sykmeldingen din fordi den starter før dagen du tok kontakt med behandleren. Trenger du fortsatt sykmelding, må behandleren din skrive en ny som gjelder fra den dagen dere var i kontakt. Behandleren din har fått beskjed fra NAV om dette.',
  UGYLDIG_TILBAKEDATERING:
    'Tilbakedateringen kan ikke godkjennes. Vanligvis starter sykmeldingen den datoen du er hos behandleren. I enkelte tilfeller kan datoen i sykmeldingen settes tilbake i tid, det vi kaller tilbakedatering. NAV vurderer om det er en gyldig grunn for tilbakedateringen. Sykmeldingen din startet før du oppsøkte behandleren, og det er ikke oppgitt noen gyldig grunn. Derfor vil du ikke få sykepenger for disse dagene. Du kan likevel sende inn sykmeldingen. Når perioden er over, sender du søknaden om sykepenger. Når søknaden er behandlet, vil du få en begrunnelse for hvorfor du ikke kan få sykepenger for de tilbakedaterte dagene, og du får samtidig mulighet til å klage.',
  TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER:
    'Behov for mer opplysninger. Sykmeldingen din starter tidligere enn den dagen du var hos behandleren. Vi kontakter nå behandleren din for å få opplysninger om hvorfor sykmeldingen er datert tilbake. Du kan likevel sende inn søknaden om sykepenger. Avhengig av hvilke opplysninger vi får fra behandleren din, kan det hende du ikke får sykepenger for dagene før sykmeldingstidspunktet.',
};

interface InfoTilBehandlerOgPasientProps {
  type?: Merknad | AvvisningType;
}

const InfoTilBehandlerOgPasient = ({ type }: InfoTilBehandlerOgPasientProps) => {
  if (type === undefined) {
    return null;
  }

  // if type is Avvisningstype
  if (type === 'MANGLER_BEGRUNNELSE' || type === 'UGYLDIG_BEGRUNNELSE') {
    return (
      <Expandable
        className="info-til"
        erApen={false}
        tittel="Se hva vi sier til behandleren og pasienten"
        type="intern"
      >
        <div className="info-til__behandler">
          <Undertittel>Beskjed til behandleren</Undertittel>
          <Normaltekst className="info-til__paragraph">{BeskjedTilBehandler[type]}</Normaltekst>
        </div>
        <div className="info-til__pasient">
          <Undertittel>Beskjed til pasienten</Undertittel>
          <Normaltekst className="info-til__paragraph">{BeskjedTilPasient[type]}</Normaltekst>
        </div>
      </Expandable>
    );
  }

  return (
    <Expandable className="info-til" erApen={false} tittel="Se hva vi sier til pasienten" type="intern">
      <div className="info-til__pasient">
        <Undertittel>Beskjed til pasienten</Undertittel>
        <Normaltekst className="info-til__paragraph">{BeskjedTilPasient[type]}</Normaltekst>
      </div>
    </Expandable>
  );
};

export default InfoTilBehandlerOgPasient;
