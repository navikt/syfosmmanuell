import * as React from 'react';
import { useState, useEffect } from 'react';
import { Radio } from 'nav-frontend-skjema';
import { Knapp, Flatknapp } from 'nav-frontend-knapper';
import { begrunnelsestekster } from '../types/begrunnelser';
import './GodkjenningsKnapper.less'

const GodkjenningsKnapper: React.FC<{ begrunnelse: string, handterAvgjorelse(valg: boolean): void, handterAvbryt(): void }> = ({begrunnelse, handterAvgjorelse, handterAvbryt}) => {
    const begrunnelsestekst = begrunnelsestekster[begrunnelse];
    const [erGodkjent, setErGodkjent] = useState<boolean | null>(null);
    const [kanSendeInn, setKanSendeInn] = useState<boolean>(false);

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
            handterAvgjorelse(erGodkjent);
        }
    }

    return(
        <>
            <div onChange={event => radioEndring(event)} className="radio">
                <Radio value="godkjenn" label={'Godkjenn ' + begrunnelsestekst} name="godkjenn-avvis-radioknapper" className="radio__godkjenn"/>
                <Radio value="avvis" label={'Avvis ' + begrunnelsestekst} name="godkjenn-avvis-radioknapper" className="radio__avvis"/>
            </div>
            <div className="innsending">
                {!kanSendeInn && <Knapp disabled htmlType="button" className="innsending__ferdigstill">Ferdigstill</Knapp>}
                {kanSendeInn && <Knapp htmlType="button" onClick={sendAvgjorelseTilParent} className="innsending__ferdigstill">Ferdigstill</Knapp>}
                <Flatknapp onClick={handterAvbryt} className="innsending__avbryt">Avbryt</Flatknapp>
            </div>
        </>
    )
}

export default GodkjenningsKnapper