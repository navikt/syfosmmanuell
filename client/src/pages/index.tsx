import React from 'react';
import MainContent from '../components/MainContent';
import { ManuellOppgave } from '../types/manuellOppgave';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getOppgave } from '../services/oppgaveService';
import { getModiaContext } from '../services/modiaService';
import ModiaHeader from '../components/modiaheader/ModiaHeader';
import ErrorFallback from '../components/errorFallback/ErrorFallback';
import { BasePageRequiredProps } from './_app';

interface IndexProps extends BasePageRequiredProps {
  manuellOppgave: ManuellOppgave | null;
}

function Index({ manuellOppgave, modiaContext }: IndexProps) {
  return (
    <section>
      <ModiaHeader modiaContext={modiaContext} />
      <main>
        {manuellOppgave && <MainContent manuellOppgave={manuellOppgave} />}
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

  try {
    const [modiaContext, manuellOppgave] = await Promise.all([getModiaContext(), getOppgave(query.oppgaveid)]);

    return {
      props: {
        modiaContext,
        manuellOppgave,
      },
    };
  } catch (e) {
    // TODO logger
    // logger.error(e as any);

    return {
      props: {
        manuellOppgave: null,
        modiaContext: null,
      },
    };
  }
}

export default Index;
