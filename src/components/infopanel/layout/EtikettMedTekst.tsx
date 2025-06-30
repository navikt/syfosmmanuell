import React, { ReactNode } from 'react'
import { BodyShort, Detail, Heading } from '@navikt/ds-react'

import Innrykk from './Innrykk'
import Margin from './Margin'

interface EtikettMedTekstProps {
    tittel: string
    tekst?: string | ReactNode
    undertekst?: string
    margin?: boolean
    innrykk?: boolean
    headingLevel?: '1' | '2' | '3' | '4' | '5' | '6'
}

const EtikettMedTekst = ({ tittel, tekst, undertekst, margin, innrykk, headingLevel = '3' }: EtikettMedTekstProps) => {
    const innhold = (
        <div>
            <Heading size="xsmall" level={headingLevel}>
                {tittel}
            </Heading>
            <BodyShort>{tekst}</BodyShort>
            {undertekst && <Detail>{undertekst}</Detail>}
        </div>
    )

    const medMargin = margin ? <Margin>{innhold}</Margin> : innhold
    const medInnrykk = innrykk ? <Innrykk>{medMargin}</Innrykk> : medMargin

    return <div style={{ flex: '1 1 auto' }}>{medInnrykk}</div>
}

export default EtikettMedTekst
