import * as React from 'react';
import { ValidationResult } from '../types/ValidationResultTypes';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';

const ArsakVisning: React.FC<{ arsaker: ValidationResult}> = ({arsaker}) => {
    return (
        <div className="arsaker">
            <Element>Årsak til manuell vurdering</Element>
            <Normaltekst>{arsaker.ruleHits[0].ruleName}</Normaltekst>
        </div>
    )
} 

export default ArsakVisning;