import { z } from 'zod'

const RuleNames = z.enum([
    'TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE',
    'TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE',
    'TILBAKEDATERT_UTEN_BEGRUNNELSE_FORLENGELSE_ICD_10',
    'OVER_30_DAGER_MED_BEGRUNNELSE',
    'OVER_30_DAGER_SPESIALISTHELSETJENESTEN',
    'INNTIL_30_DAGER_MED_BEGRUNNELSE',
    'OVER_1_DAGER_MED_BEGRUNNELSE',
    'OVER_1_MND_MED_BEGRUNNELSE',
    'MINDRE_ENN_1_MAANED_MED_BEGRUNNELSE',
    'OVER_1_MND_SPESIALISTHELSETJENESTEN',
    'INNTIL_1_MAANDE_MED_BEGRUNNELSE'
])

const Status = z.enum(['OK', 'MANUAL_PROCESSING', 'INVALID'])

export const RuleInfo = z.object({
    ruleName: RuleNames,
    ruleStatus: Status,
    messageForUser: z.string(),
    messageForSender: z.string(),
})
export type RuleInfo = z.infer<typeof RuleInfo>

export const ValidationResult = z.object({
    status: Status,
    ruleHits: z.array(RuleInfo),
})
export type ValidationResult = z.infer<typeof ValidationResult>
