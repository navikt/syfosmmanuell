import { ValidationResultWithStatus } from './ValidationresultTypes';
import { Sykmelding } from './SykmeldingTypes';

export class ManuellOppgave {
    manuellOppgaveid: number;
    validationResult: ValidationResultWithStatus;
    sykmelding: Sykmelding;
    sendInnValidering: boolean;

    constructor(manuellOppgave) {
        this.manuellOppgaveid = manuellOppgave.oppgaveid;
        this.validationResult = new ValidationResultWithStatus(manuellOppgave.validationResult);
        this.sykmelding = manuellOppgave.receivedSykmelding
            ? new Sykmelding(manuellOppgave.receivedSykmelding.sykmelding)
            : new Sykmelding(manuellOppgave.sykmelding);
        this.sendInnValidering = manuellOppgave.sendInnValidering ? manuellOppgave.sendInnValidering : false;
    }

    setSendInnValidering = (status: boolean): void => {
        this.sendInnValidering = status;
    };
}
