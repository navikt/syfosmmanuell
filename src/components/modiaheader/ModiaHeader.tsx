import React, { useContext } from 'react';
import { Select } from 'nav-frontend-skjema';

import { ModiaContext } from '../../services/modiaService';

import { StoreContext } from '../../data/store';
import styles from './ModiaHeader.module.css';

interface Props {
  modiaContext: ModiaContext | null;
}

function ModiaHeader({ modiaContext }: Props): JSX.Element {
  const { aktivEnhet, setAktivEnhet } = useContext(StoreContext);

  return (
    <header className={styles.root}>
      <div>LOGO | syfosmmanuell</div>
      <div>
        {modiaContext && aktivEnhet && (
          <Select
            value={aktivEnhet}
            onChange={(event) => {
              setAktivEnhet(event.target.value);
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

export default ModiaHeader;
