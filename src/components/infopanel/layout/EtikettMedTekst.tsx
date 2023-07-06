import React, { ReactNode } from 'react'
import { BodyShort, Detail, Label } from '@navikt/ds-react'

import Innrykk from './Innrykk'
import Margin from './Margin'

interface EtikettMedTekstProps {
    tittel: string
    tekst?: string | ReactNode
    undertekst?: string
    margin?: boolean
    innrykk?: boolean
}

const EtikettMedTekst = ({ tittel, tekst, undertekst, margin, innrykk }: EtikettMedTekstProps) => {
    const innhold = (
        <div>
            <Label>{tittel}</Label>
            <BodyShort>{tekst}</BodyShort>
            {undertekst && <Detail>{undertekst}</Detail>}
        </div>
    )

    const medMargin = margin ? <Margin>{innhold}</Margin> : innhold
    const medInnrykk = innrykk ? <Innrykk>{medMargin}</Innrykk> : medMargin

    return <div style={{ flex: '1 1 auto' }}>{medInnrykk}</div>
}

export default EtikettMedTekst
