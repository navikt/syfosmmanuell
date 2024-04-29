'use client'

import React, { ReactElement, useEffect } from 'react'
import { logger } from '@navikt/next-logger'
import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react'

type Props = {
    error: Error
    reset: () => void
}

function Error({ error }: Props): ReactElement {
    useEffect(() => {
        logger.error(error)
    })

    return (
        <Alert variant="warning">
            <Heading size="medium" level="3" spacing>
                En ukjent feil har oppstått. Vi jobber nok med å løse problemet.
            </Heading>
            <BodyShort spacing>
                Du kan prøve å <Link href="">laste oppgaven på nytt</Link>.
            </BodyShort>
            <BodyShort>Dersom problemet fortsetter, kan du kontakte oss.</BodyShort>
        </Alert>
    )
}

export default Error
