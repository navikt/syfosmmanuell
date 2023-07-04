import React from 'react'

import SeksjonMedTittel from '../layout/SeksjonMedTittel'
import Margin from '../layout/Margin'
import ElementMedTekst from '../layout/ElementMedTekst'
import { SporsmalSvar, UtdypendeOpplysninger as UtdypendeOpplysningerType } from '../../../types/sykmelding'

interface OpplysningsGruppeProps {
    opplysningGruppe: Record<string, SporsmalSvar>
}

const OpplysningsGruppe = ({ opplysningGruppe }: OpplysningsGruppeProps) => {
    const sporsmal = Object.entries(opplysningGruppe).map(([key, sporsmalSvar]) => (
        <ElementMedTekst key={key} tittel={`${key}. ${sporsmalSvar.sporsmal}`} tekst={sporsmalSvar.svar} margin />
    ))
    return <>{sporsmal}</>
}

interface UtdypendeOpplysningerProps {
    opplysninger: UtdypendeOpplysningerType
}

const UtdypendeOpplysninger = ({ opplysninger }: UtdypendeOpplysningerProps) => {
    if (Object.keys(opplysninger).length === 0) {
        return null
    }

    const opplysningGrupper = Object.entries(opplysninger).map(([key, opplysningGruppe]) => (
        <Margin key={key}>
            <OpplysningsGruppe opplysningGruppe={opplysningGruppe} />
        </Margin>
    ))

    return (
        <SeksjonMedTittel understrek tittel="6. Utdypende opplysninger">
            {opplysningGrupper}
        </SeksjonMedTittel>
    )
}

export default UtdypendeOpplysninger
