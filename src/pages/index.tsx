import React, { useContext } from 'react'
import { GetServerSidePropsResult } from 'next'
import dynamic from 'next/dynamic'
import { Loader } from '@navikt/ds-react'

import { ManuellOppgave } from '../types/manuellOppgave'
import { getOppgave, OppgaveFetchingError } from '../services/oppgaveService'
import { getModiaContext } from '../services/modiaService'
import { StoreContext } from '../data/store'
import { withAuthenticatedPage } from '../auth/withAuth'
import NoEnhetError from '../components/NoEnhetError'
import ManuellOppgaveErrors from '../components/ManuellOppgaveErrors'

import { BasePageRequiredProps } from './_app'

const MainContent = dynamic(() => import('../components/MainContent'), {
    ssr: false,
    loading: () => <Loader size="3xlarge" />,
})

interface IndexProps extends BasePageRequiredProps {
    manuellOppgave: ManuellOppgave | OppgaveFetchingError
}

function Index({ manuellOppgave }: IndexProps) {
    const { aktivEnhet } = useContext(StoreContext)

    if (!aktivEnhet) {
        return <NoEnhetError />
    } else if ('errorType' in manuellOppgave) {
        return <ManuellOppgaveErrors errors={manuellOppgave} />
    } else {
        return <MainContent manuellOppgave={manuellOppgave} aktivEnhet={aktivEnhet} />
    }
}

export const getServerSideProps = withAuthenticatedPage(
    async ({ query }, accessToken): Promise<GetServerSidePropsResult<IndexProps>> => {
        if (!query?.oppgaveid || typeof query.oppgaveid !== 'string') {
            return {
                notFound: true,
            }
        }

        const [modiaContext, manuellOppgave] = await Promise.all([
            getModiaContext(accessToken),
            getOppgave(query.oppgaveid, accessToken),
        ])

        if ('errorType' in manuellOppgave) {
            if (manuellOppgave.errorType === 'OPPGAVE_NOT_FOUND') {
                return {
                    notFound: true,
                }
            }
        }

        return {
            props: {
                modiaContext,
                manuellOppgave,
            },
        }
    },
)

export default Index
