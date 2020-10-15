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
const azure_1 = __importDefault(require("./auth/azure"));
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes/routes"));
const cors_1 = __importDefault(require("./cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const passport_1 = __importDefault(require("passport"));
const session_1 = __importDefault(require("./session"));
const server = express_1.default();
const port = config_1.default.server.port;
function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            session_1.default.setup(server);
            server.use(express_1.default.json());
            server.use(express_1.default.urlencoded({ extended: true }));
            //server.use(cookieParser());
            // setup sane defaults for CORS and HTTP headers
            server.use(helmet_1.default());
            server.use(cors_1.default);
            // initialize passport and restore authentication state, if any, from the session
            server.use(passport_1.default.initialize());
            server.use(passport_1.default.session());
            const azureAuthClient = yield azure_1.default.client();
            const azureOidcStrategy = azure_1.default.strategy(azureAuthClient);
            passport_1.default.use('azureOidc', azureOidcStrategy);
            passport_1.default.serializeUser((user, done) => done(null, user));
            passport_1.default.deserializeUser((user, done) => done(null, user));
            // setup routes
            server.use('/', routes_1.default.setup(azureAuthClient));
            server.listen(port, () => console.log(`Listening on port ${port}`));
        }
        catch (error) {
            console.error('Error during start-up', error);
        }
    });
}
startApp().catch(err => console.log(err));
