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
    // eslint-disable-next-line prettier/prettier
    constructor(ruleInfo) {
        if (RuleNames[ruleInfo.ruleName as keyof RuleNames]) {
            this.ruleName = RuleNames[ruleInfo.ruleName as keyof RuleNames];
        } else {
            this.ruleName = ruleInfo.ruleName;
        }
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
    constructor(status: Status, rHits: RuleInfo[]) {
        this.status = status;
        this.ruleHits = rHits.map(ruleHit => new RuleInfo(ruleHit));
    }
}

export class ValidationResultWithStatus extends ValidationResult {
    behandlet: Map<RuleNames, boolean | null>;
    antallBehandlet: number;
    totalVurdering: boolean | null;

    // eslint-disable-next-line prettier/prettier
    constructor(validationResult) {
        super(validationResult.status, validationResult.ruleHits);
        if (validationResult.behandlet) {
            this.behandlet = new Map<RuleNames, boolean>(validationResult.behandlet);
            this.antallBehandlet = validationResult.antallBehandlet;
            this.totalVurdering = validationResult.totalVurdering;
        } else {
            const behandletMap = new Map<RuleNames, boolean>();
            validationResult.ruleHits.forEach(ruleHit => {
                const rName = ruleHit.ruleName as keyof RuleNames;
                behandletMap.set(RuleNames[rName], null);
            });
            this.behandlet = behandletMap;
            this.antallBehandlet = 0;
            this.totalVurdering = null;
        }
    }
    setBehandlet = (arsak: RuleNames, vurdering: boolean): void => {
        this.behandlet.set(arsak, vurdering);
        this.antallBehandlet++;
        if (vurdering == false) {
            this.totalVurdering = vurdering;
        }
        if (this.antallBehandlet == this.ruleHits.length && this.totalVurdering == null) {
            this.totalVurdering = true;
        }
    };
}
