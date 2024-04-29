import React, { ReactElement } from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'

const NoEnhetError = (): ReactElement => {
    return (
        <div>
            <Heading size="medium" level="3">
                Vi klarte ikke å hente informasjon om dine enheter. Prøv å last siden på nytt.
            </Heading>
            <BodyShort>Ta kontakt dersom feilen fortsetter.</BodyShort>
        </div>
    )
}

export default NoEnhetError
