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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
exports.__esModule = true;
exports.waitFor = exports.expect = exports.test = void 0;
var test_1 = require("@playwright/test");
var setCookieParser = __importStar(require("set-cookie-parser"));
var auth_server_ts_1 = require("#app/utils/auth.server.ts");
var db_server_ts_1 = require("#app/utils/db.server.ts");
var constants_js_1 = require("#app/utils/providers/constants.js");
var provider_js_1 = require("#app/utils/providers/provider.js");
var session_server_ts_1 = require("#app/utils/session.server.ts");
var db_utils_ts_1 = require("./db-utils.ts");
var github_ts_1 = require("./mocks/github.ts");
__exportStar(require("./db-utils.ts"), exports);
function getOrInsertUser(_a) {
    var _b = _a === void 0 ? {} : _a, id = _b.id, username = _b.username, password = _b.password, email = _b.email;
    return __awaiter(this, void 0, void 0, function () {
        var select, userData, _c, _d, _e;
        var _f, _g, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    select = { id: true, email: true, username: true, name: true };
                    if (!id) return [3 /*break*/, 2];
                    return [4 /*yield*/, db_server_ts_1.prisma.user.findUniqueOrThrow({
                            select: select,
                            where: { id: id }
                        })];
                case 1: return [2 /*return*/, _k.sent()];
                case 2:
                    userData = (0, db_utils_ts_1.createUser)();
                    username !== null && username !== void 0 ? username : (username = userData.username);
                    password !== null && password !== void 0 ? password : (password = userData.username);
                    email !== null && email !== void 0 ? email : (email = userData.email);
                    _d = (_c = db_server_ts_1.prisma.user).create;
                    _f = {
                        select: select
                    };
                    _e = [__assign({}, userData)];
                    _g = { email: email, username: username, roles: { connect: { name: 'user' } } };
                    _h = {};
                    _j = {};
                    return [4 /*yield*/, (0, auth_server_ts_1.getPasswordHash)(password)];
                case 3: return [4 /*yield*/, _d.apply(_c, [(_f.data = __assign.apply(void 0, _e.concat([(_g.password = (_h.create = (_j.hash = _k.sent(), _j), _h), _g)])),
                            _f)])];
                case 4: return [2 /*return*/, _k.sent()];
            }
        });
    });
}
exports.test = test_1.test.extend({
    insertNewUser: function (_a, use) { return __awaiter(void 0, void 0, void 0, function () {
        var userId;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = undefined;
                    return [4 /*yield*/, use(function (options) { return __awaiter(void 0, void 0, void 0, function () {
                            var user;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, getOrInsertUser(options)];
                                    case 1:
                                        user = _a.sent();
                                        userId = user.id;
                                        return [2 /*return*/, user];
                                }
                            });
                        }); })];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, db_server_ts_1.prisma.user["delete"]({ where: { id: userId } })["catch"](function () { })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); },
    login: function (_a, use) {
        var page = _a.page;
        return __awaiter(void 0, void 0, void 0, function () {
            var userId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = undefined;
                        return [4 /*yield*/, use(function (options) { return __awaiter(void 0, void 0, void 0, function () {
                                var user, session, authSession, cookieConfig, _a, _b, newConfig;
                                var _c;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0: return [4 /*yield*/, getOrInsertUser(options)];
                                        case 1:
                                            user = _d.sent();
                                            userId = user.id;
                                            return [4 /*yield*/, db_server_ts_1.prisma.session.create({
                                                    data: {
                                                        expirationDate: (0, auth_server_ts_1.getSessionExpirationDate)(),
                                                        userId: user.id
                                                    },
                                                    select: { id: true }
                                                })];
                                        case 2:
                                            session = _d.sent();
                                            return [4 /*yield*/, session_server_ts_1.authSessionStorage.getSession()];
                                        case 3:
                                            authSession = _d.sent();
                                            authSession.set(auth_server_ts_1.sessionKey, session.id);
                                            _b = (_a = setCookieParser).parseString;
                                            return [4 /*yield*/, session_server_ts_1.authSessionStorage.commitSession(authSession)];
                                        case 4:
                                            cookieConfig = _b.apply(_a, [_d.sent()]);
                                            newConfig = __assign(__assign({}, cookieConfig), { domain: 'localhost', expires: (_c = cookieConfig.expires) === null || _c === void 0 ? void 0 : _c.getTime(), sameSite: cookieConfig.sameSite });
                                            return [4 /*yield*/, page.context().addCookies([newConfig])];
                                        case 5:
                                            _d.sent();
                                            return [2 /*return*/, user];
                                    }
                                });
                            }); })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, db_server_ts_1.prisma.user.deleteMany({ where: { id: userId } })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    prepareGitHubUser: function (_a, use, testInfo) {
        var page = _a.page;
        return __awaiter(void 0, void 0, void 0, function () {
            var ghUser, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, page.route(/\/auth\/github(?!\/callback)/, function (route, request) { return __awaiter(void 0, void 0, void 0, function () {
                            var headers;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        headers = __assign(__assign({}, request.headers()), (_a = {}, _a[constants_js_1.MOCK_CODE_GITHUB_HEADER] = testInfo.testId, _a));
                                        return [4 /*yield*/, route["continue"]({ headers: headers })];
                                    case 1:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _b.sent();
                        ghUser = null;
                        return [4 /*yield*/, use(function () { return __awaiter(void 0, void 0, void 0, function () {
                                var newGitHubUser;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, (0, github_ts_1.insertGitHubUser)(testInfo.testId)];
                                        case 1:
                                            newGitHubUser = _a.sent();
                                            ghUser = newGitHubUser;
                                            return [2 /*return*/, newGitHubUser];
                                    }
                                });
                            }); })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, db_server_ts_1.prisma.user.findUniqueOrThrow({
                                select: { id: true, name: true },
                                where: { email: (0, provider_js_1.normalizeEmail)(ghUser.primaryEmail) }
                            })];
                    case 3:
                        user = _b.sent();
                        return [4 /*yield*/, db_server_ts_1.prisma.user["delete"]({ where: { id: user.id } })];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, db_server_ts_1.prisma.session.deleteMany({ where: { userId: user.id } })];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, (0, github_ts_1.deleteGitHubUser)(ghUser.primaryEmail)];
                    case 6:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
});
exports.expect = exports.test.expect;
/**
 * This allows you to wait for something (like an email to be available).
 *
 * It calls the callback every 50ms until it returns a value (and does not throw
 * an error). After the timeout, it will throw the last error that was thrown or
 * throw the error message provided as a fallback
 */
function waitFor(cb, _a) {
    var _b = _a === void 0 ? {} : _a, errorMessage = _b.errorMessage, _c = _b.timeout, timeout = _c === void 0 ? 5000 : _c;
    return __awaiter(this, void 0, void 0, function () {
        var endTime, lastError, response, e_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    endTime = Date.now() + timeout;
                    lastError = new Error(errorMessage);
                    _d.label = 1;
                case 1:
                    if (!(Date.now() < endTime)) return [3 /*break*/, 7];
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, cb()];
                case 3:
                    response = _d.sent();
                    if (response)
                        return [2 /*return*/, response];
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _d.sent();
                    lastError = e_1;
                    return [3 /*break*/, 5];
                case 5: return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 100); })];
                case 6:
                    _d.sent();
                    return [3 /*break*/, 1];
                case 7: throw lastError;
            }
        });
    });
}
exports.waitFor = waitFor;
