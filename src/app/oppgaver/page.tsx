import React, { ReactElement, Suspense } from 'react'
import { headers } from 'next/headers'

import { getUlosteOppgaver } from '../../services/oppgaveService'
import { getUserToken } from '../../auth/authentication'
import { Skeleton } from '../../components/ds/rsc'
import Oppgaver from '../../components/oppgaver/Oppgaver'
import ManuellOppgaveErrors from '../../components/ManuellOppgaveErrors'

function Page(): ReactElement {
    return (
        <Suspense
            fallback={
                <div className="flex flex-col gap-4">
                    {Array.from(Array(10).keys()).map((i) => (
                        <Skeleton key={i} variant="rounded" height="200px" />
                    ))}
                </div>
            }
        >
            <UlosteOppgaver />
        </Suspense>
    )
}

async function UlosteOppgaver(): Promise<ReactElement> {
    const ulosteOppgaver = await getUlosteOppgaver(getUserToken(headers()))

    if ('errorType' in ulosteOppgaver) {
        return <ManuellOppgaveErrors errors={ulosteOppgaver} />
    }

    return <Oppgaver oppgaver={ulosteOppgaver} />
}

export default Page
