import React from 'react';
import { RuleNames, RuleNamesDescription } from '../../types/validationresultTypes';
import { Element, Normaltekst } from 'nav-frontend-typografi';

interface SykmeldingheaderProps {
  regel: RuleNames;
  arbeidsgiver?: string;
  sykmelder: string;
}

const Sykmeldingheader = ({ regel, arbeidsgiver, sykmelder }: SykmeldingheaderProps) => {
  return (
    <div style={{ padding: '1rem' }}>
      <Element>Årsak til manuell vurdering:</Element>
      <Normaltekst style={{ marginBottom: '1.5rem' }}>{RuleNamesDescription[regel]}</Normaltekst>
      <Element>Arbeidsgiver: {arbeidsgiver}</Element>
      <Element>Sykmelder: {sykmelder}</Element>
    </div>
  );
};

export default Sykmeldingheader;
