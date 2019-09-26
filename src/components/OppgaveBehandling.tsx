import * as React from 'react';
import { useEffect } from 'react';

import { useManOppgBehandlingContext } from '../App';

const OppgaveBehandling: React.FC = () => {
    const {
        aktuellManOppgave,
        oppdaterAktuellManOppgave,
        aktuellArsak,
        oppdaterAktuellArsak,
        isLoading,
    } = useManOppgBehandlingContext();

    useEffect(() => {
        console.log('isloading: ' + isLoading);
    }, [isLoading]);

    return <>{}</>;
};

export default OppgaveBehandling;
