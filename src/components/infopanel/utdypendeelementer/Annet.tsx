import React from 'react'

import SeksjonMedTittel from '../layout/SeksjonMedTittel'
import ElementMedTekst from '../layout/ElementMedTekst'

interface AnnetProps {
    behandlerTelefon: string | null
}

const Annet = ({ behandlerTelefon }: AnnetProps) => {
    if (!behandlerTelefon) {
        return null
    }

    return (
        <SeksjonMedTittel tittel="Annet">
            <ElementMedTekst
                vis={!!behandlerTelefon}
                margin
                tittel="Telefon til lege/sykmelder"
                tekst={behandlerTelefon}
            />
        </SeksjonMedTittel>
    )
}

export default Annet
