import { ValidationResultWithStatus } from './ValidationResultTypes';
import { Sykmelding } from './SykmeldingTypes';

export class ManuellOppgave {
    manOppgId: number;
    valideringsResultat: ValidationResultWithStatus;
    sykmelding: Sykmelding;

    constructor(manuellOppgave) {
        this.manOppgId = manuellOppgave.manOppgId;
        this.valideringsResultat = new ValidationResultWithStatus(manuellOppgave.validationResult);
        this.sykmelding = new Sykmelding(manuellOppgave.sykmelding);
    }
}
