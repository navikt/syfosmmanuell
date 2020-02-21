import morganBody from 'morgan-body';
import morgan from 'morgan';

const setupLogging = server => {
  if (process.env.NODE_ENV === 'development') {
    morganBody(server);
    morgan('dev');
  } else {
    server.use(morgan('common'), {
      skip: function(req, res) {
        return req.originalUrl !== '/is_alive' || req.originalUrl !== '/is_ready';
      },
    });
  }
};

export default setupLogging;
