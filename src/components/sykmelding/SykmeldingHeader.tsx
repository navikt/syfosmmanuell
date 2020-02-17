import React from 'react';
import { RuleNames, RuleNamesDescription } from '../../types/validationresultTypes';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import './SykmeldingHeader.less';

interface SykmeldingheaderProps {
  regel: RuleNames;
  arbeidsgiver?: string;
  sykmelder: string;
}

const Sykmeldingheader = ({ regel, arbeidsgiver, sykmelder }: SykmeldingheaderProps) => {
  return (
    <div className="sykmelding-header">
      <div className="sykmelding-header__arsak">
        <Element>Årsak til manuell vurdering:</Element>
        <Normaltekst>{RuleNamesDescription[regel]}</Normaltekst>
      </div>
      <Element>Arbeidsgiver: {arbeidsgiver}</Element>
      <Element>Sykmelder: {sykmelder}</Element>
    </div>
  );
};

export default Sykmeldingheader;
