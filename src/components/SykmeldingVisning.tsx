import * as React from 'react';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';
import './SykmeldingVisning.less';
import { useAppStore } from '../store/AppStore';

const SykmeldingVisning: React.FC = () => {
    const { aktuellArsak, aktuellManOppgave } = useAppStore();

    return (
        <>
            <div className="arsak-visning">
                <Element>Årsak til manuell behandling</Element>
                <Normaltekst>{aktuellArsak}.</Normaltekst>
            </div>
            <div className="arbeidsgiver-sykmelder">
                <Element>Arbeidsgiver: {aktuellManOppgave.sykmelding.arbeidsgiver.navn}</Element>
                <Element>Sykmelder: {aktuellManOppgave.sykmelding.navnFastlege}</Element>
            </div>
            <div className="sykmelding">
                <Undertittel className="sykmelding-liste__tittel">Sykmelding</Undertittel>
                <ul className="liste sykmelding-liste">
                    <li className="liste__element sykmelding-liste__element">
                        <Element>ID</Element>
                        <Normaltekst>{aktuellManOppgave.sykmelding.id}</Normaltekst>
                    </li>
                    <li className="liste__element sykmelding-liste__element">
                        <Element>Message ID</Element>
                        <Normaltekst>{aktuellManOppgave.sykmelding.msgId}</Normaltekst>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default SykmeldingVisning;
