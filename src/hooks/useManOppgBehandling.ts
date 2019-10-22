import { useState, useEffect } from 'react';
import { ManuellOppgave } from '../types/ManuellOppgaveTypes';
import { RuleNames, Status, ValidationResult } from '../types/ValidationresultTypes';
import env from '../utils/environments';

interface UseManOppgBehandlingInterface {
    oppgaverLoest: number;
    setOppgaverLoest: Function;
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
    const [oppgaverLoest, setOppgaverLoest] = useState<number>(0);

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
    /*
    useEffect(() => {
        if (manOppgaver != null) {
            setAktuellManOppgave(manOppgaver[0]);
            if (manOppgaver[0].validationResult.ruleHits.length == 1) {
                setAktuellArsak(manOppgaver[0].validationResult.ruleHits[0].ruleName);
            }
        }
    }, [isLoading]);
*/
    useEffect(() => {
        if (manOppgaver != null) {
            manOppgaver[0].validationResult.totalVurdering == null
                ? setAktuellManOppgave(manOppgaver[0])
                : setAktuellManOppgave(null);
            manOppgaver[0].validationResult.ruleHits.length == 1
                ? setAktuellArsak(manOppgaver[0].validationResult.ruleHits[0].ruleName)
                : setAktuellArsak(null);
        }
    }, [manOppgaver]);

    useEffect(() => {
        if (aktuellManOppgave && aktuellManOppgave.sendInnValidering) {
            let url = 'https://syfosmmanuell-backend.nais.preprod.local/api/v1/vurderingmanuelloppgave/';
            //let url: string = env.postManuellVurderingUrl;
            url += env.isProduction || env.isPreprod ? aktuellManOppgave.manuellOppgaveid : '';
            console.log(
                `Putting validationResult for manuellOppgaveid: ${aktuellManOppgave.manuellOppgaveid} to URL: ${url}`,
            );
            console.log(aktuellManOppgave);
            setIsLoading(true);
            fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    new ValidationResult({
                        status: aktuellManOppgave.validationResult.totalVurdering ? Status.OK : Status.INVALID,
                        ruleHits: aktuellManOppgave.validationResult.ruleHits,
                    }),
                ),
            }).then(res => {
                setIsLoading(false);
                if (res.status == 200) {
                    byttAktuellManOppgave();
                } else {
                    setError(new Error('Fetch failed with status code: ' + res.status));
                }
            });
        }
    }, [aktuellManOppgave]);

    return {
        oppgaverLoest,
        setOppgaverLoest,
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
