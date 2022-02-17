import React, { PropsWithChildren } from 'react';
import { Systemtittel } from 'nav-frontend-typografi';

interface SeksjonMedTittelProps {
  tittel?: string;
  understrek?: boolean;
}

const SeksjonMedTittel = ({ tittel, children, understrek }: PropsWithChildren<SeksjonMedTittelProps>) => {
  return (
    <>
      {tittel && (
        <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <Systemtittel>{tittel}</Systemtittel>
        </div>
      )}

      {children}

      {understrek && <hr />}
    </>
  );
};

export default SeksjonMedTittel;
