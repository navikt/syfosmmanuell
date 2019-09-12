import * as React from 'react';
import { TILBAKEDATERT_MED_BEGRUNNELSE } from '../types/begrunnelser';
import useFetchSykmelding from '../hooks/useFetchSykmelding';
import NavFrontendSpinner from 'nav-frontend-spinner';
import SMTilbakedatert from './SMTilbakedatert';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';
import './SykmeldingWrapper.less'


const sykmeldingHeader = data =>  (<>
    <div className="begrunnelse">
        <Element>Årsak til manuell vurdering</Element>
        <Normaltekst>{data.begrunnelse}</Normaltekst>
    </div>
    <div className="arbgiver-sykmelder">
    <Element>Arbeidsgiver: "placeholder"</Element>
        <Element>Sykmelder: "placeholder"</Element>
    </div>
</>);

const sykmeldingFooter = <>
    <div className="buttons">
        <button>"Godkjenn placeholder"</button>
        <button>"Avvis placeholder"</button>
    </div>
    <div className="radio-buttons">
        <button>"Ferdigstill placeholder"</button>
        <button>"Avbryd placeholder"</button>
    </div>
</>;

const SykmeldingWrapper = () => {
    const data = useFetchSykmelding('src/moch/sykmeld.json'); // change to env variable later
    
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
                    <div className="sykmeldingWrapper">
                        <EkspanderbartpanelBase heading={
                            <div className="panelTittelContainer">
                                <img src="src/img/report-problem-circle.svg" alt="" className="alertImage"/> {/* find out how to color the icon */}
                                <Undertittel>En sykmelding må vurderes manuelt</Undertittel>
                            </div>
                        }>
                            {sykmeldingHeader(data)}
                            <SMTilbakedatert sykmelding={data.sykmelding}/>
                            {sykmeldingFooter}
                        </EkspanderbartpanelBase>
                    </div>
                )
            }
            default: {
                return <p>nothing to show</p>
            }
        }
    }
}

export default SykmeldingWrapper;