import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import Expandable from '../../expandable/Expandable';
import './InfoTilPasient.less';

const InfoTilPasientAvvisning = () => {
  return (
    <Expandable className="info-til-pasient" erApen={false} tittel="Se hva vi sier til pasienten" type="intern">
      <Undertittel className="info-til-pasient__title">Mangler opplysninger for tilbakedatering</Undertittel>
      <Normaltekst className="info-til-pasient__paragraph">
        Vanligvis starter sykmeldingen den datoen du er hos behandleren. I enkelte tilfeller kan datoen i sykmeldingen
        settes tilbake i tid, det vi kaller tilbakedatering. NAV vurderer om det er en gyldig grunn for
        tilbakedateringen.
      </Normaltekst>
      <Normaltekst className="info-til-pasient__paragraph">
        Sykmeldingen din er datert til før du oppsøkte behandleren, uten at det er gitt en god nok begrunnelse for
        dette. Behandleren din må skrive ut en ny sykmelding og begrunne bedre hvorfor den er tilbakedatert. Din
        behandler har mottatt melding fra NAV om dette.
      </Normaltekst>
    </Expandable>
  );
};

export default InfoTilPasientAvvisning;
