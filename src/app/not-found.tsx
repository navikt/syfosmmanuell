import React, { ReactElement } from 'react'

import { Heading, BodyShort } from '../components/ds/rsc'
import { Alert } from '../components/ds'

function NotFound(): ReactElement {
    return (
        <Alert variant="warning">
            <Heading size="medium" level="3" spacing>
                Vi klarte ikke å finne denne oppgaven.
            </Heading>
            <BodyShort>Dersom problemet vedvarer, ta kontakt.</BodyShort>
        </Alert>
    )
}

export default NotFound
