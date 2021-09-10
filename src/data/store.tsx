import React, { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { ModiaContext } from '../services/modiaService';

interface Store {
  aktivEnhet: string | null;
  setAktivEnhet: (aktivEnhet: string) => void;
}

export const StoreContext = createContext<Store>({
  aktivEnhet: null,
  setAktivEnhet: () => void 0,
});

const StoreProvider = ({ children, modiaContext }: PropsWithChildren<{ modiaContext: ModiaContext | null }>) => {
  const defaultAktivSelectValue = getDefaultSelectValue(modiaContext?.enheter, modiaContext?.aktivEnhet);
  const [aktivEnhet, setAktivEnhet] = useState<string | null>(defaultAktivSelectValue);
  const handleAktivEnhetChange = useCallback((aktivEnhet) => {
    setAktivEnhet(aktivEnhet);
  }, []);

  return (
    <StoreContext.Provider value={{ aktivEnhet, setAktivEnhet: handleAktivEnhetChange }}>
      {children}
    </StoreContext.Provider>
  );
};

function getDefaultSelectValue(
  enheter: ModiaContext['enheter'] | undefined,
  aktivEnhet: ModiaContext['aktivEnhet'] | undefined,
): string | null {
  if (!aktivEnhet || !enheter || enheter.length === 0) return null;

  return enheter.some((it) => it.enhetId === aktivEnhet) ? aktivEnhet : enheter[0].enhetId;
}

export default StoreProvider;
