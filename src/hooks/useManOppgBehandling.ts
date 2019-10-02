import { useState, useEffect } from 'react';
import { ManuellOppgave } from '../types/ManuellOppgaveTypes';
import { RuleNames } from '../types/ValidationresultTypes';

interface UseManOppgBehandlingInterface {
    manOppgaver: ManuellOppgave[] | null;
    setManOppgaver: Function;
    aktuellManOppgave: ManuellOppgave | null;
    setAktuellManOppgave: Function;
    aktuellArsak: RuleNames | null;
    setAktuellArsak: Function;
    oppdaterVurdering: Function;
    error: Error;
    setError: Function;
    isLoading: boolean;
    setIsLoading: Function;
}

const useManOppgBehandling = (): UseManOppgBehandlingInterface => {
    const [manOppgaver, setManOppgaver] = useState<ManuellOppgave[] | null>(null);
    const [aktuellManOppgave, setAktuellManOppgave] = useState<ManuellOppgave | null>(null);
    const [aktuellArsak, setAktuellArsak] = useState<RuleNames | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const oppdaterVurdering = (vurdering: boolean): void => {
        const nyOppgave = new ManuellOppgave(aktuellManOppgave);
        nyOppgave.validationResult.setBehandlet(aktuellArsak, vurdering);
        const nyManOppgaver = manOppgaver.filter(manOppgave => manOppgave.manOppgId != aktuellManOppgave.manOppgId);
        nyManOppgaver.push(nyOppgave);
        setManOppgaver(nyManOppgaver);
        setAktuellManOppgave(nyOppgave);
        setAktuellArsak(null);
    };

    useEffect(() => {
        if (manOppgaver != null) {
            setAktuellManOppgave(manOppgaver[0]);
            if (manOppgaver[0].validationResult.ruleHits.length == 1) {
                setAktuellArsak(manOppgaver[0].validationResult.ruleHits[0].ruleName);
            }
        }
    }, [isLoading]);

    return {
        manOppgaver,
        setManOppgaver,
        aktuellManOppgave,
        setAktuellManOppgave,
        aktuellArsak,
        setAktuellArsak,
        oppdaterVurdering,
        error,
        setError,
        isLoading,
        setIsLoading,
    };
};

export default useManOppgBehandling;
