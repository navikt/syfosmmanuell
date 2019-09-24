import { ValidationResult } from './ValidationResultTypes';
import { Sykmelding } from './SykmeldingTypes';

export class ManuellOppgave {
    manOppgId: number;
    valideringsResultat: ValidationResult;
    sykmelding: Sykmelding;

    constructor(manuellOppgave) {
        this.manOppgId = manuellOppgave.manOppgId;
        this.valideringsResultat = new ValidationResult(manuellOppgave.valideringsResultat);
        this.sykmelding = new Sykmelding(manuellOppgave.sykmelding);
    }
}
