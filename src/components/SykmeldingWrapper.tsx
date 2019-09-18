import * as React from 'react';
import { useEffect } from 'react';
import useFetchSykmelding from '../hooks/useFetchSykmelding';
import NavFrontendSpinner from 'nav-frontend-spinner';
import SykmeldingVisning from './SykmeldingVisning';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Undertittel } from 'nav-frontend-typografi';
import './SykmeldingWrapper.less'
import Knapper from './Knapper';
import ArsakVisning from './ArsakVisning';



const SykmeldingWrapper = () => {
    const { arsaker, sykmelding, error, isLoading, callFetch } = useFetchSykmelding();
    
    const handterAvgjorelse = (erGodkjent: boolean) => {
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
            {!isLoading &&
                <div className="ekspanderbartpanel-konteiner">
                <EkspanderbartpanelBase heading={
                    <div className="ekspanderbartpanel">
                        <img src="src/img/report-problem-circle.svg" alt="Alert image" className="ekspanderbartpanel__ikon"/>
                        <Undertittel>En sykmelding må vurderes manuelt</Undertittel>
                    </div>
                }>
                    <ArsakVisning arsaker={arsaker}/>
                    <SykmeldingVisning sykmelding={sykmelding}/>
                    <Knapper begrunnelse={"RuleNames.TILBAKEDATERT_MED_BEGRUNNELSE_FORSTE_SYKMELDING"} handterAvgjorelse={handterAvgjorelse} handterAvbryt={handterAvbryt}/>
                </EkspanderbartpanelBase>
                </div>  
            }
        </>
    ) 
}

export default SykmeldingWrapper;