import * as React from 'react';
import { useAppStore } from '../store/AppStore';
import { Normaltekst } from 'nav-frontend-typografi';
import './Progresjon.less';

const information = require('../img/information.svg');

const Progresjon: React.FC = () => {
    const { manOppgaver, aktuellManOppgave } = useAppStore();

    const progresjonstekst = (): string => {
        return `Det er ${manOppgaver.length} ${
            manOppgaver.length == 1 ? 'sykmelding' : 'sykmeldinger'
        } som må vurderes manuelt.`;
    };

    return (
        <>
            {aktuellManOppgave && (
                <div className="progresjon">
                    <div className="progresjon__ikon">
                        <img src={information} alt="information icon" />
                    </div>
                    <div className="progresjon__tekst">
                        <Normaltekst>{progresjonstekst()}</Normaltekst>
                    </div>
                </div>
            )}
            {!aktuellManOppgave && <Normaltekst>Alle manuelle oppgaver er løst</Normaltekst>}
        </>
    );
};

export default Progresjon;
