import React, { ReactElement } from 'react'
import dayjs from 'dayjs'
import { BodyShort, Heading } from '@navikt/ds-react'

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
            <Heading size="large" spacing>
                Manuell vurdering av tilbakedatert sykmelding
            </Heading>

            <div className="my-8">
                <Heading size="xsmall" level="2">
                    Fødselsnummer:
                </Heading>
                <BodyShort>{personNrPasient}</BodyShort>
            </div>

            <div className="my-8">
                {arbeidsgiverNavn && (
                    <div className="flex">
                        <Heading size="xsmall" level="2">
                            Arbeidsgiver:
                        </Heading>
                        <BodyShort className="ml-1">{arbeidsgiverNavn}</BodyShort>
                    </div>
                )}
                {sykmelder && (
                    <div className="flex">
                        <Heading size="xsmall" level="2">
                            Sykmelder:
                        </Heading>
                        <BodyShort className="ml-1">{sykmelder}</BodyShort>
                    </div>
                )}
            </div>

            <div className="my-8">
                <Heading size="xsmall" level="2">
                    Datoen NAV mottok sykmeldingen:
                </Heading>
                <BodyShort>{dayjs(mottattDato).format('DD.MM.YYYY kl. HH:mm:ss')}</BodyShort>
            </div>
        </div>
    )
}

export default Sykmeldingheader
