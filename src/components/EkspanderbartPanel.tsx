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
import ReportProblemCircle from '../img/report-problem-circle.svg';

const EkspanderbartPanel: React.FC = () => {
    const { manOppgaver, aktuellManOppgave, isLoading, error, oppgaverLoest } = useAppStore();

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
                                <ReportProblemCircle className="ekspanderbartpanel__ikon" />
                                <Undertittel>
                                    Sykmelding {oppgaverLoest + 1} av {manOppgaver.length}
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
