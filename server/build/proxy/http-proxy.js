"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const tunnel_1 = __importDefault(require("tunnel"));
const agent = () => {
    const proxyUri = config_1.default.server.proxy;
    if (proxyUri) {
        console.log(`Proxying requests via ${proxyUri} for openid-cilent`);
        const hostPort = proxyUri.replace('https://', '').replace('http://', '').split(':', 2);
        return tunnel_1.default.httpsOverHttp({
            proxy: {
                host: hostPort[0],
                port: parseInt(hostPort[1]),
            },
        });
    }
    else {
        console.log(`Environment variable HTTP_PROXY is not set, not proxying requests for openid-client`);
        return null;
    }
};
exports.default = { agent: agent() };
