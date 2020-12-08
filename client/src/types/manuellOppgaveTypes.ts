import { ValidationResult } from './validationresultTypes';
import { Sykmelding } from './sykmeldingTypes';

export class ManuellOppgave {
  oppgaveid: number;
  sykmelding: Sykmelding;
  mottattDato: Date;
  personNrPasient: string;
  validationResult: ValidationResult;

  constructor(manuellOppgave: any) {
    this.oppgaveid = manuellOppgave.oppgaveid;
    this.sykmelding = new Sykmelding(manuellOppgave.sykmelding);
    this.mottattDato = new Date(manuellOppgave.mottattDato + 'Z'); // Lagret i databasen som utc, men mangler Z
    this.personNrPasient = manuellOppgave.personNrPasient;
    this.validationResult = new ValidationResult(manuellOppgave.validationResult);
  }
}
