"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const redis_1 = __importDefault(require("redis"));
const express_session_1 = __importDefault(require("express-session"));
const SESSION_MAX_AGE_MILLISECONDS = 60 * 60 * 1000;
const setup = (app) => {
    app.set('trust proxy', 1);
    if (process.env.NODE_ENV === 'development') {
        app.use(express_session_1.default({
            cookie: {
                maxAge: SESSION_MAX_AGE_MILLISECONDS,
                sameSite: 'lax'
            },
            secret: config_1.default.server.sessionKey,
            name: config_1.default.server.cookieName,
            resave: false,
            saveUninitialized: true,
        }));
    }
    else {
        const RedisStore = require('connect-redis')(express_session_1.default);
        const client = redis_1.default.createClient({
            host: config_1.default.redis.host,
            password: config_1.default.redis.password,
            port: config_1.default.redis.port,
        });
        client.unref();
        client.on('error', console.log);
        const store = new RedisStore({
            client: client,
            disableTouch: true,
        });
        app.use(express_session_1.default({
            cookie: {
                maxAge: SESSION_MAX_AGE_MILLISECONDS,
                secure: true,
                httpOnly: true,
                sameSite: 'lax'
            },
            name: config_1.default.server.cookieName,
            saveUninitialized: true,
            secret: config_1.default.server.sessionKey,
            store: store,
            resave: false,
        }));
    }
};
exports.default = { setup };
