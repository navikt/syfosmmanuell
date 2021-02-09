import tunnel from 'tunnel';
import logger from '../logging';

const httpProxyAgent = (proxyUri: string | undefined) => {
  if (proxyUri) {
    logger.info(`Proxying requests via ${proxyUri} for openid-cilent`);
    const hostPort = proxyUri.replace('https://', '').replace('http://', '').split(':', 2);
    return tunnel.httpsOverHttp({
      proxy: {
        host: hostPort[0],
        port: parseInt(hostPort[1]),
      },
    });
  } else {
    logger.info(`Environment variable HTTP_PROXY is not set, not proxying requests for openid-client`);
    return null;
  }
};

export default httpProxyAgent;
