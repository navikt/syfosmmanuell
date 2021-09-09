import React, { useContext, useEffect } from 'react';
import { Select } from 'nav-frontend-skjema';

import { ModiaContext } from '../../services/modiaService';

import styles from './ModiaHeader.module.css';
import { StoreContext } from '../../data/store';

interface Props {
  modiaContext: ModiaContext | null;
}

function ModiaHeader({ modiaContext }: Props): JSX.Element {
  const { setAktivEnhet } = useContext(StoreContext);
  useEffect(() => {
    if (!modiaContext) return;

    const initialAktivEnhet = getDefaultSelectValue(modiaContext.enheter, modiaContext.aktivEnhet);
    if (initialAktivEnhet) {
      setAktivEnhet(initialAktivEnhet);
    }
  }, []);

  return (
    <header className={styles.root}>
      <div>LOGO | syfosmmanuell</div>
      <div>
        {modiaContext && (
          <Select
            defaultValue={getDefaultSelectValue(modiaContext.enheter, modiaContext.aktivEnhet)}
            onChange={(event) => {
              console.log('Ey changar', event.target.value);
            }}
          >
            {modiaContext.enheter.map((it) => (
              <option key={it.enhetId} value={it.enhetId}>
                {it.enhetId} {it.navn}
              </option>
            ))}
          </Select>
        )}
      </div>
      <div>Navn</div>
    </header>
  );
}

function getDefaultSelectValue(
  enheter: ModiaContext['enheter'],
  aktivEnhet: ModiaContext['aktivEnhet'],
): string | undefined {
  if (!aktivEnhet) return undefined;

  return enheter.some((it) => it.enhetId === aktivEnhet) ? aktivEnhet : undefined;
}

export default ModiaHeader;
