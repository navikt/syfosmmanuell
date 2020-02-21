import morganBody from 'morgan-body';
import morgan from 'morgan';

const setupLogging = server => {
  if (process.env.NODE_ENV === 'development') {
    morganBody(server);
    morgan('dev');
  } else {
    server.use(
      morgan('common', {
        skip: (req, res) => res.statusCode < 400,
      }),
    );
  }
};

export default setupLogging;
