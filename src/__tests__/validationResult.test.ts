import {
  ValidationResult,
  ValidationResultWithStatus,
  MessageForSender,
  MessageForUser,
} from '../types/validationresultTypes';
import { oppgaveEnRegel, oppgaveFlereRegler } from '../mock/data/sykmelding';

describe('validationResult', () => {
  it('Parser objektet riktig', () => {
    const valideringsresultatEnRegel = new ValidationResult(oppgaveEnRegel[0].validationResult);
    expect(valideringsresultatEnRegel.ruleHits).toEqual(oppgaveEnRegel[0].validationResult.ruleHits);
    expect(valideringsresultatEnRegel.status).toEqual(oppgaveEnRegel[0].validationResult.status);
  });

  describe('setStatus', () => {
    it('Endrer status når setStatus kalles', () => {
      const valideringsresultatEnRegel = new ValidationResult(oppgaveEnRegel[0].validationResult);
      expect(valideringsresultatEnRegel.status).toBe('MANUAL_PROCESSING');
      valideringsresultatEnRegel.setStatus(true);
      expect(valideringsresultatEnRegel.status).toBe('OK');
      valideringsresultatEnRegel.setStatus(false);
      expect(valideringsresultatEnRegel.status).toBe('INVALID');
    });
  });

  describe('setTilbakemeldinger', () => {
    it('Setter MessageForSender og MessageForUser når setTilbakemeldinger kalles på én regel', () => {
      const valideringsresultatEnRegel = new ValidationResult(oppgaveEnRegel[0].validationResult);
      const regel = valideringsresultatEnRegel.ruleHits[0].ruleName;
      valideringsresultatEnRegel.setTilbakemeldinger();
      expect(valideringsresultatEnRegel.ruleHits[0].messageForSender).toBe(MessageForSender[regel]);
      expect(valideringsresultatEnRegel.ruleHits[0].messageForUser).toBe(MessageForUser[regel]);
    });

    it('Setter MessageForSender og MessageForUser når setTilbakemeldinger kalles på flere regler', () => {
      const valideringsresultatFlereRegler = new ValidationResult(oppgaveFlereRegler[0].validationResult);
      valideringsresultatFlereRegler.setTilbakemeldinger();
      valideringsresultatFlereRegler.ruleHits.forEach(regel => {
        expect(regel.messageForSender).toBe(MessageForSender[regel.ruleName]);
        expect(regel.messageForUser).toBe(MessageForUser[regel.ruleName]);
      });
    });
  });
});

describe('validationResultWithStatus', () => {
  it('Parser objektet riktig', () => {
    const valideringsresultatEnRegelMedStatus = new ValidationResultWithStatus(oppgaveEnRegel[0].validationResult);
    expect(valideringsresultatEnRegelMedStatus.ruleHits[0].ruleName).toBe(
      oppgaveEnRegel[0].validationResult.ruleHits[0].ruleName,
    );
    expect(valideringsresultatEnRegelMedStatus.ruleHits[0].ruleStatus).toBe(
      oppgaveEnRegel[0].validationResult.ruleHits[0].ruleStatus,
    );
    expect(valideringsresultatEnRegelMedStatus.status).toBe(oppgaveEnRegel[0].validationResult.status);
  });

  describe('setBehandlet', () => {
    it('behandler årsak', () => {
      const valideringsresultatEnRegelMedStatus = new ValidationResultWithStatus(oppgaveEnRegel[0].validationResult);
      valideringsresultatEnRegelMedStatus.setBehandlet(valideringsresultatEnRegelMedStatus.ruleHits[0].ruleName, true);
      expect(
        valideringsresultatEnRegelMedStatus.behandlet.get(valideringsresultatEnRegelMedStatus.ruleHits[0].ruleName),
      ).toBe(true);
    });

    it('Øker antallBehandlet', () => {
      const valideringsresultatEnRegelMedStatus = new ValidationResultWithStatus(oppgaveEnRegel[0].validationResult);
      expect(valideringsresultatEnRegelMedStatus.antallBehandlet).toBe(0);
      valideringsresultatEnRegelMedStatus.setBehandlet(valideringsresultatEnRegelMedStatus.ruleHits[0].ruleName, true);
      expect(valideringsresultatEnRegelMedStatus.antallBehandlet).toBe(1);
    });

    it('Setter totalvurdering til true dersom det finnes én regel, og den er vurdert til true', () => {
      const valideringsresultatEnRegelMedStatus = new ValidationResultWithStatus(oppgaveEnRegel[0].validationResult);
      expect(valideringsresultatEnRegelMedStatus.totalVurdering).toBe(undefined);
      valideringsresultatEnRegelMedStatus.setBehandlet(valideringsresultatEnRegelMedStatus.ruleHits[0].ruleName, true);
      expect(valideringsresultatEnRegelMedStatus.totalVurdering).toBe(true);
    });

    it('Setter totalvurdering til true dersom det finnes flere regler, og alle er vurdert til true', () => {
      const valideringsresultatFlereReglerMedStatus = new ValidationResultWithStatus(
        oppgaveFlereRegler[0].validationResult,
      );
      expect(valideringsresultatFlereReglerMedStatus.totalVurdering).toBe(undefined);
      valideringsresultatFlereReglerMedStatus.setBehandlet(
        valideringsresultatFlereReglerMedStatus.ruleHits[0].ruleName,
        true,
      );
      expect(valideringsresultatFlereReglerMedStatus.totalVurdering).toBe(undefined);
      valideringsresultatFlereReglerMedStatus.setBehandlet(
        valideringsresultatFlereReglerMedStatus.ruleHits[1].ruleName,
        true,
      );
      expect(valideringsresultatFlereReglerMedStatus.totalVurdering).toBe(true);
    });

    it('Setter totalvurdering til false dersom det finnes flere regler, og alle er vurdert, hvor minst én er vurdert til false', () => {
      const valideringsresultatFlereReglerMedStatus = new ValidationResultWithStatus(
        oppgaveFlereRegler[0].validationResult,
      );
      expect(valideringsresultatFlereReglerMedStatus.totalVurdering).toBe(undefined);
      valideringsresultatFlereReglerMedStatus.setBehandlet(
        valideringsresultatFlereReglerMedStatus.ruleHits[0].ruleName,
        false,
      );
      expect(valideringsresultatFlereReglerMedStatus.totalVurdering).toBe(undefined);
      valideringsresultatFlereReglerMedStatus.setBehandlet(
        valideringsresultatFlereReglerMedStatus.ruleHits[1].ruleName,
        true,
      );
      expect(valideringsresultatFlereReglerMedStatus.totalVurdering).toBe(false);
    });
  });
});
