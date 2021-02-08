import { NextFunction, Request, Response } from 'express';
import { ServerConfig } from './config';

function setupCors(serverConfig: ServerConfig) {
  return (_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', serverConfig.host);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, Content-Type, X-AUTHENTICATION, X-IP, Content-Type, Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    );
    res.setHeader('Access-Control-Expose-Headers', 'Location');
    return next();
  };
}
export default setupCors;
