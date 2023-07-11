import React, { ReactElement } from 'react'
import dayjs from 'dayjs'
import { BodyShort, Heading, Label } from '@navikt/ds-react'

interface SykmeldingheaderProps {
    arbeidsgiverNavn: string | null
    sykmelder: string | null
    mottattDato: string
    personNrPasient: string
}

function Sykmeldingheader({
    personNrPasient,
    arbeidsgiverNavn,
    sykmelder,
    mottattDato,
}: SykmeldingheaderProps): ReactElement {
    return (
        <div>
            <Heading size="large" level="2" spacing>
                Manuell vurdering av tilbakedatert sykmelding
            </Heading>

            <div className="my-8">
                <Label>Fødselsnummer:</Label>
                <BodyShort> {personNrPasient}</BodyShort>
            </div>

            <div className="my-8">
                {arbeidsgiverNavn && (
                    <BodyShort>
                        <b>Arbeidsgiver:</b> {arbeidsgiverNavn}
                    </BodyShort>
                )}
                {sykmelder && (
                    <BodyShort>
                        <b>Sykmelder:</b> {sykmelder}
                    </BodyShort>
                )}
            </div>

            <div className="my-8">
                <Label>Datoen NAV mottok sykmeldingen:</Label>
                <BodyShort>{dayjs(mottattDato).format('DD.MM.YYYY kl. HH:mm:ss')}</BodyShort>
            </div>
        </div>
    )
}

export default Sykmeldingheader
