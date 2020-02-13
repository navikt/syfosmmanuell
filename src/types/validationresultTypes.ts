export enum RuleNamesDescription {
  BEHANDLER_KI_FT_MT_BENYTTER_ANNEN_DIAGNOSEKODE_ENN_L = 'Manuellterapeut/kiropraktor eller fysioterapeut med autorisasjon har angitt annen diagnose enn kapittel L (muskel- og skjelettsykdommer)',
  TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE = 'Sykmeldingen er tilbakedatert',
  TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE = 'Sykmelding i løpende sykefravær er tilbakedatert',
}

export enum MessageForSender {
  BEHANDLER_KI_FT_MT_BENYTTER_ANNEN_DIAGNOSEKODE_ENN_L = 'Behandler er manuellterapeut/kiropraktor eller fysioterapeut med autorisasjon har angitt annen diagnose enn kapitel L (muskel og skjelettsykdommer)',
  TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE = 'Første sykmelding er tilbakedatert og felt 11.2 (begrunnelseIkkeKontakt) er utfylt',
  TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE = 'Sykmeldingen er tilbakedatert og felt 11.2 (begrunnelseIkkeKontakt) er utfylt',
}

export enum MessageForUser {
  BEHANDLER_KI_FT_MT_BENYTTER_ANNEN_DIAGNOSEKODE_ENN_L = 'Behandler er manuellterapeut/kiropraktor eller fysioterapeut med autorisasjon har angitt annen diagnose enn kapitel L (muskel og skjelettsykdommer)',
  TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE = 'Første sykmelding er tilbakedatert og årsak for tilbakedatering er angitt.',
  TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE = 'Sykmeldingen er tilbakedatert og årsak for tilbakedatering er angitt',
}

export type RuleNames =
  | 'BEHANDLER_KI_FT_MT_BENYTTER_ANNEN_DIAGNOSEKODE_ENN_L'
  | 'TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE'
  | 'TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE';

class RuleInfo {
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
    this.ruleHits = this.ruleHits.map(regel => {
      regel.messageForSender = MessageForSender[regel.ruleName];
      regel.messageForUser = MessageForUser[regel.ruleName];
      return regel;
    });
  };
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
      validationResult.ruleHits.forEach((ruleHit: RuleNames) => {
        behandletMap.set(ruleHit, undefined);
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
    this.setRuleHitStatus(arsak, vurdering);

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
