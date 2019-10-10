import { useState, useEffect } from 'react';
import { ManuellOppgave } from '../types/ManuellOppgaveTypes';
import { RuleNames, ValidationResult } from '../types/ValidationresultTypes';

interface UseManOppgBehandlingInterface {
    manOppgaver: ManuellOppgave[] | null;
    setManOppgaver: Function;
    aktuellManOppgave: ManuellOppgave | null;
    setAktuellManOppgave: Function;
    aktuellArsak: RuleNames | null;
    setAktuellArsak: Function;
    oppdaterVurdering: Function;
    oppdaterSendInnValidering: Function;
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
        if (
            nyOppgave.validationResult.antallBehandlet == 1 &&
            nyOppgave.validationResult.antallBehandlet == nyOppgave.validationResult.ruleHits.length
        ) {
            nyOppgave.setSendInnValidering(true);
        }
        setAktuellManOppgave(nyOppgave);
        setAktuellArsak(null);
    };

    const oppdaterSendInnValidering = (status: boolean): void => {
        const nyOppgave = new ManuellOppgave(aktuellManOppgave);
        nyOppgave.setSendInnValidering(status);
        setAktuellManOppgave(nyOppgave);
    };

    const byttAktuellManOppgave = (): void => {
        const nyManOppgaver = manOppgaver.filter(
            manOppgave => manOppgave.manuellOppgaveid != aktuellManOppgave.manuellOppgaveid,
        );
        nyManOppgaver.push(new ManuellOppgave(aktuellManOppgave));
        setManOppgaver(nyManOppgaver);
    };

    const resettVurdering = (): void => {
        manOppgaver.forEach((oppg, index) => {
            if (oppg.manuellOppgaveid == aktuellManOppgave.manuellOppgaveid) {
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

    useEffect(() => {
        if (aktuellManOppgave && aktuellManOppgave.sendInnValidering) {
            console.log(
                'fetcher fra: ' +
                    'https://syfosmmanuell-backend.nais.preprod.local/api/v1/vurderingmanuelloppgave/' +
                    aktuellManOppgave.manuellOppgaveid,
            );
            const headers = new Headers();
            headers.append('Accept', 'application/json'); // This one is enough for GET requests
            headers.append('Content-Type', 'application/json'); // This one sends body
            fetch(
                'https://syfosmmanuell-backend.nais.preprod.local/api/v1/vurderingmanuelloppgave/' +
                    aktuellManOppgave.manuellOppgaveid,
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(
                        new ValidationResult({
                            status: aktuellManOppgave.validationResult.status,
                            ruleHits: aktuellManOppgave.validationResult.ruleHits,
                        }),
                    ),
                },
            ).then(res => {
                console.log(res);
                console.log('aktuellmanoppgave som ble sendt inn');
                console.log(aktuellManOppgave);
                byttAktuellManOppgave();
                //console.log(aktuellManOppgave);
            });
        }
    }, [aktuellManOppgave]);

    return {
        manOppgaver,
        setManOppgaver,
        aktuellManOppgave,
        setAktuellManOppgave,
        aktuellArsak,
        setAktuellArsak,
        oppdaterVurdering,
        oppdaterSendInnValidering,
        byttAktuellManOppgave,
        resettVurdering,
        error,
        setError,
        isLoading,
        setIsLoading,
    };
};

export default useManOppgBehandling;
