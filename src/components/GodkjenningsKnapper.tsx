import * as React from 'react';
import { Radio } from 'nav-frontend-skjema';
import { Knapp, Flatknapp } from 'nav-frontend-knapper';
import { begrunnelsestekster } from '../types/begrunnelser';
import './GodkjenningsKnapper.less'

const GodkjenningsKnapper: React.FC<{ begrunnelse: string }> = ({begrunnelse}) => {
    const begrunnelsestekst = begrunnelsestekster[begrunnelse];

    return(
        <>
            <div className="radio">
                <Radio label={'Godkjenn ' + begrunnelsestekst} name="minRadioKnapp" className="radio__godkjenn"/>
                <Radio label={'Avvis ' + begrunnelsestekst} name="minRadioKnapp" className="radio__avvis"/>
            </div>
            <div className="innsending">
                <Knapp className="innsending__ferdigstill">Ferdigstill</Knapp>
                <Flatknapp className="innsending__avbryt">Avbryt</Flatknapp>
            </div>  
        </>
    )
}

export default GodkjenningsKnapper