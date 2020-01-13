import azure from './auth/azure';
import config from './config';
import routes from './routes';
import cors from './cors';
import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import session from 'express-session';

// for debugging during development
import morganBody from 'morgan-body';
import morgan from 'morgan';
import setupVault from './vault/vaultClient';

const server = express();
const port = config.server.port;

async function startApp() {
  try {
    morganBody(server);
    morgan('dev');
    console.log('CLIENT_ID: ' + process.env.CLIENT_ID);
    console.log('CLIENT_SECRET: ' + process.env.CLIENT_SECRET);
    console.log('DOWNSTREAM_API_HOST: ' + process.env.DOWNSTREAM_API_HOST);
    console.log('AAD_DISCOVERY_URL: ' + process.env.AAD_DISCOVERY_URL);
    // TODO: set up redis
    server.use(
      session({
        secret: 'awesome secret',
        name: 'awesome name',
        resave: false,
        saveUninitialized: true,
      }),
    );

    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

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

    server.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (error) {
    console.error('Error during start-up', error);
  }
}

startApp().catch(err => console.log(err));
