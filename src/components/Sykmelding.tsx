import * as React from 'react';
import { useState, useEffect } from 'react';
import { Tilbakedatert_t } from '../types/sykmeldingTypes';
import { TILBAKEDATERT_MED_BEGRUNNELSE } from '../types/begrunnelser';
import useFetchSykmelding from '../hooks/useFetchSykmelding';
import NavFrontendSpinner from 'nav-frontend-spinner';


const sykmelding = () => {
    const sykmelding = useFetchSykmelding('src/moch/test.json');

    return(
        <>
            {sykmelding.isLoading && 
                <div>
                    <p>Loading...</p>
                    <NavFrontendSpinner/>
                </div>
            }
            {!sykmelding.isLoading && <p>{JSON.stringify(sykmelding.response)}</p>}

        </>
    )
}

export default sykmelding;