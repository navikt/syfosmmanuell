import React, { ReactNode } from 'react'
import { Heading } from '@navikt/ds-react'

interface SeksjonMedTittelProps {
    tittel?: string
    children: ReactNode
}

function SeksjonMedTittel({ tittel, children }: SeksjonMedTittelProps) {
    return (
        <div className="border-b border-border-divider">
            {tittel && (
                <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                    <Heading size="medium" level="3">
                        {tittel}
                    </Heading>
                </div>
            )}

            {children}
        </div>
    )
}

export default SeksjonMedTittel
