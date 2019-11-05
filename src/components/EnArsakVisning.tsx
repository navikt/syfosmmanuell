import * as React from 'react';
import SykmeldingVisning from './SykmeldingVisning';
import Knapper from './Knapper';
import HeleSykmeldingen from './HeleSykmeldingen';

const EnArsakVisning: React.FC = () => (
    <>
        <SykmeldingVisning />
        <HeleSykmeldingen />
    </>
);

export default EnArsakVisning;
