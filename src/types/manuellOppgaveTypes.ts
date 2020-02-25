import { ValidationResultWithStatus } from './validationresultTypes';
import { Sykmelding } from './sykmeldingTypes';

export class ReceivedSykmelding {
  sykmelding: Sykmelding;
  mottattDato: Date;
  constructor(receivedSykmelding: any) {
    this.sykmelding = new Sykmelding(receivedSykmelding.sykmelding);
    this.mottattDato = new Date(receivedSykmelding.mottattDato + 'Z'); // Lagret i databasen som utc, men mangler Z
  }
}

export class ManuellOppgave {
  oppgaveid: number;
  validationResult: ValidationResultWithStatus;
  receivedSykmelding: ReceivedSykmelding;

  constructor(manuellOppgave: any) {
    this.oppgaveid = manuellOppgave.oppgaveid;
    this.validationResult = new ValidationResultWithStatus(manuellOppgave.validationResult);
    this.receivedSykmelding = new ReceivedSykmelding(manuellOppgave.receivedSykmelding);
  }
}
