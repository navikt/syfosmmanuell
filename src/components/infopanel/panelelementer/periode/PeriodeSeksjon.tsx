import React from 'react';
import { Periode } from '../../../../types/sykmeldingTypes';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';

import { tilLesbarPeriodeMedArstall, hentDagerMellomDatoer } from '../../../../utils/datoUtils';
import './periodeseksjon.less';

interface PeriodeSeksjonProps {
  periode: Periode;
  understrek: boolean;
}

const PeriodeSeksjon = ({ periode, understrek }: PeriodeSeksjonProps) => {
  const periodeUndertekst = (periode: Periode): string => {
    if (periode.reisetilskudd) {
      return 'Reisetilskudd';
    } else if (periode.avventendeInnspillTilArbeidsgiver) {
      return 'Avventende';
    } else if (periode.behandlingsdager) {
      return 'Behandlingsdager';
    } else if (periode.gradert) {
      if (periode.gradert.grad) {
        return `${periode.gradert.grad}% sykmeldt ${periode.gradert.reisetilskudd ? 'med reisetilskudd' : null}`;
      } else {
        return `Gradert med reisetilskudd (grad mangler)`;
      }
    } else {
      return '100% sykmeldt';
    }
  };

  const antallDager = hentDagerMellomDatoer(periode.fom, periode.tom);
  return (
    <div className="periodeseksjon">
      <EtikettLiten>Periode</EtikettLiten>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Normaltekst>
          <strong>{tilLesbarPeriodeMedArstall(periode.fom, periode.tom)}</strong>
        </Normaltekst>
        <Normaltekst>
          &nbsp;&bull; {antallDager} {antallDager === 1 ? 'dag' : 'dager'}
        </Normaltekst>
      </div>
      {periodeUndertekst(periode)}
      {understrek && <hr />}
    </div>
  );
};

export default PeriodeSeksjon;
