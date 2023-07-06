import React, { ReactElement } from 'react'
import { BodyShort, HelpText, Label } from '@navikt/ds-react'

interface DiagnoseKodeSeksjonProps {
    kode: string
    system: string
    visHjelp: boolean
}

function DiagnoseKodeSeksjon({ kode, system, visHjelp }: DiagnoseKodeSeksjonProps): ReactElement {
    return (
        <div>
            <div className="flex gap-3">
                <Label>Diagnosekode</Label>
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
