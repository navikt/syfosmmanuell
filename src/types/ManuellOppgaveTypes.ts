import { ValidationResultWithStatus } from './ValidationresultTypes';
import { Sykmelding } from './SykmeldingTypes';

export class ManuellOppgave {
    manOppgId: string;
    validationResult: ValidationResultWithStatus;
    sykmelding: Sykmelding;
    sendInnValidering: boolean;

    constructor(manuellOppgave) {
        this.manOppgId = manuellOppgave.manOppgId;
        this.validationResult = new ValidationResultWithStatus(manuellOppgave.validationResult);
        this.sykmelding = new Sykmelding(manuellOppgave.sykmelding);
        this.sendInnValidering = manuellOppgave.sendInnValidering ? manuellOppgave.sendInnValidering : false;
    }

    setSendInnValidering = (status: boolean): void => {
        this.sendInnValidering = status;
    };
}
