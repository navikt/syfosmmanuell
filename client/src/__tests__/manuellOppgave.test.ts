import { ManuellOppgave } from '../types/manuellOppgaveTypes';
import { manuellOppgave } from '../mock/data/manuellOppgave';

describe('manuellOppgave', () => {
  it('Parses manuelloppgave without throwing error', () => {
    expect(() => {
      new ManuellOppgave(manuellOppgave);
    }).not.toThrowError();
  });

  it('Throws error when parsing incomplete manuelloppgave', () => {
    expect(() => {
      const incompleteManuellOppgave = {};
      new ManuellOppgave(incompleteManuellOppgave);
    }).toThrowError();
  });

  it('Adds "Z" to mottatDato because backend sends without', () => {
    const manOppgave = new ManuellOppgave(manuellOppgave);
    expect(manOppgave.mottattDato.toISOString()).toEqual('2020-02-24T15:27:54.000Z');
  });
});
