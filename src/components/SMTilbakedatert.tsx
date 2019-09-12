import * as React from 'react';
import { Sykmelding } from '../types/sykmeldingTypes';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';
import './Sykmelding.less';

const SMTilbakedatert: React.FC<{ sykmelding: Sykmelding}> = ({sykmelding}) => (
    <ul className="sykmelding">
        <li className="sykmelding__tittel liste-element">
            <Undertittel>Sykmelding</Undertittel>
        </li>
        <li className="sykmelding__element liste-element">
            <Element>ID</Element>
            <Normaltekst>{sykmelding.id}</Normaltekst>
        </li>
        <li className="sykmelding__element liste-element">
            <Element>Message ID</Element>
            <Normaltekst>{sykmelding.msgId}</Normaltekst>
        </li>
    </ul>
)


export default SMTilbakedatert;
