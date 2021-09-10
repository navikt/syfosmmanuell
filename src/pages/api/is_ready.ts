import type { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '../../utils/logger';

type Data = {
  message: string;
};

const isReady = (req: NextApiRequest, res: NextApiResponse<Data>): void => {
  logger.info('Application is ready');

  // TODO verify enviroment variables
  res.status(200).json({ message: `I'm ready!` });
};

export default isReady;
