import * as React from 'react';
import { TILBAKEDATERT_MED_BEGRUNNELSE } from '../types/begrunnelser';
import useFetchSykmelding from '../hooks/useFetchSykmelding';
import NavFrontendSpinner from 'nav-frontend-spinner';
import SMTilbakedatert from './SMTilbakedatert';


const SykmeldingWrapper = () => {
    const data = useFetchSykmelding('src/moch/sykmeld.json');

    if (data.isLoading) { return <NavFrontendSpinner/>}
    else {
        switch (data.begrunnelse) {
            case TILBAKEDATERT_MED_BEGRUNNELSE: {
                return (<SMTilbakedatert sykmelding={data.sykmelding}/>)
            }
            default: {
                return <p>nothing to show</p>
            }
        }
    }
}

export default SykmeldingWrapper;