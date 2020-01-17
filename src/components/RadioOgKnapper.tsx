import React, { useState } from 'react';
import { RuleNames } from '../types/validationresultTypes';
import { Radio } from 'nav-frontend-skjema';
import { Knapp, Flatknapp } from 'nav-frontend-knapper';

const hentRegelTekst = (regel: RuleNames): string => {
    switch (regel) {
        case 'BEHANDLER_KI_FT_MT_BENYTTER_ANNEN_DIAGNOSEKODE_ENN_L':
            return 'knytning til muskel- og skjelettlidelser';
        case 'TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE':
            return 'tilbakedatering';
        case 'TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE':
            return 'tilbakedatering';
        default:
            return 'ukjent regel';
    }
};

type Knappetekst = 'Ferdigstill' | 'Lagre';

interface RadioOgKnapperProps {
    regel: RuleNames;
    knappetekst: Knappetekst;
    handterAvgjorelse: (avgjorelse: boolean) => void;
    handterAvbryt: () => void;
}

const RadioOgKnapper = ({ regel, knappetekst, handterAvgjorelse, handterAvbryt }: RadioOgKnapperProps) => {
    const [erGodkjent, setErGodkjent] = useState<boolean | undefined>(undefined);
    const REGELTEKST = hentRegelTekst(regel);

    const radioendring = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.value === 'godkjent') {
            setErGodkjent(true);
        } else if (event.target.value === 'avvist') {
            setErGodkjent(false);
        }
    };

    return (
        <div style={{ paddingLeft: '1rem' }}>
            <span style={{ marginBottom: '1rem' }}>
                <Radio
                    label={`Godkjenn ${REGELTEKST}`}
                    name="radiogruppe"
                    value="godkjent"
                    onChange={radioendring}
                    checked={erGodkjent === true}
                />
                <Radio
                    label={`Avvis ${REGELTEKST}`}
                    name="radiogruppe"
                    value="avvist"
                    onChange={radioendring}
                    checked={erGodkjent === false}
                />
            </span>
            <span style={{ display: 'flex' }}>
                <Knapp
                    disabled={erGodkjent === undefined}
                    onClick={() => {
                        if (erGodkjent !== undefined) {
                            handterAvgjorelse(erGodkjent);
                        } else {
                            throw new Error('En regel ble forsøkt vurdert til "undefined"');
                        }
                    }}
                >
                    {knappetekst}
                </Knapp>
                <Flatknapp onClick={handterAvbryt}>Avbryt</Flatknapp>
            </span>
        </div>
    );
};

export default RadioOgKnapper;
