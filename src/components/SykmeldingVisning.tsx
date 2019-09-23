import * as React from 'react';
import { Sykmelding } from '../types/sykmeldingTypes';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';
import './SykmeldingVisning.less';
import { ValidationResult } from '../types/ValidationResultTypes';

const SykmeldingVisning: React.FC<{ arsaker: ValidationResult, sykmelding: Sykmelding }> = ({ arsaker, sykmelding}) => (
    <>
        <div className="arsak-visning">
            <Element>Årsak til manuell behandling</Element>
            <Normaltekst>{arsaker.ruleHits[0].ruleName}.</Normaltekst>
        </div>
        <div className="arbeidsgiver-sykmelder">
            <Element>Arbeidsgiver: {sykmelding.arbeidsgiver.navn}</Element>
            <Element>Sykmelder: {sykmelding.navnFastlege}</Element>
        </div>
        <div className="sykmelding">
            <Undertittel className="sykmelding-liste__tittel">Sykmelding</Undertittel>
            <ul className="liste sykmelding-liste">
                <li className="liste__element sykmelding-liste__element">
                    <Element>ID</Element>
                    <Normaltekst>{sykmelding.id}</Normaltekst>
                </li>
                <li className="liste__element sykmelding-liste__element">
                    <Element>Message ID</Element>
                    <Normaltekst>{sykmelding.msgId}</Normaltekst>
                </li>
            </ul>
        </div> 
    </>
)

export default SykmeldingVisning;
