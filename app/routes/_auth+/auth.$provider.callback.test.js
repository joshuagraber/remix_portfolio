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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var invariant_1 = require("@epic-web/invariant");
var faker_1 = require("@faker-js/faker");
var msw_1 = require("msw");
var vitest_1 = require("vitest");
var profile_two_factor_tsx_1 = require("#app/routes/settings+/profile.two-factor.tsx");
var auth_server_ts_1 = require("#app/utils/auth.server.ts");
var connections_server_ts_1 = require("#app/utils/connections.server.ts");
var connections_tsx_1 = require("#app/utils/connections.tsx");
var db_server_ts_1 = require("#app/utils/db.server.ts");
var session_server_ts_1 = require("#app/utils/session.server.ts");
var totp_server_ts_1 = require("#app/utils/totp.server.ts");
var db_utils_ts_1 = require("#tests/db-utils.ts");
var github_ts_1 = require("#tests/mocks/github.ts");
var index_ts_1 = require("#tests/mocks/index.ts");
var setup_test_env_ts_1 = require("#tests/setup/setup-test-env.ts");
var utils_ts_1 = require("#tests/utils.ts");
var auth__provider_callback_ts_1 = require("./auth.$provider.callback.ts");
var ROUTE_PATH = '/auth/github/callback';
var PARAMS = { provider: 'github' };
(0, vitest_1.afterEach)(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, github_ts_1.deleteGitHubUsers)()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)('a new user goes to onboarding', function () { return __awaiter(void 0, void 0, void 0, function () {
    var request, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, setupRequest()];
            case 1:
                request = _a.sent();
                return [4 /*yield*/, (0, auth__provider_callback_ts_1.loader)({ request: request, params: PARAMS, context: {} })["catch"](function (e) { return e; })];
            case 2:
                response = _a.sent();
                (0, vitest_1.expect)(response).toHaveRedirect('/onboarding/github');
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)('when auth fails, send the user to login with a toast', function () { return __awaiter(void 0, void 0, void 0, function () {
    var request, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                setup_test_env_ts_1.consoleError.mockImplementation(function () { });
                index_ts_1.server.use(msw_1.http.post('https://github.com/login/oauth/access_token', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Response('error', { status: 400 })];
                    });
                }); }));
                return [4 /*yield*/, setupRequest()];
            case 1:
                request = _a.sent();
                return [4 /*yield*/, (0, auth__provider_callback_ts_1.loader)({ request: request, params: PARAMS, context: {} })["catch"](function (e) { return e; })];
            case 2:
                response = _a.sent();
                (0, invariant_1.invariant)(response instanceof Response, 'response should be a Response');
                (0, vitest_1.expect)(response).toHaveRedirect('/login');
                return [4 /*yield*/, (0, vitest_1.expect)(response).toSendToast(vitest_1.expect.objectContaining({
                        title: 'Auth Failed',
                        type: 'error'
                    }))];
            case 3:
                _a.sent();
                (0, vitest_1.expect)(setup_test_env_ts_1.consoleError).toHaveBeenCalledTimes(1);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)('when a user is logged in, it creates the connection', function () { return __awaiter(void 0, void 0, void 0, function () {
    var githubUser, session, request, response, connection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, github_ts_1.insertGitHubUser)()];
            case 1:
                githubUser = _a.sent();
                return [4 /*yield*/, setupUser()];
            case 2:
                session = _a.sent();
                return [4 /*yield*/, setupRequest({
                        sessionId: session.id,
                        code: githubUser.code
                    })];
            case 3:
                request = _a.sent();
                return [4 /*yield*/, (0, auth__provider_callback_ts_1.loader)({ request: request, params: PARAMS, context: {} })];
            case 4:
                response = _a.sent();
                (0, vitest_1.expect)(response).toHaveRedirect('/settings/profile/connections');
                return [4 /*yield*/, (0, vitest_1.expect)(response).toSendToast(vitest_1.expect.objectContaining({
                        title: 'Connected',
                        type: 'success',
                        description: vitest_1.expect.stringContaining(githubUser.profile.login)
                    }))];
            case 5:
                _a.sent();
                return [4 /*yield*/, db_server_ts_1.prisma.connection.findFirst({
                        select: { id: true },
                        where: {
                            userId: session.userId,
                            providerId: githubUser.profile.id.toString()
                        }
                    })];
            case 6:
                connection = _a.sent();
                (0, vitest_1.expect)(connection, 'the connection was not created in the database').toBeTruthy();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("when a user is logged in and has already connected, it doesn't do anything and just redirects the user back to the connections page", function () { return __awaiter(void 0, void 0, void 0, function () {
    var session, githubUser, request, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, setupUser()];
            case 1:
                session = _a.sent();
                return [4 /*yield*/, (0, github_ts_1.insertGitHubUser)()];
            case 2:
                githubUser = _a.sent();
                return [4 /*yield*/, db_server_ts_1.prisma.connection.create({
                        data: {
                            providerName: connections_tsx_1.GITHUB_PROVIDER_NAME,
                            userId: session.userId,
                            providerId: githubUser.profile.id.toString()
                        }
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, setupRequest({
                        sessionId: session.id,
                        code: githubUser.code
                    })];
            case 4:
                request = _a.sent();
                return [4 /*yield*/, (0, auth__provider_callback_ts_1.loader)({ request: request, params: PARAMS, context: {} })];
            case 5:
                response = _a.sent();
                (0, vitest_1.expect)(response).toHaveRedirect('/settings/profile/connections');
                return [4 /*yield*/, (0, vitest_1.expect)(response).toSendToast(vitest_1.expect.objectContaining({
                        title: 'Already Connected',
                        description: vitest_1.expect.stringContaining(githubUser.profile.login)
                    }))];
            case 6:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)('when a user exists with the same email, create connection and make session', function () { return __awaiter(void 0, void 0, void 0, function () {
    var githubUser, email, userId, request, response, connection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, github_ts_1.insertGitHubUser)()];
            case 1:
                githubUser = _a.sent();
                email = githubUser.primaryEmail.toLowerCase();
                return [4 /*yield*/, setupUser(__assign(__assign({}, (0, db_utils_ts_1.createUser)()), { email: email }))];
            case 2:
                userId = (_a.sent()).userId;
                return [4 /*yield*/, setupRequest({ code: githubUser.code })];
            case 3:
                request = _a.sent();
                return [4 /*yield*/, (0, auth__provider_callback_ts_1.loader)({ request: request, params: PARAMS, context: {} })];
            case 4:
                response = _a.sent();
                (0, vitest_1.expect)(response).toHaveRedirect('/');
                return [4 /*yield*/, (0, vitest_1.expect)(response).toSendToast(vitest_1.expect.objectContaining({
                        type: 'message',
                        description: vitest_1.expect.stringContaining(githubUser.profile.login)
                    }))];
            case 5:
                _a.sent();
                return [4 /*yield*/, db_server_ts_1.prisma.connection.findFirst({
                        select: { id: true },
                        where: {
                            userId: userId,
                            providerId: githubUser.profile.id.toString()
                        }
                    })];
            case 6:
                connection = _a.sent();
                (0, vitest_1.expect)(connection, 'the connection was not created in the database').toBeTruthy();
                return [4 /*yield*/, (0, vitest_1.expect)(response).toHaveSessionForUser(userId)];
            case 7:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)('gives an error if the account is already connected to another user', function () { return __awaiter(void 0, void 0, void 0, function () {
    var githubUser, session, request, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, github_ts_1.insertGitHubUser)()];
            case 1:
                githubUser = _a.sent();
                return [4 /*yield*/, db_server_ts_1.prisma.user.create({
                        data: __assign(__assign({}, (0, db_utils_ts_1.createUser)()), { connections: {
                                create: {
                                    providerName: connections_tsx_1.GITHUB_PROVIDER_NAME,
                                    providerId: githubUser.profile.id.toString()
                                }
                            } })
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, setupUser()];
            case 3:
                session = _a.sent();
                return [4 /*yield*/, setupRequest({
                        sessionId: session.id,
                        code: githubUser.code
                    })];
            case 4:
                request = _a.sent();
                return [4 /*yield*/, (0, auth__provider_callback_ts_1.loader)({ request: request, params: PARAMS, context: {} })];
            case 5:
                response = _a.sent();
                (0, vitest_1.expect)(response).toHaveRedirect('/settings/profile/connections');
                return [4 /*yield*/, (0, vitest_1.expect)(response).toSendToast(vitest_1.expect.objectContaining({
                        title: 'Already Connected',
                        description: vitest_1.expect.stringContaining('already connected to another account')
                    }))];
            case 6:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)('if a user is not logged in, but the connection exists, make a session', function () { return __awaiter(void 0, void 0, void 0, function () {
    var githubUser, userId, request, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, github_ts_1.insertGitHubUser)()];
            case 1:
                githubUser = _a.sent();
                return [4 /*yield*/, setupUser()];
            case 2:
                userId = (_a.sent()).userId;
                return [4 /*yield*/, db_server_ts_1.prisma.connection.create({
                        data: {
                            providerName: connections_tsx_1.GITHUB_PROVIDER_NAME,
                            providerId: githubUser.profile.id.toString(),
                            userId: userId
                        }
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, setupRequest({ code: githubUser.code })];
            case 4:
                request = _a.sent();
                return [4 /*yield*/, (0, auth__provider_callback_ts_1.loader)({ request: request, params: PARAMS, context: {} })];
            case 5:
                response = _a.sent();
                (0, vitest_1.expect)(response).toHaveRedirect('/');
                return [4 /*yield*/, (0, vitest_1.expect)(response).toHaveSessionForUser(userId)];
            case 6:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)('if a user is not logged in, but the connection exists and they have enabled 2FA, send them to verify their 2FA and do not make a session', function () { return __awaiter(void 0, void 0, void 0, function () {
    var githubUser, userId, _a, _otp, config, request, response, searchParams;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, github_ts_1.insertGitHubUser)()];
            case 1:
                githubUser = _b.sent();
                return [4 /*yield*/, setupUser()];
            case 2:
                userId = (_b.sent()).userId;
                return [4 /*yield*/, db_server_ts_1.prisma.connection.create({
                        data: {
                            providerName: connections_tsx_1.GITHUB_PROVIDER_NAME,
                            providerId: githubUser.profile.id.toString(),
                            userId: userId
                        }
                    })];
            case 3:
                _b.sent();
                return [4 /*yield*/, (0, totp_server_ts_1.generateTOTP)()];
            case 4:
                _a = _b.sent(), _otp = _a.otp, config = __rest(_a, ["otp"]);
                return [4 /*yield*/, db_server_ts_1.prisma.verification.create({
                        data: __assign({ type: profile_two_factor_tsx_1.twoFAVerificationType, target: userId }, config)
                    })];
            case 5:
                _b.sent();
                return [4 /*yield*/, setupRequest({ code: githubUser.code })];
            case 6:
                request = _b.sent();
                return [4 /*yield*/, (0, auth__provider_callback_ts_1.loader)({ request: request, params: PARAMS, context: {} })];
            case 7:
                response = _b.sent();
                searchParams = new URLSearchParams({
                    type: profile_two_factor_tsx_1.twoFAVerificationType,
                    target: userId,
                    redirectTo: '/'
                });
                (0, vitest_1.expect)(response).toHaveRedirect("/verify?".concat(searchParams));
                return [2 /*return*/];
        }
    });
}); });
function setupRequest(_a) {
    var _b = _a === void 0 ? {} : _a, sessionId = _b.sessionId, _c = _b.code, code = _c === void 0 ? faker_1.faker.string.uuid() : _c;
    return __awaiter(this, void 0, void 0, function () {
        var url, state, connectionSession, authSession, setSessionCookieHeader, setConnectionSessionCookieHeader, request;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    url = new URL(ROUTE_PATH, utils_ts_1.BASE_URL);
                    state = faker_1.faker.string.uuid();
                    url.searchParams.set('state', state);
                    url.searchParams.set('code', code);
                    return [4 /*yield*/, connections_server_ts_1.connectionSessionStorage.getSession()];
                case 1:
                    connectionSession = _d.sent();
                    connectionSession.set('oauth2:state', state);
                    return [4 /*yield*/, session_server_ts_1.authSessionStorage.getSession()];
                case 2:
                    authSession = _d.sent();
                    if (sessionId)
                        authSession.set(auth_server_ts_1.sessionKey, sessionId);
                    return [4 /*yield*/, session_server_ts_1.authSessionStorage.commitSession(authSession)];
                case 3:
                    setSessionCookieHeader = _d.sent();
                    return [4 /*yield*/, connections_server_ts_1.connectionSessionStorage.commitSession(connectionSession)];
                case 4:
                    setConnectionSessionCookieHeader = _d.sent();
                    request = new Request(url.toString(), {
                        method: 'GET',
                        headers: {
                            cookie: [
                                (0, utils_ts_1.convertSetCookieToCookie)(setConnectionSessionCookieHeader),
                                (0, utils_ts_1.convertSetCookieToCookie)(setSessionCookieHeader),
                            ].join('; ')
                        }
                    });
                    return [2 /*return*/, request];
            }
        });
    });
}
function setupUser(userData) {
    if (userData === void 0) { userData = (0, db_utils_ts_1.createUser)(); }
    return __awaiter(this, void 0, void 0, function () {
        var session;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_server_ts_1.prisma.session.create({
                        data: {
                            expirationDate: (0, auth_server_ts_1.getSessionExpirationDate)(),
                            user: {
                                create: __assign({}, userData)
                            }
                        },
                        select: {
                            id: true,
                            userId: true
                        }
                    })];
                case 1:
                    session = _a.sent();
                    return [2 /*return*/, session];
            }
        });
    });
}
