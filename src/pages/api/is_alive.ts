import type { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '../../utils/logger';

type Data = {
    message: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>): void => {
    logger.info('Application is alive');

    res.status(200).json({ message: `I'm alive` });
};

export default handler;
