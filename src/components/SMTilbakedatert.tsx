import * as React from 'react';
import { Sykmelding_t } from '../types/sykmeldingTypes';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';
import './Sykmelding.less';

const SMTilbakedatert: React.FC<{ sykmelding: Sykmelding_t}> = ({sykmelding}) => (
    <ul className="sm-container">
        <li className="sm-container-item">
            <Undertittel>Sykmelding</Undertittel>
        </li>
        <li className="sm-container-item">
            <Element>ID</Element>
            <Normaltekst>{sykmelding.id}</Normaltekst>
        </li>
        <li className="sm-container-item">
            <Element>Message ID</Element>
            <Normaltekst>{sykmelding.msgId}</Normaltekst>
        </li>
    </ul>
)

export default SMTilbakedatert;
