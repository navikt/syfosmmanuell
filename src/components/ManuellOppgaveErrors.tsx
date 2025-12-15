import React, { ReactElement } from 'react'
import { Alert } from '@navikt/ds-react'

import { OppgaveFetchingError, UlosteOppgaverFetchingError } from '../services/syfosmmanuell-backend-service'

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
