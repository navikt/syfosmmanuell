import azure from './auth/azure';
import config from './config';
import routes from './routes/routes';
import cors from './cors';
import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import session from './session';
import logger from './logging';

const server = express();
const port = config.server.port;

async function startApp() {
  try {
    session.setup(server);

    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    //server.use(cookieParser());

    // setup sane defaults for CORS and HTTP headers
    server.use(helmet());
    server.use(cors);

    // initialize passport and restore authentication state, if any, from the session
    server.use(passport.initialize());
    server.use(passport.session());

    const azureAuthClient = await azure.client();
    const azureOidcStrategy = azure.strategy(azureAuthClient);

    passport.use('azureOidc', azureOidcStrategy);
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));

    // setup routes
    server.use('/', routes.setup(azureAuthClient));

    server.listen(port, () => logger.info(`Listening on port ${port}`));
  } catch (error) {
    logger.error('Error during start-up', error);
  }
}

startApp().catch((err) => logger.info(err));
