import React, { useContext } from 'react';
import MainContent from '../components/MainContent';
import { ManuellOppgave } from '../types/manuellOppgave';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getOppgave } from '../services/oppgaveService';
import { getModiaContext } from '../services/modiaService';
import ModiaHeader from '../components/modiaheader/ModiaHeader';
import ErrorFallback from '../components/errorFallback/ErrorFallback';
import { BasePageRequiredProps } from './_app';
import { StoreContext } from '../data/store';
import { logger } from '../utils/logger';

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

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<IndexProps>> {
  if (!query?.oppgaveid || typeof query.oppgaveid !== 'string') {
    return {
      notFound: true,
    };
  }

  // TODO applySession
  // if no sessy & not valid, redirect to login

  try {
    const [modiaContext, manuellOppgave] = await Promise.all([
      // TODO her er valid token over
      getModiaContext('TODO'),
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
}

export default Index;
