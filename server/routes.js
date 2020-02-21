import authUtils from './auth/utils';
import config from './config';
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
    try {
      if (!req.user && !req.user.tokenSets && !req.user.tokenSets.self) {
        throw new Error('Fant ikke token knyttet til user-objekt');
      }
      const user = decode(req.user.tokenSets.self.access_token);
      if (!user) {
        throw new Error('Kunne ikke hente ut brukerinformasjon fra token');
      }
      res.status(200).send(user.name);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });

  router.get('/logout', (req, res) => {
    req.logOut();
    req.session.destroy(error => {
      if (!error) {
        if (config.azureAd.logoutRedirectUri) {
          res
            .status(200)
            .send('logged out')
            .redirect(config.azureAd.logoutRedirectUri);
        } else {
          res.status(200).send('logged out');
        }
      } else {
        res.status(500).send('Could not log out due to a server error');
      }
    });
  });

  reverseProxy.setup(router, authClient);

  router.use('/*', (req, res) => {
    res.status(404).send('Not found');
  });

  return router;
};

export default { setup };
