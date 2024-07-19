import '../global.css'

import React, { PropsWithChildren } from 'react'
import { headers } from 'next/headers'

import { getUserToken, verifyUserLoggedIn } from '../auth/authentication'
import ModiaHeader from '../components/modiaheader/ModiaHeader'
import { getModiaContext } from '../services/modiaService'
import NoEnhetError from '../components/NoEnhetError'

import Providers from './_providers'
import Preload from './_preload'

export default async function RootLayout({ children }: PropsWithChildren) {
    await verifyUserLoggedIn()

    const modiaContext = await getModiaContext(getUserToken(headers()))

    return (
        <html lang="en">
            <Preload />
            <Providers modiaContext={modiaContext}>
                <body className="bg-bg-subtle">
                    <ModiaHeader modiaContext={modiaContext} />
                    <main
                        id="maincontent"
                        role="main"
                        tabIndex={-1}
                        className="mx-auto min-h-screen max-w-3xl bg-white p-8"
                    >
                        {'errorType' in modiaContext ? <NoEnhetError /> : children}
                    </main>
                </body>
            </Providers>
        </html>
    )
}
