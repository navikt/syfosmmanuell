import React, { useContext } from 'react';
import { GetServerSidePropsResult } from 'next';

import { ManuellOppgave } from '../types/manuellOppgave';
import MainContent from '../components/MainContent';
import { getOppgave, OppgaveFetchingError } from '../services/oppgaveService';
import { getModiaContext } from '../services/modiaService';
import { StoreContext } from '../data/store';
import { withAuthenticatedPage } from '../auth/session';
import getAuthClient from '../auth/oidcClient';
import NoEnhetError from '../components/NoEnhetError';
import ManuellOppgaveErrors from '../components/ManuellOppgaveErrors';

import { BasePageRequiredProps } from './_app';

interface IndexProps extends BasePageRequiredProps {
  manuellOppgave: ManuellOppgave | OppgaveFetchingError;
}

function Index({ manuellOppgave }: IndexProps) {
  const { aktivEnhet } = useContext(StoreContext);

  if (!aktivEnhet) {
    return <NoEnhetError />;
  } else if ('errorType' in manuellOppgave) {
    return <ManuellOppgaveErrors errors={manuellOppgave} />;
  } else {
    return <MainContent manuellOppgave={manuellOppgave} aktivEnhet={aktivEnhet} />;
  }
}

export const getServerSideProps = withAuthenticatedPage(
  async ({ req, query }, accessToken): Promise<GetServerSidePropsResult<IndexProps>> => {
    if (!query?.oppgaveid || typeof query.oppgaveid !== 'string') {
      return {
        notFound: true,
      };
    }

    if (process.env.NODE_ENV !== 'development') {
      await getAuthClient();
    }

    const [modiaContext, manuellOppgave] = await Promise.all([
      getModiaContext(accessToken),
      getOppgave(query.oppgaveid, accessToken),
    ]);

    if ('errorType' in manuellOppgave) {
      if (manuellOppgave.errorType === 'OPPGAVE_NOT_FOUND') {
        return {
          notFound: true,
        };
      }
    }

    return {
      props: {
        modiaContext,
        manuellOppgave,
      },
    };
  },
);

export default Index;
