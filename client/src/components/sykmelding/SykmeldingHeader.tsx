import React from 'react';
import { RuleInfo } from '../../types/validationresultTypes';
import { Element, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import dayjs from 'dayjs';
import './SykmeldingHeader.less';

interface SykmeldingheaderProps {
  regelUtslag: RuleInfo[];
  arbeidsgiver?: string;
  sykmelder: string;
  mottattDato: Date;
  personNrPasient: string;
}

const Sykmeldingheader = ({ regelUtslag, arbeidsgiver, sykmelder, mottattDato }: SykmeldingheaderProps) => {
  return (
    <div className="sykmelding-header">
      <Innholdstittel className="sykmelding-header__title">
        Manuell vurdering av tilbakedatert sykmelding
      </Innholdstittel>

      <div className="sykmelding-header__section">
        <Element>Pasientens navn:</Element>
        <Normaltekst>N/A (fjern?)</Normaltekst>
      </div>

      <div className="sykmelding-header__section">
        <Element>Arbeidsgiver:</Element>
        <Normaltekst> {arbeidsgiver}</Normaltekst>
      </div>

      <div className="sykmelding-header__section">
        <Normaltekst>
          <b>Arbeidsgiver:</b> {arbeidsgiver}
        </Normaltekst>
        <Normaltekst>
          <b>Sykmelder:</b> {sykmelder}
        </Normaltekst>
      </div>

      <div className="sykmelding-header__section">
        <Element>Dato NAV mottok sykmeldingen:</Element>
        <Normaltekst>{dayjs(mottattDato).format('DD.MM.YYYY kl. HH:mm:ss')}</Normaltekst>
      </div>
    </div>
  );
};

export default Sykmeldingheader;

/*

<div className="sykmelding-header__section">
        <Element>{regelUtslag.length > 1 ? 'Årsaker' : 'Årsak'} til manuell vurdering:</Element>
        <ul>
          {regelUtslag.map((regel, index) => {
            return (
              <li key={index}>
                <Normaltekst>{RuleNamesDescription[regel.ruleName]}</Normaltekst>
              </li>
            );
          })}
        </ul>
      </div>

*/
