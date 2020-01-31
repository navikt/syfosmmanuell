import authUtils from './auth/utils';
import express from 'express';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import reverseProxy from './proxy/reverse-proxy';
import { decode } from 'jsonwebtoken';

const router = express.Router();

const ensureAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else if (req.isAuthenticated() && authUtils.hasValidAccessToken(req)) {
    await authUtils.renewTokenSets();
    next();
  } else {
    if (req.query.oppgaveid) {
      session.redirectTo = req.url;
    }
    res.redirect('/login');
  }
};

const setup = authClient => {
  // Unprotected
  router.get('/is_alive', (req, res) => res.send('Alive'));
  router.get('/is_ready', (req, res) => res.send('Ready'));

  router.get('/login', passport.authenticate('azureOidc', { failureRedirect: '/login' }));
  router.use('/callback', passport.authenticate('azureOidc', { failureRedirect: '/login' }), (req, res) => {
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
    console.log(req.user);
    if (!req.user && !req.user.tokenSet && !req.user.tokenSet.access_token) {
      res.status(500).send('Fant ikke token');
    }
    try {
      const user = decode(req.user.tokenSet.access_token);
      if (!user) {
        throw new Error('Kunne ikke hente ut brukerinformasjon');
      }
      res.status(200).send(user.name);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  router.get('/logout', (req, res) => {
    req.logOut();
    //res.redirect('/');
    res.status(200).send('logged out');
  });

  reverseProxy.setup(router, authClient);

  router.use('/*', (req, res) => {
    res.status(404).send('Not found');
  });

  return router;
};

export default { setup };
