import * as React from 'react';
import { useAppStore } from '../store/AppStore';
import { Normaltekst } from 'nav-frontend-typografi';
import './InfoHeader.less';

import Information from '../img/information.svg';
//import Information from '../img/Information';
// const information = require('../img/information.svg');

const InfoHeader: React.FC = () => {
    const { manOppgaver, aktuellManOppgave } = useAppStore();

    const infoTekst = (): string => {
        return `Det er ${manOppgaver.length} ${
            manOppgaver.length == 1 ? 'sykmelding' : 'sykmeldinger'
        } som må vurderes manuelt.`;
    };

    return (
        <>
            {(!manOppgaver || manOppgaver.length === 0) && (
                <div className="progressjon--ingen-oppgaver">
                    <Normaltekst>
                        Oppgaven(e) er enten løst, eller så finnes det ikke noen oppgave på denne personen.
                    </Normaltekst>
                </div>
            )}
            {aktuellManOppgave && (
                <div className="progresjon">
                    <div className="progresjon__ikon">
                        <Information />
                    </div>
                    <div className="progresjon__tekst">
                        <Normaltekst>{infoTekst()}</Normaltekst>
                    </div>
                </div>
            )}
            {!aktuellManOppgave && <Normaltekst>Alle manuelle oppgaver er løst</Normaltekst>}
        </>
    );
};

export default InfoHeader;
