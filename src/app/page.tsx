import React, { ReactElement, Suspense } from 'react'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { Alert, Heading, BodyShort, Skeleton } from '@navikt/ds-react'

import { getOppgave } from '../services/oppgaveService'
import { getUserToken } from '../auth/authentication'
import ManuellOppgaveErrors from '../components/ManuellOppgaveErrors'
import MainContent from '../components/MainContent'

async function Page(props: { searchParams: Promise<{ oppgaveid: string | undefined }> }): Promise<ReactElement> {
    const searchParams = await props.searchParams
    if (searchParams.oppgaveid == null) {
        return (
            <Alert variant="error">
                <Heading size="medium" spacing>
                    Mangler oppgave
                </Heading>
                <BodyShort>Dersom du kom hit via Gosys. Prøv igjen.</BodyShort>
            </Alert>
        )
    }

    return (
        <Suspense
            fallback={
                <div>
                    <Skeleton width="70%" height={48} />
                    <div className="mt-8">
                        <Skeleton width="20%" height={24} />
                        <Skeleton width="15%" height={24} />
                    </div>
                    <div className="mt-8">
                        <Skeleton width="20%" height={24} />
                        <Skeleton width="15%" height={24} />
                    </div>
                    <div className="mt-8">
                        <Skeleton width="20%" height={24} />
                        <Skeleton width="15%" height={24} />
                    </div>
                    <div className="mt-8">
                        <Skeleton variant="rectangle" height="600px" />
                    </div>
                </div>
            }
        >
            <Oppgave oppgaveId={searchParams.oppgaveid} />
        </Suspense>
    )
}

async function Oppgave({ oppgaveId }: { oppgaveId: string }) {
    const oppgave = await getOppgave(oppgaveId, getUserToken(await headers()))

    if ('errorType' in oppgave && oppgave.errorType === 'OPPGAVE_NOT_FOUND') {
        notFound()
    }

    if ('errorType' in oppgave) {
        return <ManuellOppgaveErrors errors={oppgave} />
    }

    return <MainContent manuellOppgave={oppgave} />
}

export default Page
