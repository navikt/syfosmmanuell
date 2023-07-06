import React, { ReactElement } from 'react'

import { sorterPerioderEldsteFoerst } from '../../../../utils/sorterSykmeldingUtils'
import { Periode } from '../../../../types/sykmelding'

import PeriodeSeksjon from './PeriodeSeksjon'

interface SykmeldingPerioderProps {
    perioder: Periode[]
}

function SykmeldingPerioder({ perioder }: SykmeldingPerioderProps): ReactElement {
    const sortert = sorterPerioderEldsteFoerst(perioder)
    return (
        <div className="flex flex-col gap-4">
            {sortert.map((periode) => (
                <div key={`${periode.fom}-${periode.tom}`}>
                    <PeriodeSeksjon periode={periode} understrek={false} />
                </div>
            ))}
        </div>
    )
}

export default SykmeldingPerioder
