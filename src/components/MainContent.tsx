import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { logger } from '@navikt/next-logger'
import { Alert, BodyShort, Button } from '@navikt/ds-react'

import { ManuellOppgave } from '../types/manuellOppgave'
import { vurderOppgave } from '../utils/submitUtils'

import Sykmeldingheader from './sykmelding/SykmeldingHeader'
import HeleSykmeldingen from './sykmelding/sykmeldingvarianter/HeleSykmeldingen'
import TilbakedatertForlengelse from './sykmelding/sykmeldingvarianter/TilbakedatertForlengelse'
import Form, { FormShape } from './form/Form'

interface MainContentProps {
    manuellOppgave: ManuellOppgave
    aktivEnhet: string
}

const MainContent = ({ manuellOppgave, aktivEnhet }: MainContentProps) => {
    const router = useRouter()
    const [visHeleSykmeldingen, setVisHeleSykmeldingen] = useState(false)
    const { sykmelding, personNrPasient, mottattDato } = manuellOppgave
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = useCallback(
        async (formState: FormShape) => {
            try {
                setSubmitting(true)
                const vurderingsResultat = await vurderOppgave(manuellOppgave.oppgaveid, aktivEnhet, formState)
                if (vurderingsResultat == 'ok') {
                    await router.push('/kvittering')
                } else {
                    setError(vurderingsResultat.message)
                    setSubmitting(false)
                }
            } catch (e) {
                logger.error(e)
                setSubmitting(false)
                setError('Ukjent feil')
            }
        },
        [aktivEnhet, manuellOppgave.oppgaveid, router],
    )

    return (
        <div className="max-w-[50rem] bg-white p-8">
            <Sykmeldingheader
                arbeidsgiverNavn={sykmelding.arbeidsgiver.navn}
                sykmelder={sykmelding.navnFastlege}
                mottattDato={mottattDato}
                personNrPasient={personNrPasient}
            />
            <TilbakedatertForlengelse sykmelding={sykmelding} />
            <Form onSubmit={handleSubmit} submitting={submitting} />
            {error && (
                <Alert variant="error">
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
