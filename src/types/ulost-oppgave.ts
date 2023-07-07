import { z } from 'zod'

import { DateString } from './shared'

export type UlostOppgave = z.infer<typeof UlostOppgaveSchema>
export const UlostOppgaveSchema = z.object({
    oppgaveId: z.number(),
    mottattDato: DateString,
})
