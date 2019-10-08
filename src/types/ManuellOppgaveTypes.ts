import { ValidationResultWithStatus } from './ValidationresultTypes';
import { Sykmelding } from './SykmeldingTypes';

export class ManuellOppgave {
    manOppgId: string;
    validationResult: ValidationResultWithStatus;
    sykmelding: Sykmelding;

    constructor(manuellOppgave) {
        this.manOppgId = manuellOppgave.manuellOppgaveid;
        this.validationResult = new ValidationResultWithStatus(manuellOppgave.validationResult);
        this.sykmelding = new Sykmelding(manuellOppgave.receivedSykmelding);
    }
}
