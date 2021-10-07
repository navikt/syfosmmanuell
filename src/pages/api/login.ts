import type { NextApiResponse } from 'next';
import { generators } from 'openid-client';

import { applySession, NextIronRequest } from '../../auth/session';
import { getAuthUrl } from '../../services/tokenService';
import { logger } from '../../utils/logger';
import { isDevOrDemo } from '../../utils/env';

const login = async (req: NextIronRequest, res: NextApiResponse): Promise<void> => {
  await applySession(req, res);

  const redirectPath = req.query.redirect_path;
  if (!redirectPath || Array.isArray(redirectPath)) {
    res.status(400);
    res.json({ message: 'Missing or malformed redirect_path' });
    return;
  }

  if (isDevOrDemo) {
    logger.warn('Using dev login, creating session and redirecting directly to /callback');
    const session = req.session;
    session.set('redirect_path', decodeURI(redirectPath));
    await session.save();
    res.redirect('/callback');
    return;
  }

  const session = req.session;
  session.set('nonce', generators.nonce());
  session.set('state', generators.state());
  session.set('redirect_path', decodeURI(redirectPath));
  await session.save();
  const redirectUrl = await getAuthUrl(session);
  res.redirect(redirectUrl);
};

export default login;
