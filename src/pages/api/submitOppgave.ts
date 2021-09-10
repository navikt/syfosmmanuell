import type { NextApiRequest, NextApiResponse } from 'next';
import { submitOppgave } from '../../services/oppgaveService';
import { SubmitOppgaveBody } from '../../utils/dataUtils';
import { logger } from '../../utils/logger';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not supported' });
    return;
  }

  const body: SubmitOppgaveBody = req.body;

  try {
    await submitOppgave(body.oppgaveid, body.aktivEnhet, body.formValues);
    res.status(200).json({ message: 'Oppgave submitted successfully' });
    return;
  } catch (e) {
    //@ts-expect-error
    logger.error(e);
    res.status(500).json({ message: 'something went wrong' });
    return;
  }
};
