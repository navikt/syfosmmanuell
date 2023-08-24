'use client'

import React, { useCallback, useContext, useState, useTransition } from 'react'
import { logger } from '@navikt/next-logger'
import { Alert, BodyShort, Button } from '@navikt/ds-react'
import { useRouter } from 'next/navigation'

import { ManuellOppgave } from '../types/manuellOppgave'
import { StoreContext } from '../data/store'

import Sykmeldingheader from './sykmelding/SykmeldingHeader'
import HeleSykmeldingen from './sykmelding/sykmeldingvarianter/HeleSykmeldingen'
import TilbakedatertForlengelse from './sykmelding/sykmeldingvarianter/TilbakedatertForlengelse'
import Form, { FormShape } from './form/Form'
import { submitOppgaveAction } from './submit-oppgave-action'

interface MainContentProps {
    manuellOppgave: ManuellOppgave
}

const MainContent = ({ manuellOppgave: { oppgaveid, sykmelding, personNrPasient, mottattDato } }: MainContentProps) => {
    const router = useRouter()
    const { aktivEnhet } = useContext(StoreContext)
    const [visHeleSykmeldingen, setVisHeleSykmeldingen] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [isPending, startTransition] = useTransition()
    const handleSubmit = useCallback(
        async (formState: FormShape) => {
            if (!aktivEnhet) {
                setError('Mangler valgt enhet')
                return
            }

            startTransition(async () => {
                try {
                    await submitOppgaveAction(oppgaveid, aktivEnhet, formState)
                } catch (e) {
                    logger.error(new Error('Vurdering av oppgave feilet', { cause: e }))
                    setError('Kunne ikke vurdere oppgave. Prøv igjen senere.')
                }
            })
        },
        [aktivEnhet, oppgaveid, router],
    )

    return (
        <div>
            <Sykmeldingheader
                arbeidsgiverNavn={sykmelding.arbeidsgiver.navn}
                sykmelder={sykmelding.navnFastlege}
                mottattDato={mottattDato}
                personNrPasient={personNrPasient}
            />
            <TilbakedatertForlengelse sykmelding={sykmelding} />
            <Form onSubmit={handleSubmit} submitting={isPending} />
            {error && (
                <Alert variant="error" className="mb-8">
                    <BodyShort>{error}</BodyShort>
                </Alert>
            )}
            <div className="mb-4 flex justify-center">
                <Button size="small" variant="tertiary" onClick={() => setVisHeleSykmeldingen(!visHeleSykmeldingen)}>
                    {visHeleSykmeldingen ? 'Skjul hele sykmeldingen' : 'Vis hele sykmeldingen'}
                </Button>
            </div>
            {visHeleSykmeldingen && (
                <HeleSykmeldingen sykmelding={sykmelding} setVisHeleSykmeldingen={setVisHeleSykmeldingen} />
            )}
        </div>
    )
}

export default MainContent
