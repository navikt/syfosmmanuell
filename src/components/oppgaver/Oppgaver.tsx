'use client'

import { ReactElement, useMemo, useState } from 'react'
import { Button, Chips, Heading, LinkPanel, Tag } from '@navikt/ds-react'
import Link from 'next/link'

import { UlostOppgave } from '../../types/ulost-oppgave'
import { daysBetweenDates, tilLesbarDatoMedArstall } from '../../utils/datoUtils'

const OPTIONS = ['ALL', 'APEN', 'FEILREGISTRERT']

function getFilterText(status: string | null | undefined): string {
    switch (status) {
        case 'FEILREGISTRERT':
            return 'Feilregistrert'
        case 'APEN':
            return 'Åpen'
        case 'ALL':
            return 'Alle'
        case null:
        case undefined:
        default:
            return ''
    }
}

interface Props {
    oppgaver: UlostOppgave[]
}

export function Oppgaver({ oppgaver }: Props): ReactElement {
    const [showRest, setShowRest] = useState(false)
    const [statusFilter, setStatusFilter] = useState('FEILREGISTRERT')
    const options = OPTIONS

    const filteredOppgaver = useMemo(() => {
        if (statusFilter === 'ALL') return oppgaver

        return oppgaver.filter((oppgave) => oppgave.status === statusFilter)
    }, [oppgaver, statusFilter])

    return (
        <div className="max-w-[50rem] bg-white p-8">
            <Heading size="large" spacing>
                Uløste oppgaver ({filteredOppgaver.length})
            </Heading>
            <div className="max-w-[50rem] bg-white p-4">
                <Chips>
                    {options.map((c) => (
                        <Chips.Toggle
                            selected={c === statusFilter}
                            checkmark={false}
                            key={c}
                            onClick={() => setStatusFilter(c)}
                        >
                            {getFilterText(c)}
                        </Chips.Toggle>
                    ))}
                </Chips>
            </div>
            <div className="flex w-full flex-col gap-3">
                {filteredOppgaver
                    .slice(0, showRest ? filteredOppgaver.length : 100)
                    .sort((a, b) => a.mottattDato.localeCompare(b.mottattDato))
                    .map((oppgave) => (
                        <OppgaveLinkPanel key={oppgave.oppgaveId} oppgave={oppgave} />
                    ))}
            </div>
            {!showRest && filteredOppgaver.length > 100 ? (
                <div className="flex justify-center p-4">
                    <Button variant="secondary-neutral" onClick={() => setShowRest(true)}>
                        Vis alle oppgavene
                    </Button>
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

function OppgaveLinkPanel({ oppgave }: { oppgave: UlostOppgave }) {
    const currentDate = new Date().toISOString()
    const diffInDays = daysBetweenDates(oppgave.mottattDato, currentDate)

    return (
        <LinkPanel
            as={Link}
            key={oppgave.oppgaveId}
            href={`/?oppgaveid=${oppgave.oppgaveId}`}
            className="w-[600px] [&>div]:w-full"
            prefetch={false}
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
    const statusText = getFilterText(oppgave.status)
    switch (oppgave.status) {
        case 'FEILREGISTRERT':
            return <Tag variant="error">{statusText}</Tag>
        case 'APEN':
            return <Tag variant="info">{statusText}</Tag>
        default:
            return <></>
    }
}

export default Oppgaver
