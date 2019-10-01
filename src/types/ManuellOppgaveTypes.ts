import { ValidationResultWithStatus } from './ValidationResultTypes';
import { Sykmelding } from './SykmeldingTypes';

export class ManuellOppgave {
    manOppgId: number;
    validationResult: ValidationResultWithStatus;
    sykmelding: Sykmelding;

    constructor(manuellOppgave) {
        this.manOppgId = manuellOppgave.manOppgId;
        this.validationResult = new ValidationResultWithStatus(manuellOppgave.validationResult);
        this.sykmelding = new Sykmelding(manuellOppgave.sykmelding);
    }
}
