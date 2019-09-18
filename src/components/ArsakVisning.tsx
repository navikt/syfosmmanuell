import * as React from 'react';
import { ValidationResult } from '../types/ValidationResultTypes';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';

const ArsakVisning: React.FC<{ begrunnelser: ValidationResult}> = ({begrunnelser}) => {
    return (
        <div className="sykmelding-header__begrunnelse">
            <Element>Årsak til manuell vurdering</Element>
            <Normaltekst>{begrunnelser.ruleHits[0].ruleName}</Normaltekst>
        </div>
    )
} 

export default ArsakVisning;