/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod';
import { Sykmelding } from './sykmelding';
import { ValidationResult } from './validationResult';

export const ManuellOppgave = z.object({
  oppgaveid: z.number(),
  sykmelding: Sykmelding,
  // TODO verify date format?????
  mottattDato: z.string(),
  personNrPasient: z.string(),
  validationResult: ValidationResult,
});

export type ManuellOppgave = z.infer<typeof ManuellOppgave>;
