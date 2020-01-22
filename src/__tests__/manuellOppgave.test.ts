import { ManuellOppgave } from '../types/manuellOppgaveTypes';
import { oppgaveEnRegel } from '../mock/data/sykmelding';

describe('manuellOppgave', () => {
  it('Parser objekt', () => {
    const manuellOppgave = new ManuellOppgave(oppgaveEnRegel[0]);
    expect(manuellOppgave).toHaveProperty('oppgaveid');
    expect(manuellOppgave.oppgaveid).toBe(oppgaveEnRegel[0].oppgaveid);
    expect(manuellOppgave).toHaveProperty('sykmelding');
    /* expect(JSON.stringify(manuellOppgave.sykmelding)).toBe(
      JSON.stringify(oppgaveEnRegel[0].receivedSykmelding.sykmelding),
    ); */
    expect(manuellOppgave).toHaveProperty('validationResult');
  });
});
