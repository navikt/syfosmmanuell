import * as React from 'react';
import { useState, useEffect } from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Undertittel } from 'nav-frontend-typografi';
import { useAppStore } from '../store/AppStore';
import FlereArsakerVisning from './FlereArsakerVisning';
import EnArsakVisning from './EnArsakVisning';
import './EkspanderbartPanel.less';
import Spinner from 'nav-frontend-spinner';

const reportProblemCircle = require('../img/report-problem-circle.svg');

const EkspanderbartPanel: React.FC = () => {
    const [progresjon, setProgresjon] = useState<number | null>(null);
    const { manOppgaver, aktuellManOppgave, setAktuellManOppgave, isLoading, error } = useAppStore();

    useEffect(() => {
        setProgresjon(manOppgaver.filter(oppgave => oppgave.validationResult.antallBehandlet != 0).length + 1);
    }, [manOppgaver]);

    useEffect(() => {
        if (progresjon - 1 == manOppgaver.length) {
            setAktuellManOppgave(null);
        }
    }, [progresjon]);

    if (error) {
        return <p>Det har oppstått en feil</p>;
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            {aktuellManOppgave && (
                <div className="ekspanderbartpanel">
                    <EkspanderbartpanelBase
                        heading={
                            <div className="ekspanderbartpanel__header">
                                <img src={reportProblemCircle} alt="Varselikon" className="ekspanderbartpanel__ikon" />
                                <Undertittel>
                                    Sykmelding {progresjon} av {manOppgaver.length}
                                </Undertittel>
                            </div>
                        }
                    >
                        {aktuellManOppgave.validationResult.ruleHits.length > 1 ? (
                            <FlereArsakerVisning />
                        ) : (
                            <EnArsakVisning />
                        )}
                    </EkspanderbartpanelBase>
                </div>
            )}
        </>
    );
};

export default EkspanderbartPanel;
