import authUtils from '../auth/utils';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import passport from 'passport';
import downstreamApiReverseProxy from '../proxy/downstream-api-reverse-proxy';
import { Client } from 'openid-client';
import modiaContextHolderReverseProxy from '../proxy/modia-context-holder-reverse-proxy';
import { Config } from '../config';

const router = express.Router();

const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && authUtils.hasValidAccessToken(req)) {
    next();
  } else {
    if (req.session && req.query.oppgaveid) {
      req.session.redirectTo = req.url;
    }
    res.redirect('/login');
  }
};

const setup = (authClient: Client, config: Config) => {
  // Unprotected
  router.get('/is_alive', (_req, res) => res.send('Alive'));
  router.get('/is_ready', (_req, res) => res.send('Ready'));

  router.get('/login', passport.authenticate('azureOidc', { failureRedirect: '/login' }));
  router.use('/callback', passport.authenticate('azureOidc', { failureRedirect: '/login' }), (req, res) => {
    if (req.session?.redirectTo) {
      res.redirect(req.session.redirectTo);
    } else {
      res.redirect('/');
    }
  });

  router.use(ensureAuthenticated);

  // Protected
  router.use('/', express.static(path.join(__dirname, '../../../client/build')));

  downstreamApiReverseProxy.setup(router, authClient, config.downstreamApiReverseProxy);
  modiaContextHolderReverseProxy.setup(router, authClient, config.modiaContextReverseProxy);

  router.use('/*', (_req, res) => {
    res.status(404).send('Not found');
  });

  return router;
};

export default { setup };
