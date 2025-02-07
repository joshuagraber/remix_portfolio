"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
exports.__esModule = true;
var node_crypto_1 = __importDefault(require("node:crypto"));
var express_1 = require("@remix-run/express");
var remix_1 = __importDefault(require("@sentry/remix"));
var address_1 = require("address");
var chalk_1 = __importDefault(require("chalk"));
var close_with_grace_1 = __importDefault(require("close-with-grace"));
var compression_1 = __importDefault(require("compression"));
var express_2 = __importDefault(require("express"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var get_port_1 = __importStar(require("get-port"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var MODE = (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : 'development';
var IS_PROD = MODE === 'production';
var IS_DEV = MODE === 'development';
var ALLOW_INDEXING = process.env.ALLOW_INDEXING !== 'false';
var SENTRY_ENABLED = IS_PROD && process.env.SENTRY_DSN;
if (SENTRY_ENABLED) {
    void Promise.resolve().then(function () { return __importStar(require('./utils/monitoring.js')); }).then(function (_a) {
        var init = _a.init;
        return init();
    });
}
var viteDevServer = IS_PROD
    ? undefined
    : await Promise.resolve().then(function () { return __importStar(require('vite')); }).then(function (vite) {
        return vite.createServer({
            server: { middlewareMode: true }
        });
    });
var app = (0, express_2["default"])();
var getHost = function (req) { var _a, _b; return (_b = (_a = req.get('X-Forwarded-Host')) !== null && _a !== void 0 ? _a : req.get('host')) !== null && _b !== void 0 ? _b : ''; };
// fly is our proxy
app.set('trust proxy', true);
// ensure HTTPS only (X-Forwarded-Proto comes from Fly)
app.use(function (req, res, next) {
    if (req.method !== 'GET')
        return next();
    var proto = req.get('X-Forwarded-Proto');
    var host = getHost(req);
    if (proto === 'http') {
        res.set('X-Forwarded-Proto', 'https');
        res.redirect("https://".concat(host).concat(req.originalUrl));
        return;
    }
    next();
});
// no ending slashes for SEO reasons
// https://github.com/epicweb-dev/epic-stack/discussions/108
app.get('*', function (req, res, next) {
    if (req.path.endsWith('/') && req.path.length > 1) {
        var query = req.url.slice(req.path.length);
        var safepath = req.path.slice(0, -1).replace(/\/+/g, '/');
        res.redirect(302, safepath + query);
    }
    else {
        next();
    }
});
app.use((0, compression_1["default"])());
// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');
if (viteDevServer) {
    app.use(viteDevServer.middlewares);
}
else {
    // Remix fingerprints its assets so we can cache forever.
    app.use('/assets', express_2["default"].static('build/client/assets', { immutable: true, maxAge: '1y' }));
    // Everything else (like favicon.ico) is cached for an hour. You may want to be
    // more aggressive with this caching.
    app.use(express_2["default"].static('build/client', { maxAge: '1h' }));
}
app.get(['/img/*', '/favicons/*'], function (_req, res) {
    // if we made it past the express.static for these, then we're missing something.
    // So we'll just send a 404 and won't bother calling other middleware.
    return res.status(404).send('Not found');
});
morgan_1["default"].token('url', function (req) { var _a; return decodeURIComponent((_a = req.url) !== null && _a !== void 0 ? _a : ''); });
app.use((0, morgan_1["default"])('tiny', {
    skip: function (req, res) {
        var _a, _b, _c;
        return res.statusCode === 200 &&
            (((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith('/resources/note-images')) ||
                ((_b = req.url) === null || _b === void 0 ? void 0 : _b.startsWith('/resources/user-images')) ||
                ((_c = req.url) === null || _c === void 0 ? void 0 : _c.startsWith('/resources/healthcheck')));
    }
}));
app.use(function (_, res, next) {
    res.locals.cspNonce = node_crypto_1["default"].randomBytes(16).toString('hex');
    next();
});
app.use((0, helmet_1["default"])({
    xPoweredBy: false,
    referrerPolicy: { policy: 'same-origin' },
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
        // NOTE: Remove reportOnly when you're ready to enforce this CSP
        reportOnly: true,
        directives: {
            'connect-src': [
                MODE === 'development' ? 'ws:' : null,
                process.env.SENTRY_DSN ? '*.sentry.io' : null,
                "'self'",
            ].filter(Boolean),
            'font-src': ["'self'"],
            'frame-src': ["'self'"],
            'img-src': ["'self'", 'data:'],
            'script-src': [
                "'strict-dynamic'",
                "'self'",
                // @ts-expect-error
                function (_, res) { return "'nonce-".concat(res.locals.cspNonce, "'"); },
            ],
            'script-src-attr': [
                // @ts-expect-error
                function (_, res) { return "'nonce-".concat(res.locals.cspNonce, "'"); },
            ],
            'upgrade-insecure-requests': null
        }
    }
}));
// When running tests or running in development, we want to effectively disable
// rate limiting because playwright tests are very fast and we don't want to
// have to wait for the rate limit to reset between tests.
var maxMultiple = !IS_PROD || process.env.PLAYWRIGHT_TEST_BASE_URL ? 10000 : 1;
var rateLimitDefault = {
    windowMs: 60 * 1000,
    max: 1000 * maxMultiple,
    standardHeaders: true,
    legacyHeaders: false,
    validate: { trustProxy: false },
    // Malicious users can spoof their IP address which means we should not deault
    // to trusting req.ip when hosted on Fly.io. However, users cannot spoof Fly-Client-Ip.
    // When sitting behind a CDN such as cloudflare, replace fly-client-ip with the CDN
    // specific header such as cf-connecting-ip
    keyGenerator: function (req) {
        var _a;
        return (_a = req.get('fly-client-ip')) !== null && _a !== void 0 ? _a : "".concat(req.ip);
    }
};
var strongestRateLimit = (0, express_rate_limit_1["default"])(__assign(__assign({}, rateLimitDefault), { windowMs: 60 * 1000, max: 10 * maxMultiple }));
var strongRateLimit = (0, express_rate_limit_1["default"])(__assign(__assign({}, rateLimitDefault), { windowMs: 60 * 1000, max: 100 * maxMultiple }));
var generalRateLimit = (0, express_rate_limit_1["default"])(rateLimitDefault);
app.use(function (req, res, next) {
    var strongPaths = [
        '/login',
        '/signup',
        '/verify',
        '/admin',
        '/onboarding',
        '/reset-password',
        '/settings/profile',
        '/resources/login',
        '/resources/verify',
    ];
    if (req.method !== 'GET' && req.method !== 'HEAD') {
        if (strongPaths.some(function (p) { return req.path.includes(p); })) {
            return strongestRateLimit(req, res, next);
        }
        return strongRateLimit(req, res, next);
    }
    // the verify route is a special case because it's a GET route that
    // can have a token in the query string
    if (req.path.includes('/verify')) {
        return strongestRateLimit(req, res, next);
    }
    return generalRateLimit(req, res, next);
});
function getBuild() {
    return __awaiter(this, void 0, void 0, function () {
        var build, _a, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    if (!viteDevServer) return [3 /*break*/, 2];
                    return [4 /*yield*/, viteDevServer.ssrLoadModule('virtual:remix/server-build')];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 2: // @ts-expect-error - the file might not exist yet but it will
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('../build/server/index.js')); })];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    build = _a;
                    return [2 /*return*/, { build: build, error: null }];
                case 5:
                    error_1 = _b.sent();
                    // Catch error and return null to make express happy and avoid an unrecoverable crash
                    console.error('Error creating build:', error_1);
                    return [2 /*return*/, { error: error_1, build: null }];
                case 6: return [2 /*return*/];
            }
        });
    });
}
if (!ALLOW_INDEXING) {
    app.use(function (_, res, next) {
        res.set('X-Robots-Tag', 'noindex, nofollow');
        next();
    });
}
app.all('*', (0, express_1.createRequestHandler)({
    getLoadContext: function (_, res) { return ({
        cspNonce: res.locals.cspNonce,
        serverBuild: getBuild()
    }); },
    mode: MODE,
    build: function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, error, build;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getBuild()
                    // gracefully "catch" the error
                ];
                case 1:
                    _a = _b.sent(), error = _a.error, build = _a.build;
                    // gracefully "catch" the error
                    if (error) {
                        throw error;
                    }
                    return [2 /*return*/, build];
            }
        });
    }); }
}));
var desiredPort = Number(process.env.PORT || 3000);
var portToUse = await (0, get_port_1["default"])({
    port: (0, get_port_1.portNumbers)(desiredPort, desiredPort + 100)
});
var portAvailable = desiredPort === portToUse;
if (!portAvailable && !IS_DEV) {
    console.log("\u26A0\uFE0F Port ".concat(desiredPort, " is not available."));
    process.exit(1);
}
var server = app.listen(portToUse, function () {
    var _a;
    if (!portAvailable) {
        console.warn(chalk_1["default"].yellow("\u26A0\uFE0F  Port ".concat(desiredPort, " is not available, using ").concat(portToUse, " instead.")));
    }
    console.log("\uD83D\uDE80  We have liftoff!");
    var localUrl = "http://localhost:".concat(portToUse);
    var lanUrl = null;
    var localIp = (_a = (0, address_1.ip)()) !== null && _a !== void 0 ? _a : 'Unknown';
    // Check if the address is a private ip
    // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
    // https://github.com/facebook/create-react-app/blob/d960b9e38c062584ff6cfb1a70e1512509a966e7/packages/react-dev-utils/WebpackDevServerUtils.js#LL48C9-L54C10
    if (/^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(localIp)) {
        lanUrl = "http://".concat(localIp, ":").concat(portToUse);
    }
    console.log("\n".concat(chalk_1["default"].bold('Local:'), "            ").concat(chalk_1["default"].cyan(localUrl), "\n").concat(lanUrl ? "".concat(chalk_1["default"].bold('On Your Network:'), "  ").concat(chalk_1["default"].cyan(lanUrl)) : '', "\n").concat(chalk_1["default"].bold('Press Ctrl+C to stop'), "\n\t\t").trim());
});
(0, close_with_grace_1["default"])(function (_a) {
    var err = _a.err;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        server.close(function (e) { return (e ? reject(e) : resolve('ok')); });
                    })];
                case 1:
                    _b.sent();
                    if (!err) return [3 /*break*/, 3];
                    console.error(chalk_1["default"].red(err));
                    console.error(chalk_1["default"].red(err.stack));
                    if (!SENTRY_ENABLED) return [3 /*break*/, 3];
                    remix_1["default"].captureException(err);
                    return [4 /*yield*/, remix_1["default"].flush(500)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
});
