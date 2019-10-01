import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Radio } from 'nav-frontend-skjema';
import { Knapp, Flatknapp } from 'nav-frontend-knapper';
import './Knapper.less';
import { RuleNames } from '../types/ValidationResultTypes';
import { useAppStore } from '../store/AppStore';
import { ManuellOppgave } from '../types/ManuellOppgaveTypes';

export enum KnappeTekst {
    FERDIGSTILL = 'Ferdigstill',
    LAGRE = 'Lagre',
}

const Knapper: React.FC = () => {
    const [begrunnelseTekst, setBegrunnelseTekst] = useState<string>('');
    const [knappeTekst, setKnappeTekst] = useState<string>('');
    const [erGodkjent, setErGodkjent] = useState<boolean | null>(null);
    const [kanSendeInn, setKanSendeInn] = useState<boolean>(false);

    const { aktuellArsak, setAktuellArsak, aktuellManOppgave, setAktuellManOppgave, oppdaterVurdering } = useAppStore();

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
            //const oppgave = new ManuellOppgave(aktuellManOppgave);
            //oppgave.validationResult.behandlet.set(aktuellArsak, erGodkjent);
            //console.log('ValidationResult : ' + oppgave.validationResult.behandlet);
            //setAktuellManOppgave(oppgave);
            //setAktuellArsak(null);
            //console.log('Årsak etter large: ' + aktuellArsak);
        }
    };

    const handterAvbryt = (): void => {
        //dette kommer bare til å fungere for flere årsaker. snakk med solveig om hva som skal skje ved avbrytelse av enårsaksoppgaver.
        if (aktuellManOppgave.validationResult.ruleHits.length > 1) {
            setAktuellArsak(null);
        }
    };

    return (
        <>
            <div className="radio">
                <Radio
                    value="godkjenn"
                    label={'Godkjenn ' + begrunnelseTekst}
                    name="godkjenn-avvis-radioknapper"
                    onChange={radioEndring}
                />
                <Radio
                    value="avvis"
                    label={'Avvis ' + begrunnelseTekst}
                    name="godkjenn-avvis-radioknapper"
                    onChange={radioEndring}
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

export default Knapper;
