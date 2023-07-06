import React, { ReactElement } from 'react'
import { BodyShort, Label } from '@navikt/ds-react'

import { tilLesbarPeriodeMedArstall, countDaysBetweenTwoDatesIncludingFom } from '../../../../utils/datoUtils'
import { periodeUndertekst } from '../../../../utils/tekstUtils'
import { Periode } from '../../../../types/sykmelding'

interface PeriodeSeksjonProps {
    periode: Periode
    understrek: boolean
}

function PeriodeSeksjon({ periode, understrek }: PeriodeSeksjonProps): ReactElement {
    const antallDager = countDaysBetweenTwoDatesIncludingFom(periode.fom, periode.tom)
    return (
        <div>
            <Label>Sykmeldingsperiode</Label>
            <div className="flex flex-wrap">
                <BodyShort>{tilLesbarPeriodeMedArstall(periode.fom, periode.tom)}</BodyShort>
                {antallDager && (
                    <BodyShort>
                        &nbsp;&bull; {antallDager} {antallDager === 1 ? 'dag' : 'dager'}
                    </BodyShort>
                )}
            </div>
            <BodyShort>{periodeUndertekst(periode)}</BodyShort>
            {understrek && <hr />}
        </div>
    )
}

export default PeriodeSeksjon
