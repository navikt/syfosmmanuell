export enum FetchStatus {
    NOT_STARTED = 'NOT_STARTED',
    PENDING = 'PENDING',
    FINISHED = 'FINISHED',
}

export interface FetchState<D = {}> {
    status: FetchStatus;
    error: any;
    data: D | null;
    httpCode: number;
}

export interface FetchStateWithData<D = {}> extends FetchState<D> {
    data: D;
}

export const isNotStarted = (fetch: FetchState): boolean => {
    return fetch.status === FetchStatus.NOT_STARTED;
};

export const isNotStartedOrPending = (fetch: FetchState): boolean => {
    return fetch.status === FetchStatus.NOT_STARTED || fetch.status === FetchStatus.PENDING;
};

export const hasFinished = (fetch: FetchState): boolean => {
    return fetch.status === FetchStatus.FINISHED;
};

export const hasFailed = (fetch: FetchState): boolean => {
    return fetch.error != null || fetch.httpCode >= 400;
};

export const hasData = <D = {}>(fetch: FetchState<D>): fetch is FetchStateWithData<D> => {
    return fetch.data != null;
};

export const isAnyNotStartedOrPending = (fetch: FetchState | FetchState[]): boolean => {
    if (Array.isArray(fetch)) {
        return fetch.some(f => isNotStartedOrPending(f));
    }

    return isNotStartedOrPending(fetch);
};

export const hasAnyFailed = (fetch: FetchState | FetchState[]): boolean => {
    if (Array.isArray(fetch)) {
        return fetch.some(f => hasFailed(f));
    }

    return hasFailed(fetch);
};

export const hentUrlParametre = (url: string): { pnr: string } => {
    const splitter = url.split('?');
    if (splitter.length == 1) {
        throw new Error('Url does not contain any parameters');
    }
    if (splitter.length > 2) {
        throw new Error('Url contains several "?"');
    }
    const params = splitter[1].split('&');
    if (params.length > 1) {
        throw new Error('Url contains too many parameters');
    }
    const param = params[0].split('=');
    if (param.length == 1 || param[1] == '') {
        throw new Error('Parameter does not contain any value');
    }
    if (param[0] == 'pnr') {
        return { pnr: param[1] };
    } else {
        throw new Error('The parameter given is not pnr');
    }
};
