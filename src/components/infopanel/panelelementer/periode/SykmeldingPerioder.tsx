import React from 'react';

import { sorterPerioderEldsteFoerst } from '../../../../utils/sorterSykmeldingUtils';
import Margin from '../../layout/Margin';
import { Periode } from '../../../../types/sykmelding';

import PeriodeSeksjon from './PeriodeSeksjon';

interface SykmeldingPerioderProps {
  perioder: Periode[];
}

const SykmeldingPerioder = ({ perioder }: SykmeldingPerioderProps) => {
  const sortert = sorterPerioderEldsteFoerst(perioder);
  return (
    <>
      {sortert.map((periode) => (
        <Margin key={`${periode.fom}-${periode.tom}`}>
          <PeriodeSeksjon periode={periode} understrek={false} />
        </Margin>
      ))}
    </>
  );
};

export default SykmeldingPerioder;
