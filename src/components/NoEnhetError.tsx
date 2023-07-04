import React from 'react'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'

import styles from '../components/NoEnhetError.module.css'

const NoEnhetError = (): JSX.Element => {
    return (
        <section className={styles.root}>
            <main className={styles.main}>
                <Systemtittel>
                    Vi klarte ikke å hente informasjon om dine enheter. Prøv å last siden på nytt.
                </Systemtittel>
                <Normaltekst>Ta kontakt dersom feilen fortsetter.</Normaltekst>
            </main>
        </section>
    )
}

export default NoEnhetError
