import * as React from 'react';
import { Sykmelding } from '../types/sykmeldingTypes';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';
import './SykmeldingVisning.less';

const SykmeldingVisning: React.FC<{ sykmelding: Sykmelding}> = ({sykmelding}) => (
    <>
        <div className="arbeidsgiver-sykmelder">
                <Element>Arbeidsgiver: "placeholder"</Element>
                <Element>Sykmelder: "placeholder"</Element>
        </div>
        <ul className="liste sykmelding">
            <li className="liste__element sykmelding__tittel">
                <Undertittel>Sykmelding</Undertittel>
            </li>
            <li className="liste__element sykmelding__element">
                <Element>ID</Element>
                <Normaltekst>{sykmelding.id}</Normaltekst>
            </li>
            <li className="liste__element sykmelding__element">
                <Element>Message ID</Element>
                <Normaltekst>{sykmelding.msgId}</Normaltekst>
            </li>
        </ul>
    </>
)


export default SykmeldingVisning;
