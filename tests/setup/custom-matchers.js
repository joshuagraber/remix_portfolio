"use strict";
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
exports.__esModule = true;
var setCookieParser = __importStar(require("set-cookie-parser"));
var vitest_1 = require("vitest");
var auth_server_ts_1 = require("#app/utils/auth.server.ts");
var db_server_ts_1 = require("#app/utils/db.server.ts");
var session_server_ts_1 = require("#app/utils/session.server.ts");
var toast_server_ts_1 = require("#app/utils/toast.server.ts");
var utils_ts_1 = require("#tests/utils.ts");
require("@testing-library/jest-dom/vitest");
vitest_1.expect.extend({
    toHaveRedirect: function (response, redirectTo) {
        var _this = this;
        if (!(response instanceof Response)) {
            throw new Error('toHaveRedirect must be called with a Response');
        }
        var location = response.headers.get('location');
        var redirectToSupplied = redirectTo !== undefined;
        if (redirectToSupplied !== Boolean(location)) {
            return {
                pass: Boolean(location),
                message: function () {
                    return "Expected response to ".concat(_this.isNot ? 'not ' : '', "redirect").concat(redirectToSupplied
                        ? " to ".concat(_this.utils.printExpected(redirectTo))
                        : '', " but got ").concat(location ? 'no redirect' : _this.utils.printReceived(location));
                }
            };
        }
        var isRedirectStatusCode = response.status >= 300 && response.status < 400;
        if (!isRedirectStatusCode) {
            return {
                pass: false,
                message: function () {
                    return "Expected redirect to ".concat(_this.isNot ? 'not ' : '', "be ").concat(_this.utils.printExpected('>= 300 && < 400'), " but got ").concat(_this.utils.printReceived(response.status));
                }
            };
        }
        function toUrl(s) {
            s !== null && s !== void 0 ? s : (s = '');
            return s.startsWith('http')
                ? new URL(s)
                : new URL(s, 'https://example.com');
        }
        function urlsMatch(u1, u2) {
            var u1SP = new URL(u1).searchParams;
            u1SP.sort();
            var u2SP = new URL(u2).searchParams;
            u2SP.sort();
            return (u1.origin === u2.origin &&
                u1.pathname === u2.pathname &&
                u1SP.toString() === u2SP.toString() &&
                u1.hash === u2.hash);
        }
        return {
            pass: location == redirectTo || urlsMatch(toUrl(location), toUrl(redirectTo)),
            message: function () {
                return "Expected response to ".concat(_this.isNot ? 'not ' : '', "redirect to ").concat(_this.utils.printExpected(redirectTo), " but got ").concat(_this.utils.printReceived(location));
            }
        };
    },
    toHaveSessionForUser: function (response, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var setCookies, sessionSetCookie, authSession, sessionValue, session;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setCookies = response.headers.getSetCookie();
                        sessionSetCookie = setCookies.find(function (c) { return setCookieParser.parseString(c).name === 'en_session'; });
                        if (!sessionSetCookie) {
                            return [2 /*return*/, {
                                    pass: false,
                                    message: function () {
                                        return "The en_session set-cookie header was".concat(_this.isNot ? '' : ' not', " defined");
                                    }
                                }];
                        }
                        return [4 /*yield*/, session_server_ts_1.authSessionStorage.getSession((0, utils_ts_1.convertSetCookieToCookie)(sessionSetCookie))];
                    case 1:
                        authSession = _a.sent();
                        sessionValue = authSession.get(auth_server_ts_1.sessionKey);
                        if (!sessionValue) {
                            return [2 /*return*/, {
                                    pass: false,
                                    message: function () { return "A session was".concat(_this.isNot ? '' : ' not', " set in cookie"); }
                                }];
                        }
                        return [4 /*yield*/, db_server_ts_1.prisma.session.findUnique({
                                select: { id: true },
                                where: { userId: userId, id: sessionValue }
                            })];
                    case 2:
                        session = _a.sent();
                        return [2 /*return*/, {
                                pass: Boolean(session),
                                message: function () {
                                    return "A session was".concat(_this.isNot ? ' not' : '', " created in the database for ").concat(userId);
                                }
                            }];
                }
            });
        });
    },
    toSendToast: function (response, toast) {
        return __awaiter(this, void 0, void 0, function () {
            var setCookies, toastSetCookie, toastSession, toastValue, pass, diff;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setCookies = response.headers.getSetCookie();
                        toastSetCookie = setCookies.find(function (c) { return setCookieParser.parseString(c).name === 'en_toast'; });
                        if (!toastSetCookie) {
                            return [2 /*return*/, {
                                    pass: false,
                                    message: function () {
                                        return "en_toast set-cookie header was".concat(_this.isNot ? '' : ' not', " defined");
                                    }
                                }];
                        }
                        return [4 /*yield*/, toast_server_ts_1.toastSessionStorage.getSession((0, utils_ts_1.convertSetCookieToCookie)(toastSetCookie))];
                    case 1:
                        toastSession = _a.sent();
                        toastValue = toastSession.get(toast_server_ts_1.toastKey);
                        if (!toastValue) {
                            return [2 /*return*/, {
                                    pass: false,
                                    message: function () { return "toast was".concat(_this.isNot ? '' : ' not', " set in session"); }
                                }];
                        }
                        pass = this.equals(toastValue, toast);
                        diff = pass ? null : "\n".concat(this.utils.diff(toastValue, toast));
                        return [2 /*return*/, {
                                pass: pass,
                                message: function () {
                                    return "toast in the response ".concat(_this.isNot ? 'does not match' : 'matches', " the expected toast").concat(diff);
                                }
                            }];
                }
            });
        });
    }
});
