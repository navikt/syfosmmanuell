import * as React from 'react';
import { useEffect } from 'react';
import { RuleNames } from '../types/ValidationResultTypes';
import useFetchSykmelding from '../hooks/useFetchSykmelding';
import NavFrontendSpinner from 'nav-frontend-spinner';
import SMTilbakedatert from './SMTilbakedatert';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';
import './SykmeldingWrapper.less'
import Knapper from './Knapper';


const sykmeldingHeader = data => (<>
    <div className="sykmelding-header">
        <div className="sykmelding-header__begrunnelse">
            <Element>Årsak til manuell vurdering</Element>
            <Normaltekst>{data.begrunnelser.ruleHits[0].ruleName}</Normaltekst>
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
    }, []);

    if (data.isLoading) { 
        return (
            <div className="spinner">
                <NavFrontendSpinner/>
            </div>
        )
    }
    else if (data.begrunnelser) {
        console.log(data)
        switch (data.begrunnelser.ruleHits[0].ruleName) {
            case RuleNames.TILBAKEDATERT_MED_BEGRUNNELSE_FORSTE_SYKMELDING: {
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
                        <Knapper begrunnelse={"RuleNames.TILBAKEDATERT_MED_BEGRUNNELSE_FORSTE_SYKMELDING"} handterAvgjorelse={handterAvgjorelse} handterAvbryt={handterAvbryt}/>
                        </EkspanderbartpanelBase>
                    </div>
                )
            }
            case RuleNames.TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE: {
                return <></>
            }
            case RuleNames.BEHANDLER_KI_FT_MT_BENYTTER_ANNEN_DIAGNOSEKODE_ENN_L: {
                return <></>
            } 
            case RuleNames.AVVENTENDE_SYKMELDING_KOMBINERT: {
                return <></>
            }
            default:
                return (<><p>hello</p></>)
        }
    }
    else {
        return <p>nothing to show</p>
    } 
}

export default SykmeldingWrapper;