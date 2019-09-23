import * as React from 'react';
import { useEffect } from 'react';
import useFetchSykmelding from './hooks/useFetchSykmelding';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Undertittel } from 'nav-frontend-typografi';
import { ValidationResult } from './types/ValidationResultTypes';
import ArsakBehandling from './components/ArsakBehandling';
import './App.less';

const App = () => {
    const { arsaker, sykmelding, error, isLoading, callFetch } = useFetchSykmelding();

    const handterAvgjorelse = ( arsaker: ValidationResult, erGodkjent: boolean) => {
        // set arsakErVurdert til true/false

        console.log("Avgjørelse håndteres i wrapper: " + erGodkjent);
    }

    const handterAvbryt = () => {
        console.log("Avbryt håndteres i wrapper ")
    }

    useEffect( () => {
        callFetch('src/mock/sykmeld.json');
    }, []);
    
    return (
        <>
            {isLoading && <div className="spinner"><NavFrontendSpinner/></div>}
            {!isLoading && arsaker &&
                <div className="ekspanderbartpanel">
                <EkspanderbartpanelBase heading={
                    <div className="ekspanderbartpanel__header">
                        <img src="src/img/report-problem-circle.svg" alt="Alert image" className="ekspanderbartpanel__ikon"/>
                        <Undertittel>En sykmelding må vurderes manuelt</Undertittel>
                    </div>
                }>
                    <ArsakBehandling arsaker={arsaker} sykmelding={sykmelding} handterFerdigstill={handterAvgjorelse} handterAvbryt={handterAvbryt} />
                </EkspanderbartpanelBase>
                </div>
            }
        </>
    ) 
}

export default App;