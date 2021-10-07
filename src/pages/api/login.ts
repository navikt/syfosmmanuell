import type { NextApiResponse } from 'next';
import { generators } from 'openid-client';

import { applySession, NextIronRequest } from '../../auth/session';
import { getAuthUrl } from '../../services/tokenService';

// TODO ta stilling te denna om den ska være i API
const login = async (req: NextIronRequest, res: NextApiResponse): Promise<void> => {
  await applySession(req, res);

  if (process.env.NODE_ENV === 'production') {
    const session = req.session;
    session.set('nonce', generators.nonce());
    session.set('state', generators.state());
    await session.save();
    res.redirect(await getAuthUrl(session));
    return;
  }

  const session = req.session;
  await session.save();
  // TODO use base path
  res.redirect('/api/callback');
  return;
};

export default login;
