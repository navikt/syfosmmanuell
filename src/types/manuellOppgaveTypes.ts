import { ValidationResultWithStatus } from './validationresultTypes';
import { Sykmelding } from './sykmeldingTypes';

export class ManuellOppgave {
  oppgaveid: number;
  validationResult: ValidationResultWithStatus;
  sykmelding: Sykmelding;

  constructor(manuellOppgave: any) {
    this.oppgaveid = manuellOppgave.oppgaveid;
    this.validationResult = new ValidationResultWithStatus(manuellOppgave.validationResult);
    this.sykmelding = manuellOppgave.receivedSykmelding
      ? new Sykmelding(manuellOppgave.receivedSykmelding.sykmelding)
      : new Sykmelding(manuellOppgave.sykmelding);
  }
}
