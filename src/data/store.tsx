import React, { createContext, PropsWithChildren, useCallback, useState } from 'react';

import { ModiaContext, ModiaContextError } from '../services/modiaService';

interface Store {
    aktivEnhet: string | null;
    setAktivEnhet: (aktivEnhet: string) => void;
}

export const StoreContext = createContext<Store>({
    aktivEnhet: null,
    setAktivEnhet: () => void 0,
});

type StoreProviderProps = {
    modiaContext?: ModiaContext | ModiaContextError;
};

const StoreProvider = ({ children, modiaContext }: PropsWithChildren<StoreProviderProps>) => {
    const defaultAktivSelectValue = getDefaultSelectValue(modiaContext);
    const [aktivEnhet, setAktivEnhet] = useState<string | null>(defaultAktivSelectValue);
    const handleAktivEnhetChange = useCallback((aktivEnhet: string) => {
        setAktivEnhet(aktivEnhet);
    }, []);

    return (
        <StoreContext.Provider value={{ aktivEnhet, setAktivEnhet: handleAktivEnhetChange }}>
            {children}
        </StoreContext.Provider>
    );
};

function getDefaultSelectValue(modiaContext?: ModiaContext | ModiaContextError): string | null {
    if (!modiaContext || 'errorType' in modiaContext) {
        return null;
    }

    const { aktivEnhet, enheter } = modiaContext;
    if (!aktivEnhet || !enheter || enheter.length === 0) return null;

    return enheter.some((it) => it.enhetId === aktivEnhet) ? aktivEnhet : enheter[0].enhetId;
}

export default StoreProvider;
