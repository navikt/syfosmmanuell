import { Element, Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { Arsak, arsaker } from '../../types/formTypes';
import Expandable from '../expandable/Expandable';
import './HvaViSierTilBehandlerOgPasient.less';

interface HvaViSierTilBehandlerOgPasientProps {
  arsak?: Arsak;
}
const HvaViSierTilBehandlerOgPasient = ({ arsak }: HvaViSierTilBehandlerOgPasientProps) => {
  if (!arsak) {
    return null;
  }

  return (
    <Expandable
      className="se-hva-vi-sier"
      erApen={false}
      tittel="Se hva vi sier til behandleren og pasienten"
      type="intern"
    >
      <div className="se-hva-vi-sier__behandler">
        <Element tag="h4">Beskjed til behandleren</Element>
        <Normaltekst>{arsaker[arsak].messageForSender}</Normaltekst>
      </div>
      <div className="se-hva-vi-sier__pasient">
        <Element tag="h4">Beskjed til pasienten</Element>
        <Normaltekst>{arsaker[arsak].messageForUser}</Normaltekst>
      </div>
    </Expandable>
  );
};

export default HvaViSierTilBehandlerOgPasient;
