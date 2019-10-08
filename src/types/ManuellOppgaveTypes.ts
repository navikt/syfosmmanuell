import { ValidationResultWithStatus } from './ValidationresultTypes';
import { Sykmelding } from './SykmeldingTypes';

export class ManuellOppgave {
    manOppgId: string;
    validationResult: ValidationResultWithStatus;
    receivedSykmelding: Sykmelding;

    constructor(manuellOppgave) {
        this.manOppgId = manuellOppgave.manuellOppgaveid;
        this.validationResult = new ValidationResultWithStatus(manuellOppgave.validationResult);
        this.receivedSykmelding = new Sykmelding(manuellOppgave.receivedSykmelding);
    }
}
