import * as React from 'react';
import { useEffect } from 'react';
import { useAppStore } from '../store/AppStore';
import useFetch from '../hooks/useFetch';

import { FetchState, hasAnyFailed, hasData, isAnyNotStartedOrPending, isNotStarted } from '../utils/useFetchUtils';
import { hentUrlParameter } from '../utils/urlParameter';
import { ManuellOppgave } from '../types/ManuellOppgaveTypes';
import Spinner from 'nav-frontend-spinner';
import env from '../utils/environments';

export const DataFetcher = (props: { children: any }) => {
    const { setManOppgaver, setIsLoading, setError } = useAppStore();
    const manOppgaver = useFetch<ManuellOppgave[]>();
    let url = 'https://syfosmmanuell-backend.nais.preprod.local/api/v1/hentManuellOppgave/?manOppgId=';
    //let url = env.hentManuelleOppgaverUrl;

    useEffect(() => {
        if (isNotStarted(manOppgaver)) {
            try {
                url += hentUrlParameter(window.location.href).fnr;
                console.log('Henter oppgaver fra: ' + url);
            } catch (err) {
                console.error(err);
            }
            setIsLoading(true);
            manOppgaver.fetch(url, undefined, (fetchState: FetchState<ManuellOppgave[]>) => {
                //console.log(fetchState.data);
                if (fetchState.data.length === 0) {
                    setError(new Error('Ingen oppgaver ble funnet'));
                } else {
                    setManOppgaver(
                        fetchState.data.map(manOppgave => {
                            return new ManuellOppgave(manOppgave);
                        }),
                    );
                }
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

    return props.children;
};
