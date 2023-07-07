import React, { ReactElement } from 'react'
import { Alert } from '@navikt/ds-react'

import { OppgaveFetchingError, UlosteOppgaverFetchingError } from '../services/oppgaveService'

interface Props {
    errors: OppgaveFetchingError | UlosteOppgaverFetchingError
}

const ManuellOppgaveErrors = ({ errors }: Props): ReactElement => {
    return (
        <div className="mt-12">
            <Alert variant="error">{errors.message}</Alert>
        </div>
    )
}

export default ManuellOppgaveErrors
