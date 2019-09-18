class RuleInfo {
    ruleName: string;
    messageForSender: string;
    messageForUser: string;
    constructor(ruleInfo) {
        this.ruleName = ruleInfo.ruleName;
        this.messageForSender = ruleInfo.messageForSender;
        this.messageForUser = ruleInfo.messageForUser;
    }
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
        this.rulesHits = validationResult.rulesHits.map( (ruleHit: RuleInfo) => { new RuleInfo(ruleHit) });
    }
}