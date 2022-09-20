import { z } from 'zod';

import { Sykmelding } from './sykmelding';
import { ValidationResult } from './validationResult';
import { DateString } from './shared';

export const ManuellOppgave = z.object({
    oppgaveid: z.number(),
    sykmelding: Sykmelding,
    mottattDato: DateString,
    personNrPasient: z.string(),
    validationResult: ValidationResult,
});

export type ManuellOppgave = z.infer<typeof ManuellOppgave>;
