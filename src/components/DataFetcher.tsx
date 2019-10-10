import * as React from 'react';
import { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { useAppStore } from '../store/AppStore';
import { FetchState, hasAnyFailed, hasData, isAnyNotStartedOrPending, isNotStarted } from '../utils/useFetchUtils';
import { hentUrlParameter } from '../utils/urlParameter';
import { ManuellOppgave } from '../types/ManuellOppgaveTypes';
import { ValidationResult } from '../types/ValidationresultTypes';
import Spinner from 'nav-frontend-spinner';

export const DataFetcher = (props: { children: any }) => {
    const { aktuellManOppgave, setManOppgaver, setIsLoading, setError } = useAppStore();
    const manOppgaver = useFetch<ManuellOppgave[]>();
    let url = 'https://syfosmmanuell-backend.nais.preprod.local/api/v1/hentManuellOppgave/?fnr=';

    const postValidering = useFetch<any>();
    const url2 = 'https://syfosmmanuell-backend.nais.preprod.local/api/v1/vurderingmanuelloppgave/';

    useEffect(() => {
        if (isNotStarted(manOppgaver)) {
            try {
                url += hentUrlParameter(window.location.href).pnr;
                console.log('URL with parameter: ' + url);
            } catch (err) {
                setError(err);
                console.error(err);
            }
            setIsLoading(true);
            manOppgaver.fetch(url, undefined, (fetchState: FetchState<ManuellOppgave[]>) => {
                console.log(fetchState.data);
                setManOppgaver(
                    fetchState.data.map(manOppgave => {
                        return new ManuellOppgave(manOppgave);
                    }),
                );
                setIsLoading(false);
            });
        }
    }, []);

    useEffect(() => {
        console.log(aktuellManOppgave);
        if (aktuellManOppgave && aktuellManOppgave.sendInnValidering) {
            if (isNotStarted(postValidering)) {
                postValidering.fetch(
                    url2 + aktuellManOppgave.manuellOppgaveid,
                    {
                        method: 'POST',
                        body: JSON.stringify(
                            new ValidationResult({
                                status: aktuellManOppgave.validationResult.status,
                                ruleHits: aktuellManOppgave.validationResult.ruleHits,
                            }),
                        ),
                    },
                    (fetchState: FetchState<any>) => {
                        console.log(aktuellManOppgave);
                        console.log(fetchState);
                    },
                );
            }
        }
    }, [aktuellManOppgave]);

    if (isAnyNotStartedOrPending([manOppgaver])) {
        return <Spinner />;
    } else if (hasAnyFailed([manOppgaver])) {
        return (
            <>
                Det oppnås for tiden ikke kontakt med alle baksystemer. Vi jobber med å løse saken. Vennligst prøv igjen
                senere.
            </>
        );
    }

    if (hasData(manOppgaver)) {
        setError(null);
    }

    return props.children;
};
