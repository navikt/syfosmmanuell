import '../global.css'

import React, { PropsWithChildren } from 'react'
import { headers } from 'next/headers'
import { Metadata } from 'next'

import { getUserToken, verifyUserLoggedIn } from '../auth/authentication'
import ModiaHeader from '../components/modiaheader/ModiaHeader'
import { getModiaContext } from '../services/modiaService'
import NoEnhetError from '../components/NoEnhetError'

import Providers from './_providers'
import Preload from './_preload'

export const metadata: Metadata = {
    title: 'Manuell vurdering av tilbakedatert sykmelding',
    description: 'Intern applikasjon for digitalisering vurdering av tilbakedatert sykmelding',
}

export default async function RootLayout({ children }: PropsWithChildren) {
    await verifyUserLoggedIn()

    const modiaContext = await getModiaContext(getUserToken(headers()))

    return (
        <html lang="no">
            <Preload />
            <Providers modiaContext={modiaContext}>
                <body className="bg-bg-subtle">
                    <ModiaHeader modiaContext={modiaContext} />
                    <main id="maincontent" tabIndex={-1} className="mx-auto min-h-screen max-w-3xl bg-white p-8">
                        {'errorType' in modiaContext ? <NoEnhetError /> : children}
                    </main>
                </body>
            </Providers>
        </html>
    )
}
