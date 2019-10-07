import * as React from 'react';
import { useAppStore } from '../store/AppStore';
import { Normaltekst } from 'nav-frontend-typografi';
import './Progresjon.less';

const Progresjon: React.FC = () => {
    const { manOppgaver } = useAppStore();

    const progresjonstekst = (): string => {
        return `Det er ${manOppgaver.length} ${
            manOppgaver.length == 1 ? 'sykmelding' : 'sykmeldinger'
        } som må vurderes manuelt.`;
    };

    return (
        <div className="progresjon">
            <div className="progresjon__ikon">
                <img src="src/img/information.svg" alt="information icon" />
            </div>
            <div className="progresjon__tekst">
                <Normaltekst>{progresjonstekst()}</Normaltekst>
            </div>
        </div>
    );
};

export default Progresjon;
