'use server'

import * as z from 'zod'

import { submitOppgave } from '../services/syfosmmanuell-backend-service'

import { FormShape } from './form/Form'

export type ValidatedFormValues = z.infer<typeof FormSchema>
const FormSchema = z.object({
    status: z.union([
        z.literal('GODKJENT'),
        z.literal('DELVIS_GODKJENT'),
        z.literal('TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER'),
        z.literal('UGYLDIG_TILBAKEDATERING'),
    ]),
})

export async function submitOppgaveAction(oppgaveId: number, aktivEnhet: string, formData: FormShape) {
    const formValues = FormSchema.parse(formData)

    await submitOppgave(oppgaveId, aktivEnhet, formValues)
}
