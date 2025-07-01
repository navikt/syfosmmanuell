import React, { ReactElement } from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'

import { tilLesbarPeriodeMedArstall, countDaysBetweenTwoDatesIncludingFom } from '../../../../utils/datoUtils'
import { periodeUndertekst } from '../../../../utils/tekstUtils'
import { Periode } from '../../../../types/sykmelding'
import { cleanId } from '../../../../utils/uu'

interface PeriodeSeksjonProps {
    periode: Periode
}

function PeriodeSeksjon({ periode }: PeriodeSeksjonProps): ReactElement {
    const antallDager = countDaysBetweenTwoDatesIncludingFom(periode.fom, periode.tom)
    const headingId = cleanId(`sykmeldingsperiode-${periode.fom}-${periode.tom}`)
    return (
        <div>
            <Heading id={headingId} size="xsmall" level="3">
                Sykmeldingsperiode
            </Heading>
            <section aria-labelledby={headingId}>
                <div className="flex flex-wrap">
                    <BodyShort>{tilLesbarPeriodeMedArstall(periode.fom, periode.tom)}</BodyShort>
                    {antallDager && (
                        <BodyShort>
                            <span aria-hidden> &nbsp;&bull;</span> {antallDager} {antallDager === 1 ? 'dag' : 'dager'}
                        </BodyShort>
                    )}
                </div>
                <BodyShort>{periodeUndertekst(periode)}</BodyShort>
            </section>
        </div>
    )
}

export default PeriodeSeksjon
