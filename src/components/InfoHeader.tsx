import * as React from 'react';
import { useAppStore } from '../store/AppStore';
import { Normaltekst } from 'nav-frontend-typografi';
import './InfoHeader.less';

import Information from '../img/information.svg';

const InfoHeader: React.FC = () => {
    const { manOppgaver, aktuellManOppgave, oppgaverLoest } = useAppStore();

    const infoTekst = (): string => {
        return `Det er ${manOppgaver.length} ${
            manOppgaver.length == 1 ? 'sykmelding' : 'sykmeldinger'
        } som må vurderes manuelt.`;
    };

    return (
        <>
            {(!!!manOppgaver || manOppgaver.length === 0) && (
                <div className="info-header--ingen-oppgaver">
                    <Normaltekst>
                        Oppgaven(e) er enten løst, eller så finnes det ikke noen oppgave på denne personen.
                    </Normaltekst>
                </div>
            )}
            {!!manOppgaver && !!aktuellManOppgave && (
                <div className="info-header">
                    <div className="info-header__ikon">
                        <Information />
                    </div>
                    <div className="info-header__tekst">
                        <Normaltekst>{infoTekst()}</Normaltekst>
                    </div>
                </div>
            )}
            {!!manOppgaver && !!!aktuellManOppgave && oppgaverLoest === manOppgaver.length && (
                <Normaltekst>Alle manuelle oppgaver er løst</Normaltekst>
            )}
        </>
    );
};

export default InfoHeader;
