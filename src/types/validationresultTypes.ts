export enum RuleNamesDescription {
  TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE = 'Sykmeldingen er tilbakedatert',
  TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE = 'Sykmelding i løpende sykefravær er tilbakedatert',
}

export enum MessageForSender {
  TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE = 'Sykmeldingen er tilbakedatert uten at det kommer tydelig nok frem hvorfor dette var nødvendig. Sykmeldingen er derfor avvist. Pasienten har fått beskjed.',
  TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE = 'Sykmeldingen er tilbakedatert uten at det kommer tydelig nok frem hvorfor dette var nødvendig. Sykmeldingen er derfor avvist. Pasienten har fått beskjed.',
}

export enum MessageForUser {
  TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE = 'Sykmeldingen er tilbakedatert uten at det kommer tydelig frem hvorfor dette var nødvendig.',
  TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE = 'Sykmeldingen er tilbakedatert uten at det kommer tydelig frem hvorfor dette var nødvendig.',
}

export type RuleNames =
  | 'TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE'
  | 'TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE';

export class RuleInfo {
  ruleName: RuleNames;
  ruleStatus: Status;
  messageForUser: string;
  messageForSender: string;

  constructor(ruleInfo: any) {
    this.ruleName = ruleInfo.ruleName;
    this.ruleStatus = ruleInfo.ruleStatus;
    this.messageForUser = ruleInfo.messageForUser;
    this.messageForSender = ruleInfo.messageForSender;
  }
}

export type Status = 'OK' | 'MANUAL_PROCESSING' | 'INVALID';

export class ValidationResult {
  status: Status;
  ruleHits: RuleInfo[];

  constructor(validationResult: any) {
    this.status = validationResult.status;
    this.ruleHits = validationResult.ruleHits.map((ruleHit: any) => new RuleInfo(ruleHit));
    this.setTilbakemeldinger();
  }

  setStatus = (vurdering: boolean) => {
    this.status = vurdering ? 'OK' : 'INVALID';
  };

  setRuleHitStatus = (arsak: RuleNames, vurdering: boolean) => {
    this.ruleHits.find((ruleHit, index, obj) => {
      if (ruleHit.ruleName === arsak) {
        obj[index].ruleStatus = vurdering ? 'OK' : 'INVALID';
        return true;
      }
      return false;
    });
  };

  setTilbakemeldinger = () => {
    this.ruleHits = this.ruleHits.map((regel) => {
      regel.messageForSender = MessageForSender[regel.ruleName];
      regel.messageForUser = MessageForUser[regel.ruleName];
      return regel;
    });
  };
}
