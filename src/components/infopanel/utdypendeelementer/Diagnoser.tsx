import React, { ReactElement } from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'

import { AnnenFraverGrunnValues, MedisinskVurdering } from '../../../types/sykmelding'
import { tilLesbarDatoMedArstall } from '../../../utils/datoUtils'
import ElementMedTekst from '../layout/ElementMedTekst'
import EnkelCheckbox from '../layout/EnkelCheckbox'
import Margin from '../layout/Margin'
import SeksjonMedTittel from '../layout/SeksjonMedTittel'
import DiagnoseSeksjon from '../panelelementer/diagnose/DiagnoseSeksjon'

interface DiagnoserProps {
    medisinskVurdering: MedisinskVurdering
    skjermesForPasient: boolean
}

function Diagnoser({ medisinskVurdering, skjermesForPasient }: DiagnoserProps): ReactElement {
    return (
        <SeksjonMedTittel tittel="3. Diagnose">
            {medisinskVurdering.hovedDiagnose && (
                <DiagnoseSeksjon diagnose={medisinskVurdering.hovedDiagnose} withPrefix />
            )}
            {medisinskVurdering.biDiagnoser.map((diagnose, index) => (
                <DiagnoseSeksjon key={index} diagnose={diagnose} bidiagnose withPrefix />
            ))}
            {medisinskVurdering.annenFraversArsak && (
                <>
                    <Margin>
                        <Heading size="xsmall" level="4">
                            3.3.1. Lovfestet fraværsgrunn
                        </Heading>
                        {medisinskVurdering.annenFraversArsak.grunn.map((grunn) => (
                            <BodyShort key={grunn}>- {AnnenFraverGrunnValues[grunn]}</BodyShort>
                        ))}
                    </Margin>
                    <ElementMedTekst
                        vis={!!medisinskVurdering.annenFraversArsak.beskrivelse}
                        tittel="3.3.2 Beskriv fraværsgrunnen"
                        tekst={medisinskVurdering.annenFraversArsak.beskrivelse}
                        margin
                        headingLevel="5"
                    />
                </>
            )}
            <Margin>
                <EnkelCheckbox
                    tittel="3.4. Sykdommen er svangerskapsrelatert"
                    margin
                    checked
                    bold
                    vis={medisinskVurdering.svangerskap}
                />
            </Margin>
            <Margin>
                <EnkelCheckbox
                    tittel="3.5. Sykmeldingen kan skyldes en yrkesskade/yrkessykdom"
                    margin
                    checked
                    bold
                    vis={medisinskVurdering.yrkesskade}
                />
            </Margin>
            <ElementMedTekst
                vis={!!medisinskVurdering.yrkesskadeDato}
                tittel="3.6. Eventuell skadedato"
                tekst={tilLesbarDatoMedArstall(medisinskVurdering.yrkesskadeDato)}
                margin
            />
            <Margin>
                <EnkelCheckbox
                    tittel="3.7. Det er påtrengende nødvendig å skjerme pasienten for medisinske opplysninger"
                    margin
                    checked
                    bold
                    vis={skjermesForPasient}
                />
            </Margin>
        </SeksjonMedTittel>
    )
}

export default Diagnoser
