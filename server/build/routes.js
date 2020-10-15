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
const utils_1 = __importDefault(require("./auth/utils"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
const reverse_proxy_1 = __importDefault(require("./proxy/reverse-proxy"));
const router = express_1.default.Router();
const ensureAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.isAuthenticated() && utils_1.default.hasValidAccessToken(req)) {
        next();
    }
    else {
        if (req.session && req.query.oppgaveid) {
            req.session.redirectTo = req.url;
        }
        res.redirect('/login');
    }
});
const setup = (authClient) => {
    // Unprotected
    router.get('/is_alive', (_req, res) => res.send('Alive'));
    router.get('/is_ready', (_req, res) => res.send('Ready'));
    router.get('/login', passport_1.default.authenticate('azureOidc', { failureRedirect: '/login' }));
    router.use('/callback', passport_1.default.authenticate('azureOidc', { failureRedirect: '/login' }), (req, res) => {
        var _a;
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.redirectTo) {
            res.redirect(req.session.redirectTo);
        }
        else {
            res.redirect('/');
        }
    });
    router.use(ensureAuthenticated);
    // Protected
    router.use('/', express_1.default.static(path_1.default.join(__dirname, 'build')));
    reverse_proxy_1.default.setup(router, authClient);
    router.use('/*', (_req, res) => {
        res.status(404).send('Not found');
    });
    return router;
};
exports.default = { setup };
