import React from 'react'
import { Element, Normaltekst } from 'nav-frontend-typografi'

import { tilLesbarPeriodeMedArstall, countDaysBetweenTwoDatesIncludingFom } from '../../../../utils/datoUtils'
import { periodeUndertekst } from '../../../../utils/tekstUtils'
import { Periode } from '../../../../types/sykmelding'

interface PeriodeSeksjonProps {
    periode: Periode
    understrek: boolean
}

const PeriodeSeksjon = ({ periode, understrek }: PeriodeSeksjonProps) => {
    const antallDager = countDaysBetweenTwoDatesIncludingFom(periode.fom, periode.tom)
    return (
        <div className="periodeseksjon">
            <Element>Sykmeldingsperiode</Element>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Normaltekst>{tilLesbarPeriodeMedArstall(periode.fom, periode.tom)}</Normaltekst>
                {antallDager && (
                    <Normaltekst>
                        &nbsp;&bull; {antallDager} {antallDager === 1 ? 'dag' : 'dager'}
                    </Normaltekst>
                )}
            </div>
            <Normaltekst>{periodeUndertekst(periode)}</Normaltekst>
            {understrek && <hr />}
        </div>
    )
}

export default PeriodeSeksjon
