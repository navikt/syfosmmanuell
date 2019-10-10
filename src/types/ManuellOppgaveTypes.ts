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
        this.sykmelding = manuellOppgave.sykmelding
            ? new Sykmelding(manuellOppgave.sykmelding)
            : new Sykmelding(manuellOppgave.receivedSykmelding.sykmelding);
        this.sendInnValidering = manuellOppgave.sendInnValidering ? manuellOppgave.sendInnValidering : false;
    }

    setSendInnValidering = (status: boolean): void => {
        this.sendInnValidering = status;
    };
}
