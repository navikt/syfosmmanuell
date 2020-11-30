import { ManuellOppgave } from '../types/manuellOppgaveTypes';
import { oppgaveEnRegel } from '../mock/data/manuellOppgave';

describe('manuellOppgave', () => {
  it('Parser objekt', () => {
    const manuellOppgave = new ManuellOppgave(oppgaveEnRegel[0]);
    expect(manuellOppgave).toHaveProperty('oppgaveid');
    expect(manuellOppgave.oppgaveid).toBe(oppgaveEnRegel[0].oppgaveid);
    expect(manuellOppgave).toHaveProperty('receivedSykmelding');
    /* expect(JSON.stringify(manuellOppgave.sykmelding)).toBe(
      JSON.stringify(oppgaveEnRegel[0].receivedSykmelding.sykmelding),
    ); */
    expect(manuellOppgave).toHaveProperty('validationResult');
  });

  describe('ReceivedSykmelding', () => {
    it('Parser riktig mottattDato', () => {
      const manuellOppgave = new ManuellOppgave(oppgaveEnRegel[0]);
      expect(manuellOppgave.mottattDato.toISOString()).toEqual('2020-02-24T15:27:54.000Z');
    })
  })
}); 
