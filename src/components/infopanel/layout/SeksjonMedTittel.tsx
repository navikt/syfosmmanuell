import React, { ReactNode } from 'react'
import { Systemtittel } from 'nav-frontend-typografi'

interface SeksjonMedTittelProps {
    tittel?: string
    children: ReactNode
    understrek?: boolean
}

const SeksjonMedTittel = ({ tittel, children, understrek }: SeksjonMedTittelProps) => {
    return (
        <>
            {tittel && (
                <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                    <Systemtittel>{tittel}</Systemtittel>
                </div>
            )}

            {children}

            {understrek && <hr />}
        </>
    )
}

export default SeksjonMedTittel
