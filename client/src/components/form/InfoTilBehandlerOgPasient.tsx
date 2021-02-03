import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import './InfoTilBehandlerOgPasient.less';
import Expandable from '../expandable/Expandable';
import { Merknad, Avvisningstype } from './Form';

const BeskjedTilBehandler: Record<Merknad | Avvisningstype, string> = {
  MANGLER_BEGRUNNELSE: 'mangler begrunnelse',
  UGYLDIG_BEGRUNNELSE: 'ugyldig begrunnelse',
  UGYLDIG_TILBAKEDATERING: 'ugyldig tilbakedatering',
  KREVER_FLERE_OPPLYSNINGER: 'krever flere opplysninger',
};

const BeskjedTilPasient: Record<Merknad | Avvisningstype, string> = {
  MANGLER_BEGRUNNELSE: 'mangler begrunnelse',
  UGYLDIG_BEGRUNNELSE: 'ugyldig begrunnelse',
  UGYLDIG_TILBAKEDATERING: 'ugyldig tilbakedatering',
  KREVER_FLERE_OPPLYSNINGER: 'krever flere opplysninger',
};

interface InfoTilBehandlerOgPasientProps {
  type?: Merknad | Avvisningstype;
}

const InfoTilBehandlerOgPasient = ({ type }: InfoTilBehandlerOgPasientProps) => {
  if (type === undefined) {
    return null;
  }

  return (
    <Expandable className="info-til" erApen={false} tittel="Se hva vi sier til behandler og pasient" type="intern">
      <div className="info-til__behandler" style={{ marginBottom: '1rem' }}>
        <Undertittel>Beskjed til behandleren</Undertittel>
        <Normaltekst className="info-til__paragraph">{BeskjedTilBehandler[type]}</Normaltekst>
      </div>
      <div className="info-til__pasient">
        <Undertittel>Beskjed til pasienten</Undertittel>
        <Normaltekst className="info-til__paragraph">{BeskjedTilPasient[type]}</Normaltekst>
      </div>
    </Expandable>
  );
};

export default InfoTilBehandlerOgPasient;
