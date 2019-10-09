import { ValidationResultWithStatus } from './ValidationresultTypes';
import { Sykmelding } from './SykmeldingTypes';

export class ManuellOppgave {
    manuellOppgaveid: string;
    validationResult: ValidationResultWithStatus;
    sykmelding: Sykmelding;

    constructor(manuellOppgave) {
        this.manuellOppgaveid = manuellOppgave.manuellOppgaveid;
        this.validationResult = new ValidationResultWithStatus(manuellOppgave.validationResult);
        this.sykmelding = manuellOppgave.receivedSykmelding
            ? new Sykmelding(manuellOppgave.receivedSykmelding.sykmelding)
            : new Sykmelding(manuellOppgave.sykmelding);
    }
}
