import * as React from 'react';
import useFetchSykmelding from '../hooks/useFetchSykmelding';
import { Sykmelding_t } from '../types/sykmeldingTypes';


const SM_tilbakedatert: React.FC<{ sykmelding: Sykmelding_t}> = ({sykmelding}) => {
    return <p>SYKMELDING: {sykmelding.property}</p>;
}

export default SM_tilbakedatert;