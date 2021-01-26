import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import Expandable from '../../expandable/Expandable';
import './InfoTilPasient.less';

const InfoTilPasientAvvisning = () => {
  return (
    <Expandable className="info-til-pasient" erApen={false} tittel="Se hva vi sier til pasienten" type="intern">
      <Undertittel className="info-til-pasient__title">Sykmeldingen kan dessverre ikke brukes</Undertittel>
      <Normaltekst className="info-til-pasient__paragraph">Beklager at vi må bry deg mens du er syk.</Normaltekst>
      <Normaltekst className="info-til-pasient__paragraph">
        Du trenger en ny sykmelding fordi det er gjort en feil i utfyllingen. Vi har gitt beskjed til legen din om hva
        som er feil, og at du må få en ny sykmelding.
      </Normaltekst>
      <Normaltekst className="info-til-pasient__paragraph">
        Når du har fått ny sykmelding fra legen din, får du en ny beskjed fra oss om å logge deg inn på nav.no slik at
        du kan sende inn sykmeldingen. Går det mange dager, bør du kontakte legen som skal skrive den nye sykmeldingen.
      </Normaltekst>
      <Normaltekst className="info-til-pasient__paragraph">
        <strong>Grunnen til at sykmeldingen er avvist:</strong>
      </Normaltekst>
      <Normaltekst className="info-til-pasient__paragraph">
        Sykmeldingen din starter før du oppsøkte behandleren, uten at det er gitt en god nok begrunnelse for dette.
      </Normaltekst>
    </Expandable>
  );
};

export default InfoTilPasientAvvisning;
