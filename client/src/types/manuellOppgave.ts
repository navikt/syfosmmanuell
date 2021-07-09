/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod';
import { Sykmelding } from './sykmelding';
import { ValidationResult } from './validationResult';

export const ManuellOppgave = z.object({
  oppgaveid: z.number(),
  sykmelding: Sykmelding,
  mottattDato: z.string().transform((arg) => new Date(arg)),
  personNrPasient: z.string(),
  validationResult: ValidationResult,
});
export type ManuellOppgave = z.infer<typeof ManuellOppgave>;
