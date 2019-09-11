import * as React from 'react';
import { TILBAKEDATERT_MED_BEGRUNNELSE } from '../types/begrunnelser';
import useFetchSykmelding from '../hooks/useFetchSykmelding';
import NavFrontendSpinner from 'nav-frontend-spinner';
import SM_tilbakedatert from './SM_tilbakedatert';


const SykmeldingWrapper = () => {
    const data = useFetchSykmelding('src/moch/test.json');

    if (data.isLoading) { return <NavFrontendSpinner/>}
    else {
        switch (data.begrunnelse) {
            case TILBAKEDATERT_MED_BEGRUNNELSE: {
                return (<SM_tilbakedatert sykmelding={data.sykmelding}/>)
            }
            default: {
                return <p>nothing to show</p>
            }
        }
    }
}

export default SykmeldingWrapper;