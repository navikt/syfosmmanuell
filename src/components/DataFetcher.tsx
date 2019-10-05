import * as React from 'react';
import { useEffect } from 'react';
import useFetch from '../rest/useFetch';
import { useAppStore } from '../store/AppStore';
import {
    FetchState,
    hasAnyFailed,
    hasData,
    isAnyNotStartedOrPending,
    isNotStarted,
    hentUrlParametre,
} from '../rest/utils';
import { ManuellOppgave } from '../types/ManuellOppgaveTypes';
import Spinner from 'nav-frontend-spinner';

export const DataFetcher = (props: { children: any }) => {
    const { setManOppgaver, setIsLoading, setError } = useAppStore();
    const manOppgaver = useFetch<ManuellOppgave[]>();
    let url = 'https://syfosmmanuell-backend/api/v1/hentManuellOppgave/?fnr=';

    useEffect(() => {
        if (isNotStarted(manOppgaver)) {
            try {
                url += hentUrlParametre(window.location.href).pnr;
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
