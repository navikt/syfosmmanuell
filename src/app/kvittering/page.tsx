'use client'

import React, { ReactElement, useEffect } from 'react'
import { logger } from '@navikt/next-logger'
import { Alert, BodyShort } from '@navikt/ds-react'

import { browserEnv, isLocalOrDemo } from '../../utils/env'

function Page(): ReactElement {
    useEffect(() => {
        if (isLocalOrDemo) {
            logger.warn('In demo, redirecting back to dummy oppgave')
            setTimeout(() => {
                window.location.href = '/?oppgaveid=123456'
            }, 2000)
            return
        }

        logger.info('On kvittering page, user will be redirected to GOSYS')
        setTimeout(() => {
            window.location.href = browserEnv.NEXT_PUBLIC_GOSYS_URL
        }, 2000)
    }, [])

    return (
        <div>
            <Alert variant="info">
                <BodyShort>Oppgaven er registrert. Du videresendes automatisk til GOSYS.</BodyShort>
                {isLocalOrDemo && (
                    <BodyShort>
                        Dette er bare en demo, du blir sendt tilbake til oppgaven. Ingenting har blitt lagret.
                    </BodyShort>
                )}
            </Alert>
        </div>
    )
}

export default Page
