import * as React from 'react';
import { Sykmelding } from '../types/sykmeldingTypes';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';
import './Sykmelding.less';

const SMTilbakedatert: React.FC<{ sykmelding: Sykmelding}> = ({sykmelding}) => (
    <ul className="sm-konteiner">
        <li className="sm-konteiner__sm-tittel sm-konteiner--style-type-none">
            <Undertittel>Sykmelding</Undertittel>
        </li>
        <li className="sm-konteiner__sm-element sm-konteiner--style-type-none">
            <Element>ID</Element>
            <Normaltekst>{sykmelding.id}</Normaltekst>
        </li>
        <li className="sm-konteiner__sm-element sm-konteiner--style-type-none">
            <Element>Message ID</Element>
            <Normaltekst>{sykmelding.msgId}</Normaltekst>
        </li>
    </ul>
)


export default SMTilbakedatert;
