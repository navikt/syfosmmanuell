import * as React from 'react';
import { ValidationResult } from '../types/ValidationResultTypes';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';

const ArsakVisning: React.FC<{ arsaker: ValidationResult}> = ({arsaker}) => {
    return (
        <div className="arsaker">
            <Element>Årsak til manuell vurdering</Element>
            <ul className="liste arsak">
                {
                    arsaker.ruleHits.map( (arsak, index) => {
                        return (
                            <li key={index} className="liste__element arsak__element">
                                {<Normaltekst>{arsak.ruleName}</Normaltekst>}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
} 

export default ArsakVisning;