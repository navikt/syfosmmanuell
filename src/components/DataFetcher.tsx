import * as React from 'react';
import { useEffect } from 'react';
import useFetch from '../rest/useFetch';
import { useAppStore } from '../store/AppStore';
import { FetchState, hasAnyFailed, hasData, isAnyNotStartedOrPending, isNotStarted } from '../rest/utils';
import { ManuellOppgave } from '../types/ManuellOppgaveTypes';
import Spinner from 'nav-frontend-spinner';

export function DataFetcher(props: { children: any }) {
    const { setManOppgaver, setError } = useAppStore();
    const manOppgaver = useFetch<ManuellOppgave[]>();

    useEffect(() => {
        if (isNotStarted(manOppgaver)) {
            manOppgaver.fetch(
                'src/mock/sykmelding-flere-regler.json',
                undefined,
                (fetchState: FetchState<ManuellOppgave[]>) => {
                    console.log(fetchState);
                    setManOppgaver(
                        fetchState.data.map(manOppgave => {
                            console.log(fetchState.data);
                            return new ManuellOppgave(manOppgave);
                        }),
                    );
                },
            );
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
}
