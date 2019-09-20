import * as React from 'react';
import { ValidationResult } from '../types/ValidationResultTypes';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import './ArsakVisning.less';

const ArsakVisning: React.FC<{ arsaker: ValidationResult}> = ({arsaker}) => {
    return (
        <div className="arsaker">
            <Element>
                {arsaker.ruleHits.length > 1 ? "Årsaker": "Årsak"} til manuell vurdering
            </Element>
            <ul className="liste arsak-liste">
                {
                    arsaker.ruleHits.map( (arsak, index) => {
                        return (
                            <li key={index} className="liste__element arsak-liste__element">
                                {<Normaltekst>{arsak.ruleName}.</Normaltekst>}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
} 

export default ArsakVisning;