import React from 'react'

import EtikettMedTekst from '../../layout/EtikettMedTekst'
import { Diagnose } from '../../../../types/sykmelding'

import DiagnoseKodeSeksjon from './DiagnoseKodeSeksjon'

interface DiagnoseSeksjonProps {
    diagnose: Diagnose
    bidiagnose?: boolean
    withPrefix?: boolean
}

function DiagnoseSeksjon({ diagnose: { tekst, kode, system }, bidiagnose, withPrefix = false }: DiagnoseSeksjonProps) {
    return (
        <div className="flex flex-wrap mb-4">
            <EtikettMedTekst
                tittel={getDiagnoseTitle(bidiagnose, withPrefix)}
                tekst={tekst}
                undertekst="Diagnosen vises ikke til arbeidsgiveren"
                headingLevel={withPrefix ? '4' : '3'}
            />
            <DiagnoseKodeSeksjon
                kode={kode}
                system={system}
                visHjelp={!bidiagnose}
                headingLevel={withPrefix ? '4' : '3'}
            />
        </div>
    )
}

function getDiagnoseTitle(bidiagnose: boolean | undefined, withPrefix: boolean | undefined): string {
    if (bidiagnose) {
        if (withPrefix) {
            return '3.2. Bidiagnose'
        }
        return 'Bidiagnose'
    }

    if (withPrefix) {
        return '3.1. Diagnose'
    }

    return 'Diagnose'
}

export default DiagnoseSeksjon
