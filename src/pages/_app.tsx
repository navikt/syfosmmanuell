import { AppProps as NextAppProps } from 'next/app'
import React, { PropsWithChildren, ReactElement } from 'react'

import '../global.css'

import StoreProvider from '../data/store'
import { ModiaContext, ModiaContextError } from '../services/modiaService'
import ModiaHeader from '../components/modiaheader/ModiaHeader'

export interface BasePageRequiredProps {
    modiaContext?: ModiaContext | ModiaContextError
}

export interface AppProps<T> extends Omit<NextAppProps<T>, 'pageProps'> {
    pageProps: PropsWithChildren<unknown> & Partial<BasePageRequiredProps>
}

export default function MyApp({ Component, pageProps }: AppProps<BasePageRequiredProps>): ReactElement {
    return (
        <StoreProvider modiaContext={pageProps.modiaContext}>
            <ModiaHeader modiaContext={pageProps.modiaContext} />
            <section className="flex justify-center">
                <main>
                    <Component {...pageProps} />
                </main>
            </section>
        </StoreProvider>
    )
}
