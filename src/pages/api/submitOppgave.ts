import { logger } from '@navikt/next-logger'

import { submitOppgave } from '../../services/oppgaveService'
import { SubmitOppgaveBody } from '../../utils/submitUtils'
import { withAuthenticatedApi } from '../../auth/withAuth'

export default withAuthenticatedApi(async (req, res, accessToken): Promise<void> => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not supported' })
        return
    }

    const body: SubmitOppgaveBody = req.body

    try {
        await submitOppgave(body.oppgaveid, body.aktivEnhet, body.formValues, accessToken)
        res.status(200).json({ message: 'Oppgave submitted successfully' })
        return
    } catch (e) {
        logger.error(e)
        res.status(500).json({ message: 'Unable to submit oppgave' })
        return
    }
})
