import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import Expandable from '../../expandable/Expandable';
import './InfoTilPasient.less';

const InfoTilPasientAvslag = () => {
  return (
    <Expandable className="info-til-pasient" erApen={false} tittel="Se hva vi sier pasienten" type="intern">
      <section className="info-til-pasient__section">
        <Undertittel className="info-til-pasient__title">Tilbakedateringen kan ikke godkjennes</Undertittel>
        <Normaltekst className="info-til-pasient__paragraph">
          Vanligvis starter sykmeldingen den datoen du er hos behandleren. I enkelte tilfeller kan datoen i sykmeldingen
          settes tilbake i tid, det vi kaller tilbakedatering. NAV vurderer om det er en gyldig grunn for
          tilbakedateringen.
        </Normaltekst>
        <Normaltekst className="info-til-pasient__paragraph">
          Sykmeldingen din er datert til før du oppsøkte behandleren, og det er ikke oppgitt noen gyldig grunn. Derfor
          vil du ikke få sykepenger for disse dagene.
        </Normaltekst>
      </section>
      <section className="info-til-pasient__section">
        <Undertittel className="info-til-pasient__title">Hva nå?</Undertittel>
        <Normaltekst className="info-til-pasient__paragraph">
          Du kan likevel sende inn sykmeldingen. Når perioden er over, sender du søknaden om sykepenger. Når søknaden er
          behandlet, vil du få en begrunnelse for hvorfor du ikke kan få sykepenger for de 3 dagene, og du får samtidig
          mulighet til å klage.
        </Normaltekst>
      </section>
    </Expandable>
  );
};

export default InfoTilPasientAvslag;
