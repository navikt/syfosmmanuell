import React, { ReactElement } from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'

function NotFound(): ReactElement {
    return (
        <section>
            <main>
                <Heading size="medium" level="3" spacing>
                    En ukjent feil har oppstått. Vi jobber nok med å løse problemet.
                </Heading>
                <BodyShort>Dersom problemet fortsetter, kan du kontakte oss.</BodyShort>
            </main>
        </section>
    )
}

export default NotFound
