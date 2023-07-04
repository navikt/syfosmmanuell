import React from 'react'
import { Undertittel } from 'nav-frontend-typografi'

import { OppgaveFetchingError } from '../services/oppgaveService'

import styles from './ManuellOppgaveErrors.module.css'

interface Props {
    errors: OppgaveFetchingError
}

const ManuellOppgaveErrors = ({ errors }: Props): JSX.Element => {
    return (
        <div className={styles.root}>
            <Undertittel>{errors.message}</Undertittel>
        </div>
    )
}

export default ManuellOppgaveErrors
