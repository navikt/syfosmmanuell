"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openid_client_1 = require("openid-client");
const utils_1 = __importDefault(require("./utils"));
const config_1 = __importDefault(require("../config"));
const http_proxy_1 = __importDefault(require("../proxy/http-proxy"));
const metadata = {
    client_id: config_1.default.azureAd.clientId,
    client_secret: config_1.default.azureAd.clientSecret,
    redirect_uris: [config_1.default.azureAd.redirectUri],
    token_endpoint_auth_method: config_1.default.azureAd.tokenEndpointAuthMethod,
};
const client = () => __awaiter(void 0, void 0, void 0, function* () {
    // see https://github.com/panva/node-openid-client/blob/master/docs/README.md#customizing-individual-http-requests
    if (http_proxy_1.default.agent) {
        openid_client_1.custom.setHttpOptionsDefaults({
            agent: http_proxy_1.default.agent,
        });
    }
    const issuer = yield openid_client_1.Issuer.discover(config_1.default.azureAd.discoveryUrl);
    console.log(`Discovered issuer ${issuer.issuer}`);
    return new issuer.Client(metadata);
});
const strategy = (client) => {
    const verify = (tokenSet, done) => {
        if (tokenSet.expired()) {
            return done(null, false);
        }
        const user = {
            tokenSets: {
                [utils_1.default.tokenSetSelfId]: tokenSet,
            },
            claims: tokenSet.claims(),
        };
        return done(null, user);
    };
    const options = {
        client: client,
        params: {
            response_types: config_1.default.azureAd.responseTypes,
            response_mode: config_1.default.azureAd.responseMode,
            scope: `openid ${utils_1.default.appendDefaultScope(config_1.default.azureAd.clientId)}`,
        },
        passReqToCallback: false,
        usePKCE: 'S256',
    };
    return new openid_client_1.Strategy(options, verify);
};
exports.default = { client, strategy };
