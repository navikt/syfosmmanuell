import React, { ReactElement } from 'react'

import SeksjonMedTittel from '../layout/SeksjonMedTittel'
import ElementMedTekst from '../layout/ElementMedTekst'

interface MeldingTilArbeidsgiverSectionProps {
    meldingTilArbeidsgiver: string
}

function MeldingTilArbeidsgiverSection({ meldingTilArbeidsgiver }: MeldingTilArbeidsgiverSectionProps): ReactElement {
    return (
        <SeksjonMedTittel tittel="9. Melding til arbeidsgiver">
            <ElementMedTekst
                vis={!!meldingTilArbeidsgiver}
                margin
                tittel="9.1. Andre innspill til arbeidsgiveren"
                tekst={meldingTilArbeidsgiver}
            />
        </SeksjonMedTittel>
    )
}

export default MeldingTilArbeidsgiverSection
