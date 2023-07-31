'use server'

import { headers } from 'next/headers'
import { z } from 'zod'

import { submitOppgave } from '../services/oppgaveService'
import { getToken } from '../auth/authentication'

import { FormShape } from './form/Form'

export type ValidatedFormValues = z.infer<typeof FormSchema>
const FormSchema = z.object({
    status: z.union([z.literal('GODKJENT'), z.literal('GODKJENT_MED_MERKNAD'), z.literal('AVVIST')]),
    merknad: z
        .union([z.literal('UGYLDIG_TILBAKEDATERING'), z.literal('TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER')])
        .optional(),
})

export async function submitOppgaveAction(oppgaveId: number, aktivEnhet: string, formData: FormShape) {
    const token = getToken(headers())
    const formValues = FormSchema.parse(formData)

    await submitOppgave(oppgaveId, aktivEnhet, formValues, token)
}
