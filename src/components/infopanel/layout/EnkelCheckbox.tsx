import React, { ReactElement } from 'react'
import Image from 'next/image'
import { BodyShort } from '@navikt/ds-react'

import sjekkboks from '../../../svg/sjekkboks.svg'
import sjekkboksKryss from '../../../svg/sjekkboksKryss.svg'
import { cleanId } from '../../../utils/uu'

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

    const labelId = cleanId(tittel)

    const innhold: ReactElement = (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '1rem' }}>
                    <Image src={checked ? sjekkboks : sjekkboksKryss} alt={checked ? 'Checked' : 'Kryss'} />
                </span>
                <span>
                    {bold ? (
                        <BodyShort id={labelId} className="font-bold">
                            {tittel}
                        </BodyShort>
                    ) : (
                        <BodyShort id={labelId}>{tittel}</BodyShort>
                    )}
                </span>
            </div>
            {!!listItems?.length && (
                <ul className="list-disc mt-4 ml-10" aria-labelledby={labelId}>
                    {listItems.map((item) => (
                        <li key={item} className="ml-6">
                            {item}
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
