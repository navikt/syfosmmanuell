import React, { useContext, useEffect } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

import { withAuthenticatedPage } from '../auth/session';
import { getModiaContext, ModiaContext, ModiaContextError } from '../services/modiaService';
import { StoreContext } from '../data/store';
import NoEnhetError from '../components/NoEnhetError';
import { clientEnvs } from '../utils/env';

const Kvittering = (): JSX.Element => {
  const { aktivEnhet } = useContext(StoreContext);

  useEffect(() => {
    // No aktivEnhet means that modiaContext failed to load
    if (!aktivEnhet) return;

    setTimeout(() => {
      window.location.href = clientEnvs.NEXT_PUBLIC_GOSYS_URL;
    }, 2000);
  }, [aktivEnhet]);

  if (!aktivEnhet) {
    return <NoEnhetError />;
  }

  return (
    <div style={{ marginTop: '32px' }}>
      <Normaltekst>Oppgaven er registrert. Du videresendes automatisk til GOSYS.</Normaltekst>
    </div>
  );
};

export const getServerSideProps = withAuthenticatedPage(async ({ req }, accessToken) => {
  const modiaContext: ModiaContext | ModiaContextError = await getModiaContext(accessToken);

  return {
    props: {
      modiaContext,
    },
  };
});

export default Kvittering;
