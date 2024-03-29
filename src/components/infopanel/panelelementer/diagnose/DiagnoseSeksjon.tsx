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
        <div className="mb-4 grid grid-cols-2">
            <EtikettMedTekst
                tittel={getDiagnoseTitle(bidiagnose, withPrefix)}
                tekst={tekst}
                undertekst="Diagnosen vises ikke til arbeidsgiveren"
            />
            <DiagnoseKodeSeksjon kode={kode} system={system} visHjelp={!bidiagnose} />
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
