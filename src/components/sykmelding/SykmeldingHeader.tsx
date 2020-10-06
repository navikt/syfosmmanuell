import React from 'react';
import { RuleInfo, RuleNamesDescription } from '../../types/validationresultTypes';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import dayjs from 'dayjs';
import './SykmeldingHeader.less';

interface SykmeldingheaderProps {
  regelUtslag: RuleInfo[];
  arbeidsgiver?: string;
  sykmelder: string;
  mottattDato: Date;
}

const Sykmeldingheader = ({ regelUtslag, arbeidsgiver, sykmelder, mottattDato }: SykmeldingheaderProps) => {
  return (
    <div className="sykmelding-header">
      <div className="sykmelding-header__arsak">
        <Element>{regelUtslag.length > 1 ? 'Årsaker' : 'Årsak'} til manuell vurdering:</Element>
        {regelUtslag.map((regel, index) => {
          return <Normaltekst key={index}>{RuleNamesDescription[regel.ruleName]}</Normaltekst>;
        })}
      </div>
      <div className="sykmelding-header__mottattdato">
        <Element>Dato mottatt av NAV:</Element>
        <Normaltekst>{dayjs(mottattDato).format('DD.MM.YYYY kl. HH:mm:ss')}</Normaltekst>
      </div>
      <div className="sykmelding-header__arbg-sykmelder">
        <Element>Arbeidsgiver: {arbeidsgiver}</Element>
        <Element>Sykmelder: {sykmelder}</Element>
      </div>
    </div>
  );
};

export default Sykmeldingheader;
