import React, { ReactElement } from 'react'
import { BodyShort, Heading, HelpText } from '@navikt/ds-react'

interface DiagnoseKodeSeksjonProps {
    kode: string
    system: string
    visHjelp: boolean
    headingLevel: '1' | '2' | '3' | '4' | '5' | '6'
}

function DiagnoseKodeSeksjon({ kode, system, visHjelp, headingLevel }: DiagnoseKodeSeksjonProps): ReactElement {
    return (
        <div>
            <div className="flex gap-3">
                <Heading size="xsmall" level={headingLevel}>
                    Diagnosekode
                </Heading>
                {visHjelp && (
                    <HelpText>
                        Diagnosekoden henviser til de internasjonale kodeverkene som klassifiserer sykdom og symptomer.
                        De ulike diagnosekodene brukes for å gi en mest mulig presis diagnose.
                    </HelpText>
                )}
            </div>
            <BodyShort>{kode}</BodyShort>
            <BodyShort size="small">{system}</BodyShort>
        </div>
    )
}

export default DiagnoseKodeSeksjon
