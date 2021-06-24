import React from 'react';
import { Element, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import dayjs from 'dayjs';
import './SykmeldingHeader.less';

interface SykmeldingheaderProps {
  arbeidsgiverNavn: string | null;
  sykmelder: string | null;
  mottattDato: Date;
  personNrPasient: string;
}

const Sykmeldingheader = ({ personNrPasient, arbeidsgiverNavn, sykmelder, mottattDato }: SykmeldingheaderProps) => {
  return (
    <div className="sykmelding-header">
      <Innholdstittel className="sykmelding-header__title">
        Manuell vurdering av tilbakedatert sykmelding
      </Innholdstittel>

      <div className="sykmelding-header__section">
        <Element>Fødselsnummer:</Element>
        <Normaltekst> {personNrPasient}</Normaltekst>
      </div>

      <div className="sykmelding-header__section">
        {arbeidsgiverNavn && (
          <Normaltekst>
            <b>Arbeidsgiver:</b> {arbeidsgiverNavn}
          </Normaltekst>
        )}
        {sykmelder && (
          <Normaltekst>
            <b>Sykmelder:</b> {sykmelder}
          </Normaltekst>
        )}
      </div>

      <div className="sykmelding-header__section">
        <Element>Datoen NAV mottok sykmeldingen:</Element>
        <Normaltekst>{dayjs(mottattDato).format('DD.MM.YYYY kl. HH:mm:ss')}</Normaltekst>
      </div>
    </div>
  );
};

export default Sykmeldingheader;
