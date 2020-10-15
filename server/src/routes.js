import authUtils from './auth/utils';
import express from 'express';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import reverseProxy from './proxy/reverse-proxy';
import { decode } from 'jsonwebtoken';

const router = express.Router();

const ensureAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated() && authUtils.hasValidAccessToken(req)) {
    next();
  } else {
    if (req.query.oppgaveid) {
      session.redirectTo = req.url;
    }
    res.redirect('/login');
  }
};

const setup = (authClient) => {
  // Unprotected
  router.get('/is_alive', (_req, res) => res.send('Alive'));
  router.get('/is_ready', (_req, res) => res.send('Ready'));

  router.get('/login', passport.authenticate('azureOidc', { failureRedirect: '/login' }));
  router.use('/callback', passport.authenticate('azureOidc', { failureRedirect: '/login' }), (_req, res) => {
    if (session.redirectTo) {
      res.redirect(session.redirectTo);
    } else {
      res.redirect('/');
    }
  });

  router.use(ensureAuthenticated);

  // Protected
  router.use('/', express.static(path.join(__dirname, 'build')));

  router.get('/user', (req, res) => {
    if (!req.user && !req.user.tokenSets && !req.user.tokenSets.self) {
      res.status(500).send('Fant ikke token');
    }
    try {
      const user = decode(req.user.tokenSets.self.access_token);
      if (!user) {
        throw new Error('Kunne ikke hente ut brukerinformasjon');
      }
      res.status(200).send(user.name);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  reverseProxy.setup(router, authClient);

  router.use('/*', (_req, res) => {
    res.status(404).send('Not found');
  });

  return router;
};

export default { setup };
