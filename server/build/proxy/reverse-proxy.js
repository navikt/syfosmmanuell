"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("../auth/utils"));
const config_1 = __importDefault(require("../config"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const url_1 = __importDefault(require("url"));
const options = (proxyConfig, authClient) => ({
    parseReqBody: true,
    proxyReqOptDecorator: (options, req) => {
        return new Promise((resolve, reject) => utils_1.default.getOnBehalfOfAccessToken(authClient, req, proxyConfig, 'proxy').then((access_token) => {
            if (options.headers) {
                options.headers.Authorization = `Bearer ${access_token}`;
                resolve(options);
            }
            else {
                throw new Error('Could not set Authorization header for downstream api proxy request');
            }
        }, (error) => reject(error)));
    },
    proxyReqPathResolver: (req) => {
        var _a;
        const urlFromApi = url_1.default.parse(proxyConfig.url);
        const pathFromApi = urlFromApi.pathname === '/' ? '' : urlFromApi.pathname;
        const urlFromRequest = url_1.default.parse(req.originalUrl);
        const pathFromRequest = (_a = urlFromRequest.pathname) === null || _a === void 0 ? void 0 : _a.replace(`/${proxyConfig.path}/`, '/');
        const queryString = urlFromRequest.query;
        const newPath = (pathFromApi ? pathFromApi : '') +
            (pathFromRequest ? pathFromRequest : '') +
            (queryString ? '?' + queryString : '');
        console.log(`Proxying request from '${req.originalUrl}' to '${stripTrailingSlash(urlFromApi.href)}${newPath}'`);
        return newPath;
    },
});
const stripTrailingSlash = (str) => (str.endsWith('/') ? str.slice(0, -1) : str);
const setup = (router, authClient) => {
    const proxyConfig = config_1.default.downstreamApiReverseProxy;
    router.use(`/${proxyConfig.path}/*`, express_http_proxy_1.default(proxyConfig.url, options(proxyConfig, authClient)));
};
exports.default = { setup };
