import React, { ReactElement } from 'react'

import { OppgaveFetchingError, UlosteOppgaverFetchingError } from '../services/oppgaveService'

import { Alert } from './ds'

interface Props {
    errors: OppgaveFetchingError | UlosteOppgaverFetchingError
}

const ManuellOppgaveErrors = ({ errors }: Props): ReactElement => {
    return (
        <div>
            <Alert variant="error">{errors.message}</Alert>
        </div>
    )
}

export default ManuellOppgaveErrors
