import 'next-logger'
import '../global.css'

import React, { PropsWithChildren } from 'react'
import { headers } from 'next/headers'

import { getUserToken, verifyUserLoggedIn } from '../auth/authentication'
import ModiaHeader from '../components/modiaheader/ModiaHeader'
import { getModiaContext } from '../services/modiaService'
import NoEnhetError from '../components/NoEnhetError'

import Providers from './_providers'

export default async function RootLayout({ children }: PropsWithChildren) {
    await verifyUserLoggedIn()

    const modiaContext = await getModiaContext(getUserToken(headers()))

    return (
        <html lang="en">
            <head>
                <link
                    rel="preload"
                    href="https://cdn.nav.no/aksel/fonts/SourceSans3-normal.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
            </head>
            <Providers modiaContext={modiaContext}>
                <body className="bg-bg-subtle">
                    <ModiaHeader modiaContext={modiaContext} />
                    <main
                        id="maincontent"
                        role="main"
                        tabIndex={-1}
                        className="mx-auto min-h-screen max-w-3xl bg-white p-8"
                    >
                        {'errorType' in modiaContext || modiaContext.aktivEnhet == null ? <NoEnhetError /> : children}
                    </main>
                </body>
            </Providers>
        </html>
    )
}
