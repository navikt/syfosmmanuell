import React, { useContext, useEffect } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { GetServerSidePropsResult } from 'next';

import { withAuthenticatedPage } from '../auth/session';
import { getModiaContext, ModiaContext, ModiaContextError } from '../services/modiaService';
import { StoreContext } from '../data/store';
import NoEnhetError from '../components/NoEnhetError';
import { clientEnvs, isDevOrDemo } from '../utils/env';
import { logger } from '../utils/logger';

import { BasePageRequiredProps } from './_app';

interface Props extends BasePageRequiredProps {
  isDemo: boolean;
}

const Kvittering = ({ isDemo }: Props): JSX.Element => {
  const { aktivEnhet } = useContext(StoreContext);

  useEffect(() => {
    // No aktivEnhet means that modiaContext failed to load
    if (!aktivEnhet) {
      logger.error('On kvittering page with no context loaded');
      return;
    }

    if (isDemo) {
      logger.warn('In demo, redirecting back to dummy oppgave');
      setTimeout(() => {
        window.location.href = '/?oppgaveid=123456';
      }, 2000);
      return;
    }

    logger.warn('On kvittering page, user will be redirected to GOSYS');
    setTimeout(() => {
      window.location.href = clientEnvs.NEXT_PUBLIC_GOSYS_URL;
    }, 2000);
  }, [aktivEnhet, isDemo]);

  if (!aktivEnhet) {
    return <NoEnhetError />;
  }

  return (
    <div style={{ marginTop: '32px' }}>
      <Normaltekst>Oppgaven er registrert. Du videresendes automatisk til GOSYS.</Normaltekst>
      {isDemo && (
        <Normaltekst>
          Dette er bare en demo, du blir sendt tilbake til oppgaven. Ingenting har blitt lagret.
        </Normaltekst>
      )}
    </div>
  );
};

export const getServerSideProps = withAuthenticatedPage(
  async ({ req }, accessToken): Promise<GetServerSidePropsResult<Props>> => {
    const modiaContext: ModiaContext | ModiaContextError = await getModiaContext(accessToken);

    return {
      props: {
        modiaContext,
        isDemo: isDevOrDemo,
      },
    };
  },
);

export default Kvittering;