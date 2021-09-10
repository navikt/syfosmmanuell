import type { NextApiResponse } from 'next';

import { applySession, NextIronRequest } from '../../auth/session';
import { getTokenSet } from '../../services/tokenService';
import { logger } from '../../utils/logger';

const callback = async (req: NextIronRequest, res: NextApiResponse): Promise<void> => {
  await applySession(req, res);

  if (process.env.NODE_ENV === 'production') {
    const session = req.session;
    try {
      const tokenSet = await getTokenSet(req);
      session.set('tokenSet', tokenSet);
      session.get('state').egVilHit;
      session.unset('nonce');
      session.unset('state');
      await session.save();
      // TODO public path
      res.redirect(`${'/'}`); // TODO: get redirect from request query params
    } catch (error) {
      // @ts-expect-error Missing typing for TypeScript 4.4s "unknown" errors
      logger.error(error);
      session.destroy();
      res.status(403);
    }
    return;
  }

  // Local development test user
  const session = req.session;
  const value = await import('../../auth/fakeLocalAuthTokenSet.json').then((it) => it.default);
  session.set('tokenSet', value);
  await session.save();
  res.redirect(`${'/?oppgaveid=123456'}`); // TODO: get redirect from request query params
};

export default callback;
