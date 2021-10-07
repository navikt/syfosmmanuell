import type { NextApiResponse } from 'next';

import { applySession, NextIronRequest } from '../../auth/session';
import { getTokenSet } from '../../services/tokenService';
import { logger } from '../../utils/logger';
import { isDevOrDemo } from '../../utils/env';

const callback = async (req: NextIronRequest, res: NextApiResponse): Promise<void> => {
  await applySession(req, res);

  const redirectPath = req.session.get('redirect_path');
  if (!redirectPath) {
    res.status(403);
    res.json({ message: 'Missing redirect_path' });
    return;
  }

  const clearSessionForLoginValues = () => {
    req.session.unset('nonce');
    req.session.unset('state');
    req.session.unset('redirect_path');
  };

  if (isDevOrDemo) {
    logger.warn('Using local development fake tokenset');
    const value = await import('../../auth/fakeLocalAuthTokenSet.json').then((it) => it.default);
    req.session.set('access_token', value.access_token);
    req.session.set('access_token_expiry', value.expires_at);
    clearSessionForLoginValues();
    await req.session.save();
    res.redirect(redirectPath);
    return;
  }

  try {
    const tokenSet = await getTokenSet(req);
    req.session.set('access_token', tokenSet.access_token);
    req.session.set('access_token_expiry', tokenSet.expires_at);
    clearSessionForLoginValues();
    await req.session.save();

    res.redirect(redirectPath);
  } catch (error) {
    logger.error(error);
    req.session.destroy();
    res.status(403);
    res.end();
  }
};

export default callback;
