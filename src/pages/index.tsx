import React, { useContext } from 'react';
import MainContent from '../components/MainContent';
import { ManuellOppgave } from '../types/manuellOppgave';
import { GetServerSidePropsResult } from 'next';
import { getOppgave } from '../services/oppgaveService';
import { getModiaContext } from '../services/modiaService';
import ModiaHeader from '../components/modiaheader/ModiaHeader';
import ErrorFallback from '../components/errorFallback/ErrorFallback';
import { BasePageRequiredProps } from './_app';
import { StoreContext } from '../data/store';
import { logger } from '../utils/logger';
import { withAuthenticatedPage } from '../auth/session';

interface IndexProps extends BasePageRequiredProps {
  manuellOppgave: ManuellOppgave | null;
}

function Index({ manuellOppgave, modiaContext }: IndexProps) {
  const { aktivEnhet } = useContext(StoreContext);

  if (!aktivEnhet) {
    // TODO vise noe info om at man ikke har noe gyldig enheter
    return <div>no enhet? :(</div>;
  }

  return (
    <section>
      <ModiaHeader modiaContext={modiaContext} />
      <main>
        {manuellOppgave && <MainContent manuellOppgave={manuellOppgave} aktivEnhet={aktivEnhet} />}
        {!manuellOppgave && <ErrorFallback />}
      </main>
    </section>
  );
}

export const getServerSideProps = withAuthenticatedPage(
  async ({ req, query }): Promise<GetServerSidePropsResult<IndexProps>> => {
    if (!query?.oppgaveid || typeof query.oppgaveid !== 'string') {
      return {
        notFound: true,
      };
    }

    try {
      const [modiaContext, manuellOppgave] = await Promise.all([
        // TODO code better, kun access token, ikke hele takenset
        getModiaContext(req.session.get('tokenSet').access_token),
        getOppgave(query.oppgaveid),
      ]);

      return {
        props: {
          modiaContext,
          manuellOppgave,
        },
      };
    } catch (e) {
      //@ts-expect-error
      logger.error(e);

      return {
        props: {
          manuellOppgave: null,
          modiaContext: null,
        },
      };
    }
  },
);

export default Index;
