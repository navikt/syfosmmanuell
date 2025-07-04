import React, { ReactNode } from 'react'
import { BodyShort, Detail, Heading } from '@navikt/ds-react'

import { cleanId } from '../../../utils/uu'

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
    const labelId = cleanId(tekst + '-etikett-' + headingLevel)
    const innhold = (
        <div>
            <Heading id={labelId} size="xsmall" level={headingLevel}>
                {tittel}
            </Heading>
            <section aria-labelledby={labelId}>
                <BodyShort>{tekst}</BodyShort>
                {undertekst && <Detail>{undertekst}</Detail>}
            </section>
        </div>
    )

    const medMargin = margin ? <Margin>{innhold}</Margin> : innhold
    const medInnrykk = innrykk ? <Innrykk>{medMargin}</Innrykk> : medMargin

    return <div className="mr-14">{medInnrykk}</div>
}

export default EtikettMedTekst
