import React from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'

import Innrykk from './Innrykk'
import Margin from './Margin'

interface ElementMedTekstProps {
    vis?: boolean
    tittel: string
    tekst?: string | null
    innrykk?: boolean
    margin?: boolean
    headingLevel?: '1' | '2' | '3' | '4' | '5' | '6'
}

const ElementMedTekst = ({ vis, tittel, tekst, innrykk, margin, headingLevel = '4' }: ElementMedTekstProps) => {
    if (vis === false) {
        return null
    }

    const innhold = (
        <>
            <Heading size="xsmall" level={headingLevel}>
                {tittel}
            </Heading>
            {tekst && <BodyShort>{tekst}</BodyShort>}
        </>
    )

    const medMargin = margin ? <Margin>{innhold}</Margin> : innhold
    const medInnrykk = innrykk ? <Innrykk>{medMargin}</Innrykk> : medMargin

    return medInnrykk
}

export default ElementMedTekst
