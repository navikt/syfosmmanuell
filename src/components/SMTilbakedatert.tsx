import * as React from 'react';
import { Sykmelding_t } from '../types/sykmeldingTypes';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import './SykmeldingWrapper.less';

const SMTilbakedatert: React.FC<{ sykmelding: Sykmelding_t}> = ({sykmelding}) => {


    return (
        <div className="sykmeldingWrapper">
            <EkspanderbartpanelBase heading={
                <div className="panelTittelContainer">
                    <img src="src/img/report-problem-circle.svg" alt="" className="alertImage"/>
                    <h2>Hello World</h2>
                </div>}>
            </EkspanderbartpanelBase>
        </div>
    )
    return <p>SYKMELDING: {sykmelding.id}</p>;
}

export default SMTilbakedatert;