import * as React from 'react';
import { useEffect } from 'react';
import { TILBAKEDATERT_MED_BEGRUNNELSE } from '../types/begrunnelser';
import useFetchSykmelding from '../hooks/useFetchSykmelding';
import NavFrontendSpinner from 'nav-frontend-spinner';
import SMTilbakedatert from './SMTilbakedatert';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';
import './SykmeldingWrapper.less'
import Knapper from './Knapper';


const sykmeldingHeader = data =>  (<>
    <div className="sykmelding-header">
        <div className="sykmelding-header__begrunnelse">
            <Element>Årsak til manuell vurdering</Element>
            <Normaltekst>{data.begrunnelse}</Normaltekst>
        </div>
        <div className="sykmelding-header__arbgiver-sykmelder">
            <Element>Arbeidsgiver: "placeholder"</Element>
            <Element>Sykmelder: "placeholder"</Element>
        </div>
    </div>
</>);

const SykmeldingWrapper = () => {
    const data = useFetchSykmelding();
    
    const handterAvgjorelse = (erGodkjent: boolean) => {
        console.log("Avgjørelse håndteres i wrapper: " + erGodkjent);
    }

    const handterAvbryt = () => {
        console.log("Avbryt håndteres i wrapper ")
    }
    useEffect( () => {
        data.callFetch('src/mock/sykmeld.json');
    }, [])

    useEffect( () => {
        console.log(data.sykmelding);
    }, [data.sykmelding])

    if (data.isLoading) { 
        return (
            <div className="spinner">
                <NavFrontendSpinner/>
            </div>
        )
    }
    else {
        switch (data.begrunnelse) {
            case TILBAKEDATERT_MED_BEGRUNNELSE: {
                return (
                    <div className="ekspanderbartpanel-konteiner">
                        <EkspanderbartpanelBase heading={
                            <div className="ekspanderbartpanel">
                                <img src="src/img/report-problem-circle.svg" alt="Alert image" className="ekspanderbartpanel__ikon"/>
                                <Undertittel>En sykmelding må vurderes manuelt</Undertittel>
                            </div>
                        }>
                            {sykmeldingHeader(data)}
                            <SMTilbakedatert sykmelding={data.sykmelding}/>
                            <Knapper begrunnelse={TILBAKEDATERT_MED_BEGRUNNELSE} handterAvgjorelse={handterAvgjorelse} handterAvbryt={handterAvbryt}/>
                        </EkspanderbartpanelBase>
                    </div>
                )
            }
            default:
                return (<></>)
        }
    }
}

export default SykmeldingWrapper;