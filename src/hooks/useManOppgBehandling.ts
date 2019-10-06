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
    byttAktuellManOppgave: Function;
    resettVurdering: Function;
    error: Error | null;
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
        setAktuellManOppgave(nyOppgave);
        setAktuellArsak(null);
    };

    const byttAktuellManOppgave = (): void => {
        const nyManOppgaver = manOppgaver.filter(manOppgave => manOppgave.manOppgId != aktuellManOppgave.manOppgId);
        nyManOppgaver.push(new ManuellOppgave(aktuellManOppgave));
        setManOppgaver(nyManOppgaver);
    };

    const resettVurdering = (): void => {
        manOppgaver.forEach((oppg, index) => {
            if (oppg.manOppgId == aktuellManOppgave.manOppgId) {
                setAktuellManOppgave(manOppgaver[index]);
            }
        });
    };

    useEffect(() => {
        if (manOppgaver != null) {
            setAktuellManOppgave(manOppgaver[0]);
            if (manOppgaver[0].validationResult.ruleHits.length == 1) {
                setAktuellArsak(manOppgaver[0].validationResult.ruleHits[0].ruleName);
            }
        }
    }, [isLoading]);

    useEffect(() => {
        if (manOppgaver != null) {
            manOppgaver[0].validationResult.totalVurdering == null
                ? setAktuellManOppgave(manOppgaver[0])
                : setAktuellManOppgave(null);
        }
    }, [manOppgaver]);

    return {
        manOppgaver,
        setManOppgaver,
        aktuellManOppgave,
        setAktuellManOppgave,
        aktuellArsak,
        setAktuellArsak,
        oppdaterVurdering,
        byttAktuellManOppgave,
        resettVurdering,
        error,
        setError,
        isLoading,
        setIsLoading,
    };
};

export default useManOppgBehandling;
