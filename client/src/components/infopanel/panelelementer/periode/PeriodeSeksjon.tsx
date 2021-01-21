import React from 'react';
import { Periode } from '../../../../types/sykmeldingTypes';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';

import { tilLesbarPeriodeMedArstall, hentDagerMellomDatoer } from '../../../../utils/datoUtils';
import './periodeseksjon.less';
import { periodeUndertekst } from '../../../../utils/tekstUtils';

interface PeriodeSeksjonProps {
  periode: Periode;
  understrek: boolean;
}

const PeriodeSeksjon = ({ periode, understrek }: PeriodeSeksjonProps) => {
  const antallDager = hentDagerMellomDatoer(periode.fom, periode.tom);
  return (
    <div className="periodeseksjon">
      <EtikettLiten>Sykmeldingsperiode</EtikettLiten>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Normaltekst>
          <strong>{tilLesbarPeriodeMedArstall(periode.fom, periode.tom)}</strong>
        </Normaltekst>
        <Normaltekst>
          &nbsp;&bull; {antallDager} {antallDager === 1 ? 'dag' : 'dager'}
        </Normaltekst>
      </div>
      <Normaltekst>{periodeUndertekst(periode)}</Normaltekst>
      {understrek && <hr />}
    </div>
  );
};

export default PeriodeSeksjon;
