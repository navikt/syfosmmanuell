import { ValidationResult } from './validationresultTypes';
import { Sykmelding } from './sykmeldingTypes';

export class ReceivedSykmelding {
  sykmelding: Sykmelding;
  mottattDato: Date;
  personNrPasient: string;

  constructor(receivedSykmelding: any) {
    this.sykmelding = new Sykmelding(receivedSykmelding.sykmelding);
    this.mottattDato = new Date(receivedSykmelding.mottattDato + 'Z'); // Lagret i databasen som utc, men mangler Z
    this.personNrPasient = receivedSykmelding.personNrPasient;
  }
}

export class ManuellOppgave {
  oppgaveid: number;
  validationResult: ValidationResult;
  receivedSykmelding: ReceivedSykmelding;

  constructor(manuellOppgave: any) {
    this.oppgaveid = manuellOppgave.oppgaveid;
    this.validationResult = new ValidationResult(manuellOppgave.validationResult);
    this.receivedSykmelding = new ReceivedSykmelding(manuellOppgave.receivedSykmelding);
  }
}
