export enum RuleNames {
  BEHANDLER_KI_FT_MT_BENYTTER_ANNEN_DIAGNOSEKODE_ENN_L = 'Manuellterapeut/kiropraktor eller fysioterapeut med autorisasjon har angitt annen diagnose enn kapittel L (muskel- og skjelettsykdommer)',
  TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE = 'Sykmeldingen er tilbakedatert med begrunnelse',
  TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE = 'Sykmelding i løpende sykefravær er tilbakedatert med begrunnelse',
}

class RuleInfo {
  ruleName: RuleNames;
  messageForSender: string;
  messageForUser: string;
  ruleStatus: Status;

  constructor(ruleInfo: any) {
    if (RuleNames[ruleInfo.ruleName as keyof typeof RuleNames]) {
      this.ruleName = RuleNames[ruleInfo.ruleName as keyof typeof RuleNames];
    } else {
      this.ruleName = ruleInfo.ruleName;
    }
    this.messageForSender = ruleInfo.messageForSender;
    this.messageForUser = ruleInfo.messageForUser;
    this.ruleStatus = ruleInfo.ruleStatus;
  }
}

export enum Status {
  OK = 'OK',
  MANUAL_PROCESSING = 'MANUAL_PROCESSING',
  INVALID = 'INVALID',
}

export class ValidationResult {
  status: Status;
  ruleHits: RuleInfo[];

  constructor(validationResult: any) {
    this.status = Status[validationResult.status as keyof typeof Status];
    this.ruleHits = validationResult.ruleHits.map((ruleHit: any) => new RuleInfo(ruleHit));
  }
}

export class ValidationResultWithStatus extends ValidationResult {
  behandlet: Map<RuleNames, boolean | undefined>;
  antallBehandlet: number;
  totalVurdering: boolean | undefined;

  constructor(validationResult: any) {
    super(validationResult);
    if (validationResult.behandlet) {
      this.behandlet = new Map<RuleNames, boolean | undefined>(validationResult.behandlet);
      this.antallBehandlet = validationResult.antallBehandlet;
      this.totalVurdering = validationResult.totalVurdering;
    } else {
      const behandletMap = new Map<RuleNames, boolean | undefined>();
      validationResult.ruleHits.forEach((ruleHit: any) => {
        const rName = ruleHit.ruleName as keyof typeof RuleNames;
        behandletMap.set(RuleNames[rName], undefined);
      });
      this.behandlet = behandletMap;
      this.antallBehandlet = 0;
      this.totalVurdering = undefined;
    }
  }

  // Brukes for å sette state for vurdering av hvert enkelt regelutslag
  setBehandlet = (arsak: RuleNames, vurdering: boolean): ValidationResultWithStatus => {
    this.behandlet.set(arsak, vurdering);
    this.antallBehandlet++;
    
    if (this.antallBehandlet === this.ruleHits.length && this.totalVurdering == null) {
      let antallTrue = 0;
      this.behandlet.forEach((value, key) => {
        if (value === false) {
          this.totalVurdering = false;
          return this;
        } else if (value === true) {
          antallTrue++;
        }
      });

      if (antallTrue === this.ruleHits.length) this.totalVurdering = true;
    }
    return this;
  };
}
