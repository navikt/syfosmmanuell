import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { Arsak, arsaker } from '../../types/formTypes';
import './HvaViSierTilBehandlerOgPasient.less';

interface HvaViSierTilBehandlerOgPasientProps {
  arsak?: Arsak;
}
const HvaViSierTilBehandlerOgPasient = ({ arsak }: HvaViSierTilBehandlerOgPasientProps) => {
  if (!arsak) {
    return null;
  }

  return (
    <Ekspanderbartpanel
      className="se-hva-vi-sier"
      border
      tittel={<Normaltekst>Se hva vi sier til behandleren og pasienten</Normaltekst>}
    >
      <div className="se-hva-vi-sier__behandler">
        <Element>Beskjed til behandleren</Element>
        <Normaltekst>{arsaker[arsak].messageForSender}</Normaltekst>
      </div>
      <div className="se-hva-vi-sier__pasient">
        <Element>Beskjed til pasienten</Element>
        <Normaltekst>{arsaker[arsak].messageForUser}</Normaltekst>
      </div>
    </Ekspanderbartpanel>
  );
};

export default HvaViSierTilBehandlerOgPasient;
