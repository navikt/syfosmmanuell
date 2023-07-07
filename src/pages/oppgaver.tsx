import React, { ReactElement, useState } from 'react'
import { GetServerSidePropsResult } from 'next'
import { Button, Heading, LinkPanel, Tag } from '@navikt/ds-react'
import Link from 'next/link'

import { withAuthenticatedPage } from '../auth/withAuth'
import { getModiaContext } from '../services/modiaService'
import { getUlosteOppgaver, UlosteOppgaverFetchingError } from '../services/oppgaveService'
import { UlostOppgave } from '../types/ulost-oppgave'
import ManuellOppgaveErrors from '../components/ManuellOppgaveErrors'
import { daysBetweenDates, tilLesbarDatoMedArstall } from '../utils/datoUtils'

import { BasePageRequiredProps } from './_app'

type OppgaveProps = BasePageRequiredProps & {
    oppgaver: UlostOppgave[] | UlosteOppgaverFetchingError
}

function Oppgaver({ oppgaver }: OppgaveProps): ReactElement {
    const [showRest, setShowRest] = useState(false)

    if ('errorType' in oppgaver) {
        return <ManuellOppgaveErrors errors={oppgaver} />
    }

    return (
        <div className="max-w-[50rem] bg-white p-8">
            <Heading size="large" spacing>
                Uløste oppgaver ({oppgaver.length})
            </Heading>
            <div className="flex w-full flex-col gap-3">
                {oppgaver
                    .slice(0, showRest ? oppgaver.length : 100)
                    .sort((a, b) => a.mottattDato.localeCompare(b.mottattDato))
                    .map((oppgave) => (
                        <OppgaveLinkPanel key={oppgave.oppgaveId} oppgave={oppgave} />
                    ))}
            </div>
            {!showRest && oppgaver.length > 100 ? (
                <div className="flex justify-center p-4">
                    <Button variant="secondary-neutral" onClick={() => setShowRest(true)}>
                        Vis alle oppgavene
                    </Button>
                </div>
            ) : null}
        </div>
    )
}

function OppgaveLinkPanel({ oppgave }: { oppgave: UlostOppgave }) {
    const diffInDays = daysBetweenDates(oppgave.mottattDato, new Date().toISOString())

    return (
        <LinkPanel
            as={Link}
            key={oppgave.oppgaveId}
            href={`/?oppgaveid=${oppgave.oppgaveId}`}
            className="w-[600px] [&>div]:w-full"
        >
            <div className="flex items-center justify-between">
                <div className="w-full">
                    <LinkPanel.Title>
                        {oppgave.oppgaveId}: {tilLesbarDatoMedArstall(oppgave.mottattDato)}
                    </LinkPanel.Title>
                    <LinkPanel.Description className="flex w-full justify-between">
                        {diffInDays > 0 ? <div>Mottatt for {diffInDays} dager siden</div> : <div>Mottatt i dag</div>}
                    </LinkPanel.Description>
                </div>
                <div className="shrink-0">
                    <UlostOppgaveTag oppgave={oppgave} />
                </div>
            </div>
        </LinkPanel>
    )
}

function UlostOppgaveTag({ oppgave }: { oppgave: UlostOppgave }) {
    // TODO: oppgave.status av noe slag
    switch ('todo') {
        // case 'EN STATUS':
        //     return <Tag variant="info">Tag forklaring</Tag>
        default:
            return null
    }
}

export const getServerSideProps = withAuthenticatedPage(
    async (context, accessToken): Promise<GetServerSidePropsResult<OppgaveProps>> => {
        const [modiaContext, oppgaver] = await Promise.all([
            getModiaContext(accessToken),
            getUlosteOppgaver(accessToken),
        ])

        return {
            props: {
                modiaContext,
                oppgaver,
            },
        }
    },
)

export default Oppgaver
