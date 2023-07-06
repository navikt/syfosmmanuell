import React, { ReactElement } from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'

const NoEnhetError = (): ReactElement => {
    return (
        <main className="m-12">
            <Heading size="medium" level="3">
                Vi klarte ikke å hente informasjon om dine enheter. Prøv å last siden på nytt.
            </Heading>
            <BodyShort>Ta kontakt dersom feilen fortsetter.</BodyShort>
        </main>
    )
}

export default NoEnhetError
