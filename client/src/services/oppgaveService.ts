import { ManuellOppgave } from '../types/manuellOppgave';
import { manuellOppgave } from '../mock/data/manuellOppgave';

export async function getOppgave(oppgaveId: string): Promise<ManuellOppgave> {
  if (process.env.NODE_ENV === 'development') {
    return ManuellOppgave.parse(manuellOppgave);
  }

  // TODO EDB
  throw new Error('Now yet impmelementy');
}
