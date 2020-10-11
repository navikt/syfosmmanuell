import { ValidationResult, MessageForSender, MessageForUser } from '../types/validationresultTypes';
import { oppgaveEnRegel, oppgaveFlereRegler } from '../mock/data/sykmelding';

describe.skip('validationResult', () => {
  it('Parser objektet riktig og setter messageForUser og messageForSender', () => {
    const valideringsresultatEnRegel = new ValidationResult(oppgaveEnRegel[0].validationResult);

    valideringsresultatEnRegel.ruleHits.forEach((regel) => {
      expect(regel.messageForSender).toEqual(MessageForSender[regel.ruleName]);
      expect(regel.messageForUser).toEqual(MessageForUser[regel.ruleName]);
    });
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
      valideringsresultatFlereRegler.ruleHits.forEach((regel) => {
        expect(regel.messageForSender).toBe(MessageForSender[regel.ruleName]);
        expect(regel.messageForUser).toBe(MessageForUser[regel.ruleName]);
      });
    });
  });
});
