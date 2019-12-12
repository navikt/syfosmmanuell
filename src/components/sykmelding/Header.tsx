import * as React from 'react';
import { RuleNames } from '../../types/ValidationresultTypes';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { Sykmelding } from '../../types/SykmeldingTypes';

interface HeaderProps {
    aktuellArsak: RuleNames;
    sykmelding: Sykmelding;
}

const Header: React.FC<HeaderProps> = ({ aktuellArsak, sykmelding }: HeaderProps) => {
    return (
        <>
            <div className="arsak-visning">
                <Element>Årsak til manuell behandling</Element>
                <Normaltekst>{aktuellArsak}.</Normaltekst>
            </div>
            <div className="arbeidsgiver-sykmelder">
                <Element>
                    Arbeidsgiver:{' '}
                    {!!sykmelding.arbeidsgiver.navn ? sykmelding.arbeidsgiver.navn : <em>ikke spesifisert</em>}
                </Element>
                <Element>Sykmelder: {sykmelding.navnFastlege}</Element>
            </div>
        </>
    );
};

export default Header;
