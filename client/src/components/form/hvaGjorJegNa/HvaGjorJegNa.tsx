import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import Expandable from '../../expandable/Expandable';
import './HvaGjorJegNa.less';

const HvaGjorJegNa = () => {
  return (
    <Expandable className="hva-gjor-jeg-na" erApen={false} tittel="Hva gjør jeg nå?" type="intern">
      <Normaltekst className="hva-gjor-jeg-na__intro">
        Vi jobber kontinuerlig med å forbedre løsningen. Inntil vi har utviklet en bedre løsning for etterspørring av
        dokumentasjon må følgende gjøres:
      </Normaltekst>
      <ol className="hva-gjor-jeg-na__list">
        <li>Registrer vurderingen</li>
        <li>Godkjenn oppgaven i Gosys</li>
        <li>Kontakt behanler (med kopi til bruker) og be om mer opplysninger</li>
        <li>Lag ny oppgave i Gosys for å følge opp saken og dialog med behandler</li>
      </ol>
    </Expandable>
  );
};

export default HvaGjorJegNa;
