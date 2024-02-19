import React from 'react'
import { BodyLong, ExpansionCard, Heading } from '@navikt/ds-react'

import { Merknad } from './Form'

const BeskjedTilPasient: Record<Merknad, string> = {
    UGYLDIG_TILBAKEDATERING:
        'Vanligvis starter sykmeldingen den datoen du er hos behandleren. I enkelte tilfeller kan datoen i sykmeldingen settes tilbake i tid, det vi kaller tilbakedatering. NAV vurderer om det er en gyldig grunn for tilbakedateringen.\n\nSykmeldingen din startet før du oppsøkte behandleren, og det er ikke oppgitt noen gyldig grunn. Derfor vil du ikke få sykepenger for disse dagene.\n\nDu kan likevel sende inn sykmeldingen. Når perioden er over, sender du søknaden om sykepenger. Når søknaden er behandlet, vil du få en begrunnelse for hvorfor du ikke kan få sykepenger for de tilbakedaterte dagene, og du får samtidig mulighet til å klage.',
    TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER:
        'Sykmeldingen din starter tidligere enn den dagen du var hos behandleren. Vi innhenter opplysninger om hvorfor sykmeldingen er tilbakedatert.\n\nDu kan likevel sende inn søknaden om sykepenger.',
    DELVIS_GODKJENT: 'TODO',
}

interface InfoTilBehandlerOgPasientProps {
    type?: Merknad
}

const InfoTilBehandlerOgPasient = ({ type }: InfoTilBehandlerOgPasientProps) => {
    if (type === undefined) {
        return null
    }

    return (
        <ExpansionCard aria-labelledby="hva-vi-sier-til-pasienten" size="small">
            <ExpansionCard.Header>
                <ExpansionCard.Title id="hva-vi-sier-til-pasienten">Se hva vi sier til pasienten</ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <Heading size="small" level="4" spacing>
                    Beskjed til pasienten
                </Heading>
                <BodyLong>{BeskjedTilPasient[type]}</BodyLong>
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}

export default InfoTilBehandlerOgPasient
