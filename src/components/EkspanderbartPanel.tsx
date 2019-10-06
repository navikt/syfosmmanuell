import * as React from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Undertittel } from 'nav-frontend-typografi';
import { useAppStore } from '../store/AppStore';
import FlereArsakerVisning from './FlereArsakerVisning';
import EnArsakVisning from './EnArsakVisning';
import Spinner from 'nav-frontend-spinner';
import { useEffect } from 'react';

const EkspanderbartPanel: React.FC = () => {
    const { aktuellManOppgave } = useAppStore();

    useEffect(() => {
        console.log(aktuellManOppgave);
    }, [aktuellManOppgave]);

    return (
        <>
            {!aktuellManOppgave && <Spinner />}
            {aktuellManOppgave && (
                <div className="ekspanderbartpanel">
                    <EkspanderbartpanelBase
                        heading={
                            <div className="ekspanderbartpanel__header">
                                <img
                                    src="src/img/report-problem-circle.svg"
                                    alt="Varselikon"
                                    className="ekspanderbartpanel__ikon"
                                />
                                <Undertittel>En sykmelding må vurderes manuelt</Undertittel>
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
