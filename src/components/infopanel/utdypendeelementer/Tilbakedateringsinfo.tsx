import React, { ReactElement } from 'react'

import ElementMedTekst from '../layout/ElementMedTekst'
import { tilLesbarDatoMedArstall, daysBetweenDates, getSykmeldingStartDate } from '../../../utils/datoUtils'
import { Periode } from '../../../types/sykmelding'

interface TilbakedateringsinfoProps {
    perioder: Periode[]
    behandletTidspunkt: string
    kontaktDato: string | null
    begrunnelseIkkeKontakt: string | null
    genereringsDato: string
}

function Tilbakedateringsinfo({
    perioder,
    kontaktDato,
    behandletTidspunkt,
    begrunnelseIkkeKontakt,
    genereringsDato,
}: TilbakedateringsinfoProps): ReactElement {
    const fom = getSykmeldingStartDate(perioder)
    const tilbakedatertDuration = daysBetweenDates(fom, genereringsDato)

    return (
        <div className="bg-surface-warning-subtle p-8">
            <div className="mb-8 border-b border-border-divider pb-8">
                <ElementMedTekst
                    vis={!!kontaktDato}
                    tittel="11.1 Dato for dokumenterbar kontakt med pasienten"
                    tekst={tilLesbarDatoMedArstall(kontaktDato)}
                    margin
                    headingLevel="3"
                />
                <ElementMedTekst
                    vis={!!begrunnelseIkkeKontakt}
                    tittel="11.2 Begrunnelse for tilbakedateringen"
                    tekst={begrunnelseIkkeKontakt}
                    headingLevel="3"
                />
            </div>
            <ElementMedTekst
                tittel="12.1 Dato pasienten oppsøkte behandleren"
                tekst={tilLesbarDatoMedArstall(behandletTidspunkt)}
                margin
                headingLevel="3"
            />
            <ElementMedTekst
                tittel="Startdato for sykmeldingen (første fom. i perioden)"
                tekst={`${tilLesbarDatoMedArstall(fom)}`}
                margin
                headingLevel="3"
            />
            <ElementMedTekst
                tittel="Dato sykmeldingen ble generert"
                tekst={tilLesbarDatoMedArstall(genereringsDato)}
                margin
                headingLevel="3"
            />
            {tilbakedatertDuration && (
                <ElementMedTekst
                    vis
                    tittel="Antall dager tilbakedatert"
                    tekst={`${tilbakedatertDuration} dag${tilbakedatertDuration > 1 ? 'er' : ''}`}
                    margin
                    headingLevel="3"
                />
            )}
        </div>
    )
}

export default Tilbakedateringsinfo
