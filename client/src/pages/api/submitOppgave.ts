import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not supported' });
    return;
  }

  res.status(200).json({ message: 'Oppgave submitted successfully' });
};
