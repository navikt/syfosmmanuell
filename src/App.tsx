import * as React from 'react';
import { useEffect } from 'react';
import useFetchSykmelding from './hooks/useFetchSykmelding';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Undertittel } from 'nav-frontend-typografi';
import { ValidationResult } from './types/ValidationResultTypes';
//import ArsakBehandling from './components/ArsakBehandling';
import './App.less';
import OppgaveBehandling from './components/OppgaveBehandling';

import TestComponent from './components/testComponent';
import createUseContext from 'constate';
import useManOppgBehandling from './hooks/useManOppgBehandling';

import StoreProvider from './store/StoreProvider';
import { DataFetcher } from './components/DataFetcher';

const App: React.FC = () => {
    const spinner = (
        <div className="spinner">
            <NavFrontendSpinner />
        </div>
    );

    const ekspanderbartPanel = (
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
            ></EkspanderbartpanelBase>
        </div>
    );
    //return <>{!isLoading && arsaker ? ekspanderbartPanel : spinner}</>;

    return (
        <StoreProvider>
            <DataFetcher>
                <TestComponent />
            </DataFetcher>
        </StoreProvider>
    );
};

export default App;
