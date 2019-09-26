import { useState, useEffect } from 'react';
import { Sykmelding } from '../types/SykmeldingTypes';
import { ValidationResult } from '../types/ValidationResultTypes';
import { useManOppgBehandlingContext } from '../App';
import { ManuellOppgave } from '../types/ManuellOppgaveTypes';

interface UseFetchSykmeldingInterface {
    callFetch: Function;
}

const useFetchSykmelding = (): UseFetchSykmeldingInterface => {
    const [url, setUrl] = useState<string | null>(null);

    const { oppdaterManOppgaver, oppdaterError, oppdaterIsLoading } = useManOppgBehandlingContext();

    useEffect(() => {
        oppdaterIsLoading(true);
        const fetchData = async (): Promise<void> => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                if (json.validationResult) {
                    const oppgave = new Array<ManuellOppgave>();
                    oppgave.push(new ManuellOppgave(json));
                    oppdaterManOppgaver(oppgave);
                    //setArsaker(new ValidationResult(json.validationResult));
                    //setSykmelding(new Sykmelding(json.sykmelding));
                    //setIsLoading(false);
                } else {
                    throw new Error('Sykmelding mangler begrunnelse');
                }
            } catch (error) {
                oppdaterError(error);
            }
        };
        fetchData();
    }, [url]);

    useEffect(() => {
        setUrl('src/mock/sykmelding-flere-regler.json');
    }, []);

    return { callFetch: setUrl };
};

export default useFetchSykmelding;
