import authUtils from './auth/utils';
import config from './config';
import express from 'express';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import reverseProxy from './proxy/reverse-proxy';

const router = express.Router();

const ensureAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else if (req.isAuthenticated() && authUtils.hasExpiredTokenSets(req)) {
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
      console.log(session);
      res.redirect(session.redirectTo);
    } else {
      res.redirect('/');
    }
  });

  router.use(ensureAuthenticated);

  // Protected
  router.use('/', express.static(path.join(__dirname, 'build')));

  router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
  });

  router.get('/refresh', (req, res) => {
    authUtils
      .renewTokenSets(authClient, req.user.tokenSet.refresh_token)
      .then(tokenSet => {
        updateUserTokenSet(tokenSet, req);
        res.json(req.user);
      })
      .catch(err => {
        console.error(err);
        res.redirect('/logout');
      });
  });

  router.get('/obo', (req, res) => {
    authUtils
      .getOnBehalfOfTokenSet(authClient, req.user.tokenSet.access_token_self || req.user.tokenSet.access_token)
      .then(tokenSet => {
        if (!req.user.tokenSet.access_token_self) {
          req.user.tokenSet.access_token_self = req.user.tokenSet.access_token;
        }
        updateUserTokenSet(tokenSet, req);
        res.json(req.user);
      })
      .catch(err => {
        console.error(err);
        res.json({ error: err });
      });
  });

  // Set up reverse proxy for a given prefix that proxies matching requests to the downstream API
  router.use(`/${config.downstreamApi.prefix}/*`, reverseProxy.setup(authClient));

  router.use('/*', (req, res) => {
    res.status(404).send('Not found');
  });

  return router;
};

const updateUserTokenSet = (tokenSet, req) => {
  req.user.tokenSet.access_token = tokenSet.access_token || req.user.tokenSet.access_token;
  req.user.tokenSet.refresh_token = tokenSet.refresh_token || req.user.tokenSet.refresh_token;
  req.user.tokenSet.id_token = tokenSet.id_token || req.user.tokenSet.id_token;
};

export default { setup };
