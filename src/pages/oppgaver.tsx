import React, { ReactElement, useState } from 'react'
import { GetServerSidePropsResult } from 'next'
import { Button, Heading, LinkPanel } from '@navikt/ds-react'
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
                        <LinkPanel
                            as={Link}
                            key={oppgave.oppgaveId}
                            href={`/?oppgaveid=${oppgave.oppgaveId}`}
                            className="w-[600px]"
                        >
                            <LinkPanel.Title>
                                {oppgave.oppgaveId}: {tilLesbarDatoMedArstall(oppgave.mottattDato)}
                            </LinkPanel.Title>
                            <LinkPanel.Description>
                                {daysBetweenDates(oppgave.mottattDato, new Date().toISOString())} dager siden mottatt
                            </LinkPanel.Description>
                        </LinkPanel>
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
