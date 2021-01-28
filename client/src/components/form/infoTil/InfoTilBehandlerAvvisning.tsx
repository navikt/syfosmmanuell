import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import Expandable from '../../expandable/Expandable';
import './InfoTil.less';

const InfoTilBehandlerAvvisning = () => {
  return (
    <Expandable className="info-til" erApen={false} tittel="Se hva vi sier til behandler" type="intern">
      <Normaltekst className="info-til__paragraph">
        Sykmelding gjelder som hovedregel fra den dagen pasienten oppsøker behandler. Sykmeldingen er tilbakedatert uten
        at det kommer tydelig nok fram hvorfor dette var nødvendig. Sykmeldingen er derfor avvist, og det må skrives en
        ny hvis det fortsatt er aktuelt med sykmelding. Pasienten har fått beskjed om å vente på ny sykmelding fra deg.
      </Normaltekst>
    </Expandable>
  );
};

export default InfoTilBehandlerAvvisning;
