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
    const url = 'http://syfosmmanuell-backend/api/v1/hentManuellOppgave/?fnr=';
    try {
        url.concat(hentUrlParametre(window.location.href).pnr);
        console.log('URL with parameter: ' + url);
    } catch (err) {
        console.error(err);
    }

    useEffect(() => {
        if (isNotStarted(manOppgaver)) {
            setIsLoading(true);
            manOppgaver.fetch(url, undefined, (fetchState: FetchState<ManuellOppgave[]>) => {
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
        setError(false);
    }

    return props.children;
};
