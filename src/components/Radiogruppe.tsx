import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Radio } from 'nav-frontend-skjema';
import { Knapp, Flatknapp } from 'nav-frontend-knapper';
import { RuleNames } from '../types/ValidationresultTypes';
import { useAppStore } from '../store/AppStore';
import './Radiogruppe.less';

export enum KnappeTekst {
    FERDIGSTILL = 'Ferdigstill',
    LAGRE = 'Lagre',
}

interface RadiogruppeProps {
    radioNavn: string;
}

const Radiogruppe: React.FC<RadiogruppeProps> = ({ radioNavn }: RadiogruppeProps) => {
    const [begrunnelseTekst, setBegrunnelseTekst] = useState<string>('');
    const [knappeTekst, setKnappeTekst] = useState<string>('');
    const [erGodkjent, setErGodkjent] = useState<boolean | null>(null);
    const [kanSendeInn, setKanSendeInn] = useState<boolean>(false);

    const { aktuellArsak, setAktuellArsak, aktuellManOppgave, oppdaterVurdering, setError } = useAppStore();

    useEffect(() => {
        switch (aktuellArsak) {
            case RuleNames.TILBAKEDATERT_MED_BEGRUNNELSE_FORSTE_SYKMELDING: {
                setBegrunnelseTekst('tilbakedatering med begrunnelse');
                break;
            }
            case RuleNames.TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE: {
                setBegrunnelseTekst('tilbakedatering');
                break;
            }
            case RuleNames.BEHANDLER_KI_FT_MT_BENYTTER_ANNEN_DIAGNOSEKODE_ENN_L: {
                setBegrunnelseTekst('knytning til muskel- og skjelettlidelser');
                break;
            }
            case RuleNames.AVVENTENDE_SYKMELDING_KOMBINERT: {
                setBegrunnelseTekst('avventende sykmelding med flere perioder');
                break;
            }
        }

        aktuellManOppgave.validationResult.ruleHits.length > 1
            ? setKnappeTekst(KnappeTekst.LAGRE)
            : setKnappeTekst(KnappeTekst.FERDIGSTILL);
    }, []);

    const radioEndring = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.value == 'godkjenn') {
            setErGodkjent(() => true);
            setKanSendeInn(() => true);
        } else if (event.target.value == 'avvis') {
            setErGodkjent(() => false);
            setKanSendeInn(() => true);
        }
    };

    const handterAvgjorelse = (): void => {
        if (kanSendeInn) {
            oppdaterVurdering(erGodkjent);
        }
    };

    const handterAvbryt = (): void => {
        if (aktuellManOppgave.validationResult.ruleHits.length > 1) {
            setAktuellArsak(null);
        } else {
            setError(new Error('Du har avbrutt oppgaven. Last inn siden på nytt for å gjenoppprette oppgaven'));
        }
    };

    return (
        <>
            <div className="radio">
                <Radio
                    value="godkjenn"
                    label={'Godkjenn ' + begrunnelseTekst}
                    name={radioNavn}
                    onChange={radioEndring}
                    checked={erGodkjent === true}
                />
                <Radio
                    value="avvis"
                    label={'Avvis ' + begrunnelseTekst}
                    name={radioNavn}
                    onChange={radioEndring}
                    checked={erGodkjent === false}
                />
            </div>
            <div className="innsending">
                {!kanSendeInn && (
                    <Knapp disabled htmlType="button" className="innsending__ferdigstill">
                        {knappeTekst}
                    </Knapp>
                )}
                {kanSendeInn && (
                    <Knapp htmlType="button" onClick={handterAvgjorelse} className="innsending__ferdigstill">
                        {knappeTekst}
                    </Knapp>
                )}
                <Flatknapp onClick={handterAvbryt} className="innsending__avbryt">
                    Avbryt
                </Flatknapp>
            </div>
        </>
    );
};

export default Radiogruppe;
