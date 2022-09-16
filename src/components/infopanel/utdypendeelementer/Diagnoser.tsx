import { Element, Normaltekst } from 'nav-frontend-typografi';
import React from 'react';

import { AnnenFraverGrunnValues, MedisinskVurdering } from '../../../types/sykmelding';
import { tilLesbarDatoMedArstall } from '../../../utils/datoUtils';
import ElementMedTekst from '../layout/ElementMedTekst';
import EnkelCheckbox from '../layout/EnkelCheckbox';
import Margin from '../layout/Margin';
import SeksjonMedTittel from '../layout/SeksjonMedTittel';
import DiagnoseSeksjon from '../panelelementer/diagnose/DiagnoseSeksjon';

interface DiagnoserProps {
    medisinskVurdering: MedisinskVurdering;
    skjermesForPasient: boolean;
}

const Diagnoser = ({ medisinskVurdering, skjermesForPasient }: DiagnoserProps) => {
    if (!medisinskVurdering) {
        return null;
    }

    return (
        <SeksjonMedTittel understrek tittel="3. Diagnose">
            <DiagnoseSeksjon diagnose={medisinskVurdering.hovedDiagnose} withPrefix />
            {medisinskVurdering.biDiagnoser.map((diagnose, index) => (
                <DiagnoseSeksjon key={index} diagnose={diagnose} bidiagnose withPrefix />
            ))}

            {medisinskVurdering.annenFraversArsak && (
                <>
                    <Margin>
                        <Element>3.3.1. Lovfestet fraværsgrunn</Element>
                        {medisinskVurdering.annenFraversArsak.grunn.map((grunn) => (
                            <Normaltekst key={grunn}>- {AnnenFraverGrunnValues[grunn]}</Normaltekst>
                        ))}
                    </Margin>
                    <ElementMedTekst
                        vis={!!medisinskVurdering.annenFraversArsak.beskrivelse}
                        tittel="3.3.2 Beskriv fraværsgrunnen"
                        tekst={medisinskVurdering.annenFraversArsak.beskrivelse}
                        margin
                    />
                </>
            )}

            <Margin>
                <EnkelCheckbox
                    tittel="3.4. Sykdommen er svangerskapsrelatert"
                    margin
                    checked
                    bold
                    vis={!!medisinskVurdering.svangerskap}
                />
            </Margin>

            <Margin>
                <EnkelCheckbox
                    tittel="3.5. Sykmeldingen kan skyldes en yrkesskade/yrkessykdom"
                    margin
                    checked
                    bold
                    vis={!!medisinskVurdering.yrkesskade}
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
                    vis={!!skjermesForPasient}
                />
            </Margin>
        </SeksjonMedTittel>
    );
};

export default Diagnoser;
