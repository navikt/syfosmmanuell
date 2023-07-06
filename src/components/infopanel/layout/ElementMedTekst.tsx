import React from 'react'
import { BodyShort, Label } from '@navikt/ds-react'

import Innrykk from './Innrykk'
import Margin from './Margin'

interface ElementMedTekstProps {
    vis?: boolean
    tittel: string
    tekst?: string | null
    innrykk?: boolean
    margin?: boolean
}

const ElementMedTekst = ({ vis, tittel, tekst, innrykk, margin }: ElementMedTekstProps) => {
    if (vis === false) {
        return null
    }

    const innhold = (
        <>
            <Label>{tittel}</Label>
            {tekst && <BodyShort>{tekst}</BodyShort>}
        </>
    )

    const medMargin = margin ? <Margin>{innhold}</Margin> : innhold
    const medInnrykk = innrykk ? <Innrykk>{medMargin}</Innrykk> : medMargin

    return medInnrykk
}

export default ElementMedTekst
