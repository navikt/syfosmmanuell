import React from 'react';

import { sorterPerioderEldsteFoerst } from '../../../../utils/sorterSykmeldingUtils';
import PeriodeSeksjon from './PeriodeSeksjon';
import Margin from '../../layout/Margin';
import { Periode } from '../../../../types/sykmelding';

interface SykmeldingPerioderProps {
  perioder: Periode[];
}

const SykmeldingPerioder = ({ perioder }: SykmeldingPerioderProps) => {
  const sortert = sorterPerioderEldsteFoerst(perioder);
  return (
    <>
      {sortert.map((periode, index) => (
        <Margin key={index.toString()}>
          <PeriodeSeksjon periode={periode} understrek={false} />
        </Margin>
      ))}
    </>
  );
};

export default SykmeldingPerioder;
