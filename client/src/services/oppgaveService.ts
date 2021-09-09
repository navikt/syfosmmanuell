import { ManuellOppgave } from '../types/manuellOppgave';
import { manuellOppgave } from '../mock/data/manuellOppgave';
import { FormShape } from '../components/form/Form';

export async function getOppgave(oppgaveId: string): Promise<ManuellOppgave> {
  if (process.env.NODE_ENV === 'development') {
    return ManuellOppgave.parse(manuellOppgave);
  }

  // TODO EDB
  throw new Error('Now yet impmelementy');
}

export async function submitOppgave(oppgaveId: number, aktivEnhet: string, body: FormShape): Promise<void> {
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  // TODO EDB
  // const VURDERING_URL = `/backend/api/v1/vurderingmanuelloppgave/${oppgaveid}`;
  throw new Error('Now yet impmelementy');
}
