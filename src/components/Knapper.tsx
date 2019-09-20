import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Radio } from 'nav-frontend-skjema';
import { Knapp, Flatknapp } from 'nav-frontend-knapper';
import './Knapper.less'
import { RuleNames } from '../types/ValidationResultTypes';

export enum KnappeTekst {
    FERDIGSTILL = "Ferdigstill",
    LAGRE = "Lagre"
}

const Knapper: React.FC<{ regel: RuleNames, knappeTekst: KnappeTekst, handterAvgjorelse( regel: RuleNames, erGodkjent: boolean): void, handterAvbryt(): void }> = ({regel, knappeTekst, handterAvgjorelse, handterAvbryt}) => {
    const [begrunnelseTekst, setBegrunnelseTekst] = useState<string>("")
    const [erGodkjent, setErGodkjent] = useState<boolean | null>(null);
    const [kanSendeInn, setKanSendeInn] = useState<boolean>(false);

    useEffect( () => {
        switch(regel) {
            case RuleNames.TILBAKEDATERT_MED_BEGRUNNELSE_FORSTE_SYKMELDING: {
                setBegrunnelseTekst( () => { return "tilbakedatering med begrunnelse" })
                break;
            }
            case RuleNames.TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE: {
                setBegrunnelseTekst( () => { return "tilbakedatering" })
                break;
            }
            case RuleNames.BEHANDLER_KI_FT_MT_BENYTTER_ANNEN_DIAGNOSEKODE_ENN_L: {
                setBegrunnelseTekst( () => { return "knytning til muskel- og skjelettlidelser" })
                break;
            }
            case RuleNames.AVVENTENDE_SYKMELDING_KOMBINERT: {
                setBegrunnelseTekst( () => { return "avventende sykmelding med flere perioder" })
                break;
            }
        }
    }, [])

    const radioEndring = (event) => {
        if (event.target.value == "godkjenn") {
            setErGodkjent( () => true);
            setKanSendeInn( () => true);
        } else if (event.target.value == "avvis") {
            setErGodkjent( () => false);
            setKanSendeInn( () => true);
        }
    }

    const sendAvgjorelseTilParent = () => {
        if (kanSendeInn) {
            handterAvgjorelse(regel, erGodkjent);
        }
    }

    return(
        <>
            <div onChange={event => radioEndring(event)} className="radio">
                <Radio value="godkjenn" label={'Godkjenn ' + begrunnelseTekst} name="godkjenn-avvis-radioknapper" className="radio__godkjenn"/>
                <Radio value="avvis" label={'Avvis ' + begrunnelseTekst} name="godkjenn-avvis-radioknapper" className="radio__avvis"/>
            </div>
            <div className="innsending">
                {!kanSendeInn && <Knapp disabled htmlType="button" className="innsending__ferdigstill">{knappeTekst}</Knapp>}
                {kanSendeInn && <Knapp htmlType="button" onClick={sendAvgjorelseTilParent} className="innsending__ferdigstill">{knappeTekst}</Knapp>}
                <Flatknapp onClick={handterAvbryt} className="innsending__avbryt">Avbryt</Flatknapp>
            </div>
        </>
    )
}

export default Knapper