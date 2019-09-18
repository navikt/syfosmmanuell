class RuleInfo {
    ruleName: ruleNames;
    messageForSender: string;
    messageForUser: string;
    constructor(ruleInfo) {
        this.ruleName = ruleInfo.ruleName;
        this.messageForSender = ruleInfo.messageForSender;
        this.messageForUser = ruleInfo.messageForUser;
    }
}

enum ruleNames {
    BEHANDLER_KI_FT_MT_BENYTTER_ANNEN_DIAGNOSEKODE_ENN_L = "Manuellterapeut/kiropraktor eller fysioterapeut med autorisasjon har angitt annen diagnose enn kapittel L (muskel- og skjelettsykdommer)",
    TILBAKEDATERT_MED_BEGRUNNELSE_FORSTE_SYKMELDING = "Sykmeldingen er tilbakedatert med begrunnelse",
    TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE = "Sykmelding i løpende sykefravær er tilbakedatert med begrunnelse",
    OPPHOLD_MELLOM_PERIODER = "En avventende sykmeleding kan bare inneholde én periode"
}

enum Status {
    OK,
    MANUAL_PROCESSING,
    INVALID
}

export class ValidationResult {
    status: Status;
    rulesHits: RuleInfo[];
    constructor(validationResult) {
        this.status = validationResult.status;
        this.rulesHits = validationResult.rulesHits.map( (ruleHit: RuleInfo) => new RuleInfo(ruleHit) );
    }
}