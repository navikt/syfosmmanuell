export enum RuleNames {
    BEHANDLER_KI_FT_MT_BENYTTER_ANNEN_DIAGNOSEKODE_ENN_L = 'Manuellterapeut/kiropraktor eller fysioterapeut med autorisasjon har angitt annen diagnose enn kapittel L (muskel- og skjelettsykdommer)',
    TILBAKEDATERT_MED_BEGRUNNELSE_FORSTE_SYKMELDING = 'Sykmeldingen er tilbakedatert med begrunnelse',
    TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE = 'Sykmelding i løpende sykefravær er tilbakedatert med begrunnelse',
    AVVENTENDE_SYKMELDING_KOMBINERT = 'To perioder',
}

class RuleInfo {
    ruleName: RuleNames;
    messageForSender: string;
    messageForUser: string;
    constructor(ruleInfo) {
        const rName = ruleInfo.ruleName as keyof RuleNames;
        this.ruleName = RuleNames[rName];
        this.messageForSender = ruleInfo.messageForSender;
        this.messageForUser = ruleInfo.messageForUser;
    }
}

enum Status {
    OK,
    MANUAL_PROCESSING,
    INVALID,
}

export class ValidationResult {
    status: Status;
    ruleHits: RuleInfo[];
    constructor(validationResult) {
        this.status = validationResult.status;
        this.ruleHits = validationResult.ruleHits.map(ruleHit => new RuleInfo(ruleHit));
    }
}
