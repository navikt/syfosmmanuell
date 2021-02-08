import azure from './auth/azure';
import routes from './routes/routes';
import setupCors from './cors';
import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import session from './session';
import logger from './logging';
import path from 'path';
import loadConfig from './config';

// for demo app running on nais labs
function startDemoApp() {
  const server = express();

  // Nais routes
  server.get('/is_alive', (_req, res) => res.send('Alive'));
  server.get('/is_ready', (_req, res) => res.send('Ready'));

  // Static content
  server.use('/', express.static(path.join(__dirname, '../../client/build')));
  server.use('*', (_req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../../client/build') });
  });

  // start server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
}

async function startApp() {
  try {
    const server = express();
    const config = loadConfig();
    const port = config.server.port;

    session.setup(server, config);

    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    //server.use(cookieParser());

    // setup sane defaults for CORS and HTTP headers
    server.use(helmet());
    server.use(setupCors(config.server));

    // initialize passport and restore authentication state, if any, from the session
    server.use(passport.initialize());
    server.use(passport.session());

    const azureAuthClient = await azure.client(config);
    const azureOidcStrategy = azure.strategy(azureAuthClient, config.azureAd);

    passport.use('azureOidc', azureOidcStrategy);
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));

    // setup routes
    server.use('/', routes.setup(azureAuthClient, config));

    server.listen(port, () => logger.info(`Listening on port ${port}`));
  } catch (error) {
    logger.error('Error during start-up', error);
  }
}

if (process.env.IS_NAIS_LABS_DEMO === 'true') {
  startDemoApp();
} else {
  startApp().catch((error) => {
    if (error.code === 'ETIMEDOUT') {
      logger.error('ETIMEDOUT: A connection timed out'); // Needs to be sanitized
    } else {
      logger.error(error);
    }
  });
}
