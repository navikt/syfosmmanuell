import React, { ReactElement } from 'react'
import { Heading } from '@navikt/ds-react'

function NotFound(): ReactElement {
    return (
        <div style={{ marginTop: '32px' }}>
            <Heading size="medium" level="3">
                Vi klarte ikke å finne denne oppgaven.
            </Heading>
        </div>
    )
}

export default NotFound
