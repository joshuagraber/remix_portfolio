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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verifyUserPassword = exports.getPasswordHash = exports.logout = exports.signupWithConnection = exports.signup = exports.resetUserPassword = exports.login = exports.requireAnonymous = exports.requireUserId = exports.getUserId = exports.authenticator = exports.sessionKey = exports.getSessionExpirationDate = exports.SESSION_EXPIRATION_TIME = void 0;
var node_1 = require("@remix-run/node");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var remix_auth_1 = require("remix-auth");
var safe_redirect_1 = require("remix-utils/safe-redirect");
var connections_server_ts_1 = require("./connections.server.ts");
var db_server_ts_1 = require("./db.server.ts");
var misc_tsx_1 = require("./misc.tsx");
var session_server_ts_1 = require("./session.server.ts");
exports.SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30;
var getSessionExpirationDate = function () {
    return new Date(Date.now() + exports.SESSION_EXPIRATION_TIME);
};
exports.getSessionExpirationDate = getSessionExpirationDate;
exports.sessionKey = 'sessionId';
exports.authenticator = new remix_auth_1.Authenticator(connections_server_ts_1.connectionSessionStorage);
for (var _i = 0, _a = Object.entries(connections_server_ts_1.providers); _i < _a.length; _i++) {
    var _b = _a[_i], providerName = _b[0], provider = _b[1];
    exports.authenticator.use(provider.getAuthStrategy(), providerName);
}
function getUserId(request) {
    return __awaiter(this, void 0, void 0, function () {
        var authSession, sessionId, session, _a, _b, _c;
        var _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, session_server_ts_1.authSessionStorage.getSession(request.headers.get('cookie'))];
                case 1:
                    authSession = _f.sent();
                    sessionId = authSession.get(exports.sessionKey);
                    if (!sessionId)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, db_server_ts_1.prisma.session.findUnique({
                            select: { user: { select: { id: true } } },
                            where: { id: sessionId, expirationDate: { gt: new Date() } }
                        })];
                case 2:
                    session = _f.sent();
                    if (!!(session === null || session === void 0 ? void 0 : session.user)) return [3 /*break*/, 4];
                    _a = node_1.redirect;
                    _b = ['/'];
                    _d = {};
                    _e = {};
                    _c = 'set-cookie';
                    return [4 /*yield*/, session_server_ts_1.authSessionStorage.destroySession(authSession)];
                case 3: throw _a.apply(void 0, _b.concat([(_d.headers = (_e[_c] = _f.sent(),
                        _e),
                        _d)]));
                case 4: return [2 /*return*/, session.user.id];
            }
        });
    });
}
exports.getUserId = getUserId;
function requireUserId(request, _a) {
    var _b = _a === void 0 ? {} : _a, redirectTo = _b.redirectTo;
    return __awaiter(this, void 0, void 0, function () {
        var userId, requestUrl, loginParams, loginRedirect;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getUserId(request)];
                case 1:
                    userId = _c.sent();
                    if (!userId) {
                        requestUrl = new URL(request.url);
                        redirectTo =
                            redirectTo === null
                                ? null
                                : (redirectTo !== null && redirectTo !== void 0 ? redirectTo : "".concat(requestUrl.pathname).concat(requestUrl.search));
                        loginParams = redirectTo ? new URLSearchParams({ redirectTo: redirectTo }) : null;
                        loginRedirect = ['/login', loginParams === null || loginParams === void 0 ? void 0 : loginParams.toString()]
                            .filter(Boolean)
                            .join('?');
                        throw (0, node_1.redirect)(loginRedirect);
                    }
                    return [2 /*return*/, userId];
            }
        });
    });
}
exports.requireUserId = requireUserId;
function requireAnonymous(request) {
    return __awaiter(this, void 0, void 0, function () {
        var userId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserId(request)];
                case 1:
                    userId = _a.sent();
                    if (userId) {
                        throw (0, node_1.redirect)('/');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.requireAnonymous = requireAnonymous;
function login(_a) {
    var username = _a.username, password = _a.password;
    return __awaiter(this, void 0, void 0, function () {
        var user, session;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, verifyUserPassword({ username: username }, password)];
                case 1:
                    user = _b.sent();
                    if (!user)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, db_server_ts_1.prisma.session.create({
                            select: { id: true, expirationDate: true, userId: true },
                            data: {
                                expirationDate: (0, exports.getSessionExpirationDate)(),
                                userId: user.id
                            }
                        })];
                case 2:
                    session = _b.sent();
                    return [2 /*return*/, session];
            }
        });
    });
}
exports.login = login;
function resetUserPassword(_a) {
    var username = _a.username, password = _a.password;
    return __awaiter(this, void 0, void 0, function () {
        var hashedPassword;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getPasswordHash(password)];
                case 1:
                    hashedPassword = _b.sent();
                    return [2 /*return*/, db_server_ts_1.prisma.user.update({
                            where: { username: username },
                            data: {
                                password: {
                                    update: {
                                        hash: hashedPassword
                                    }
                                }
                            }
                        })];
            }
        });
    });
}
exports.resetUserPassword = resetUserPassword;
function signup(_a) {
    var email = _a.email, username = _a.username, password = _a.password, name = _a.name;
    return __awaiter(this, void 0, void 0, function () {
        var hashedPassword, session;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getPasswordHash(password)];
                case 1:
                    hashedPassword = _b.sent();
                    return [4 /*yield*/, db_server_ts_1.prisma.session.create({
                            data: {
                                expirationDate: (0, exports.getSessionExpirationDate)(),
                                user: {
                                    create: {
                                        email: email.toLowerCase(),
                                        username: username.toLowerCase(),
                                        name: name,
                                        roles: { connect: { name: 'user' } },
                                        password: {
                                            create: {
                                                hash: hashedPassword
                                            }
                                        }
                                    }
                                }
                            },
                            select: { id: true, expirationDate: true }
                        })];
                case 2:
                    session = _b.sent();
                    return [2 /*return*/, session];
            }
        });
    });
}
exports.signup = signup;
function signupWithConnection(_a) {
    var email = _a.email, username = _a.username, name = _a.name, providerId = _a.providerId, providerName = _a.providerName, imageUrl = _a.imageUrl;
    return __awaiter(this, void 0, void 0, function () {
        var session, _b, _c, _d;
        var _e, _f, _g, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    _c = (_b = db_server_ts_1.prisma.session).create;
                    _e = {};
                    _f = {
                        expirationDate: (0, exports.getSessionExpirationDate)()
                    };
                    _g = {};
                    _h = {
                        email: email.toLowerCase(),
                        username: username.toLowerCase(),
                        name: name,
                        roles: { connect: { name: 'user' } },
                        connections: { create: { providerId: providerId, providerName: providerName } }
                    };
                    if (!imageUrl) return [3 /*break*/, 2];
                    _j = {};
                    return [4 /*yield*/, (0, misc_tsx_1.downloadFile)(imageUrl)];
                case 1:
                    _d = (_j.create = _k.sent(), _j);
                    return [3 /*break*/, 3];
                case 2:
                    _d = undefined;
                    _k.label = 3;
                case 3: return [4 /*yield*/, _c.apply(_b, [(_e.data = (_f.user = (_g.create = (_h.image = _d,
                            _h),
                            _g),
                            _f),
                            _e.select = { id: true, expirationDate: true },
                            _e)])];
                case 4:
                    session = _k.sent();
                    return [2 /*return*/, session];
            }
        });
    });
}
exports.signupWithConnection = signupWithConnection;
function logout(_a, responseInit) {
    var request = _a.request, _b = _a.redirectTo, redirectTo = _b === void 0 ? '/' : _b;
    return __awaiter(this, void 0, void 0, function () {
        var authSession, sessionId, _c, _d, _e, _f, _g;
        var _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0: return [4 /*yield*/, session_server_ts_1.authSessionStorage.getSession(request.headers.get('cookie'))];
                case 1:
                    authSession = _k.sent();
                    sessionId = authSession.get(exports.sessionKey);
                    // if this fails, we still need to delete the session from the user's browser
                    // and it doesn't do any harm staying in the db anyway.
                    if (sessionId) {
                        // the .catch is important because that's what triggers the query.
                        // learn more about PrismaPromise: https://www.prisma.io/docs/orm/reference/prisma-client-reference#prismapromise-behavior
                        void db_server_ts_1.prisma.session.deleteMany({ where: { id: sessionId } })["catch"](function () { });
                    }
                    _c = node_1.redirect;
                    _d = [(0, safe_redirect_1.safeRedirect)(redirectTo)];
                    _e = [__assign({}, responseInit)];
                    _h = {};
                    _f = misc_tsx_1.combineHeaders;
                    _j = {};
                    _g = 'set-cookie';
                    return [4 /*yield*/, session_server_ts_1.authSessionStorage.destroySession(authSession)];
                case 2: throw _c.apply(void 0, _d.concat([__assign.apply(void 0, _e.concat([(_h.headers = _f.apply(void 0, [(_j[_g] = _k.sent(), _j), responseInit === null || responseInit === void 0 ? void 0 : responseInit.headers]), _h)]))]));
            }
        });
    });
}
exports.logout = logout;
function getPasswordHash(password) {
    return __awaiter(this, void 0, void 0, function () {
        var hash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcryptjs_1["default"].hash(password, 10)];
                case 1:
                    hash = _a.sent();
                    return [2 /*return*/, hash];
            }
        });
    });
}
exports.getPasswordHash = getPasswordHash;
function verifyUserPassword(where, password) {
    return __awaiter(this, void 0, void 0, function () {
        var userWithPassword, isValid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_server_ts_1.prisma.user.findUnique({
                        where: where,
                        select: { id: true, password: { select: { hash: true } } }
                    })];
                case 1:
                    userWithPassword = _a.sent();
                    if (!userWithPassword || !userWithPassword.password) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, bcryptjs_1["default"].compare(password, userWithPassword.password.hash)];
                case 2:
                    isValid = _a.sent();
                    if (!isValid) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, { id: userWithPassword.id }];
            }
        });
    });
}
exports.verifyUserPassword = verifyUserPassword;
