import morganBody from 'morgan-body';
import morgan from 'morgan';

const setupLogging = server => {
  if (process.env.NODE_ENV === 'development') {
    morganBody(server);
    morgan('dev');
  } else {
    morgan('common');
  }
};
console.error("daedaw")

export default setupLogging;
