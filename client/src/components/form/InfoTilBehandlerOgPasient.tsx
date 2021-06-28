import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import './InfoTilBehandlerOgPasient.less';
import Expandable from '../expandable/Expandable';
import { Merknad } from './Form';

const BeskjedTilPasient: Record<Merknad, string> = {
  UGYLDIG_TILBAKEDATERING:
    'Vanligvis starter sykmeldingen den datoen du er hos behandleren. I enkelte tilfeller kan datoen i sykmeldingen settes tilbake i tid, det vi kaller tilbakedatering. NAV vurderer om det er en gyldig grunn for tilbakedateringen.\n\nSykmeldingen din startet før du oppsøkte behandleren, og det er ikke oppgitt noen gyldig grunn. Derfor vil du ikke få sykepenger for disse dagene.\n\nDu kan likevel sende inn sykmeldingen. Når perioden er over, sender du søknaden om sykepenger. Når søknaden er behandlet, vil du få en begrunnelse for hvorfor du ikke kan få sykepenger for de tilbakedaterte dagene, og du får samtidig mulighet til å klage.',
  TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER:
    'Sykmeldingen din starter tidligere enn den dagen du var hos behandleren. Vi kontakter nå behandleren din for å få opplysninger om hvorfor sykmeldingen er datert tilbake.\n\nDu kan likevel sende inn søknaden om sykepenger.',
};

interface InfoTilBehandlerOgPasientProps {
  type?: Merknad;
}

const InfoTilBehandlerOgPasient = ({ type }: InfoTilBehandlerOgPasientProps) => {
  if (type === undefined) {
    return null;
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
