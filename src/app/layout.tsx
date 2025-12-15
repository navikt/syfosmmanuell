import '../global.css'

import React, { PropsWithChildren } from 'react'
import { Metadata } from 'next'

import ModiaHeader from '../components/modiaheader/ModiaHeader'
import { getModiaContext } from '../services/modia-service'
import NoEnhetError from '../components/NoEnhetError'

import Providers from './_providers'
import Preload from './_preload'

export const metadata: Metadata = {
    title: 'Manuell vurdering av tilbakedatert sykmelding',
    description: 'Intern applikasjon for digitalisering vurdering av tilbakedatert sykmelding',
}

export default async function RootLayout({ children }: PropsWithChildren) {
    const modiaContext = await getModiaContext()

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
