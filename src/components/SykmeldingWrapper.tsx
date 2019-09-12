import * as React from 'react';
import { TILBAKEDATERT_MED_BEGRUNNELSE } from '../types/begrunnelser';
import useFetchSykmelding from '../hooks/useFetchSykmelding';
import NavFrontendSpinner from 'nav-frontend-spinner';
import SMTilbakedatert from './SMTilbakedatert';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Element, Undertittel, Normaltekst } from 'nav-frontend-typografi';
import './SykmeldingWrapper.less'


const sykmeldingHeader = data =>  (<>
    <div className="sm-header sm-header__begrunnelse">
        <Element>Årsak til manuell vurdering</Element>
        <Normaltekst>{data.begrunnelse}</Normaltekst>
    </div>
    <div className="sm-header sm-header__arbgiver-sykmelder">
    <Element>Arbeidsgiver: "placeholder"</Element>
        <Element>Sykmelder: "placeholder"</Element>
    </div>
</>);

const sykmeldingFooter = <>
    <div className="sm-footer sm-footer__godkjenn-avvis">
        <button>"Godkjenn placeholder"</button>
        <button>"Avvis placeholder"</button>
    </div>
    <div className="sm-footer sm-footer__ferdig-avbryt">
        <button>"Ferdigstill placeholder"</button>
        <button>"Avbryd placeholder"</button>
    </div>
</>;

const SykmeldingWrapper = () => {
    const data = useFetchSykmelding('src/mock/sykmeld.json');
    
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