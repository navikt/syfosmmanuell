import React, { ReactElement } from 'react'
import Image from 'next/image'
import { BodyShort, Label } from '@navikt/ds-react'

import sjekkboks from '../../../svg/sjekkboks.svg'
import sjekkboksKryss from '../../../svg/sjekkboksKryss.svg'

import Innrykk from './Innrykk'
import Margin from './Margin'

interface EnkelCheckboxProps {
    tittel: string
    checked: boolean
    margin?: boolean
    innrykk?: boolean
    bold?: boolean
    vis?: boolean
    listItems?: string[]
}

const EnkelCheckbox = ({ tittel, checked, margin, innrykk, bold, vis = true, listItems }: EnkelCheckboxProps) => {
    if (!vis) {
        return null
    }

    const innhold: ReactElement = (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '1rem' }}>
                    <Image src={checked ? sjekkboks : sjekkboksKryss} alt="sjekkboks ikon" />
                </span>
                <span>{bold ? <Label>{tittel}</Label> : <BodyShort>{tittel}</BodyShort>}</span>
            </div>
            {!!listItems?.length && (
                <ul style={{ marginTop: '1rem', marginLeft: '2.5rem' }}>
                    {listItems.map((item) => (
                        <li key={item}>
                            <BodyShort>{item}</BodyShort>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )

    const medMargin = margin ? <Margin>{innhold}</Margin> : innhold
    const medInnrykk = innrykk ? <Innrykk>{medMargin}</Innrykk> : medMargin

    return <div style={{ flex: '1' }}>{medInnrykk}</div>
}

export default EnkelCheckbox
