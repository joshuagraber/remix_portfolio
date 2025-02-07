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
exports.__esModule = true;
exports.loader = void 0;
var node_1 = require("@remix-run/node");
var auth_server_ts_1 = require("#app/utils/auth.server.ts");
var connections_tsx_1 = require("#app/utils/connections.tsx");
var db_server_ts_1 = require("#app/utils/db.server.ts");
var litefs_server_ts_1 = require("#app/utils/litefs.server.ts");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var provider_ts_1 = require("#app/utils/providers/provider.ts");
var redirect_cookie_server_ts_1 = require("#app/utils/redirect-cookie.server.ts");
var toast_server_ts_1 = require("#app/utils/toast.server.ts");
var verification_server_ts_1 = require("#app/utils/verification.server.ts");
var login_server_ts_1 = require("./login.server.ts");
var onboarding_tsx_1 = require("./onboarding.tsx");
var onboarding___provider_tsx_1 = require("./onboarding_.$provider.tsx");
var destroyRedirectTo = { 'set-cookie': redirect_cookie_server_ts_1.destroyRedirectToHeader };
function loader(_a) {
    var request = _a.request, params = _a.params;
    return __awaiter(this, void 0, void 0, function () {
        var providerName, redirectTo, label, authResult, profile, existingConnection, userId, user, _b, _c, verifySession, onboardingRedirect, _d, _e, _f, _g;
        var _h, _j, _k;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0: 
                // this loader performs mutations, so we need to make sure we're on the
                // primary instance to avoid writing to a read-only replica
                return [4 /*yield*/, (0, litefs_server_ts_1.ensurePrimary)()];
                case 1:
                    // this loader performs mutations, so we need to make sure we're on the
                    // primary instance to avoid writing to a read-only replica
                    _l.sent();
                    providerName = connections_tsx_1.ProviderNameSchema.parse(params.provider);
                    redirectTo = (0, redirect_cookie_server_ts_1.getRedirectCookieValue)(request);
                    label = connections_tsx_1.providerLabels[providerName];
                    return [4 /*yield*/, auth_server_ts_1.authenticator
                            .authenticate(providerName, request, { throwOnError: true })
                            .then(function (data) { return ({ success: true, data: data }); }, function (error) { return ({ success: false, error: error }); })];
                case 2:
                    authResult = _l.sent();
                    if (!!authResult.success) return [3 /*break*/, 4];
                    console.error(authResult.error);
                    return [4 /*yield*/, (0, toast_server_ts_1.redirectWithToast)('/login', {
                            title: 'Auth Failed',
                            description: "There was an error authenticating with ".concat(label, "."),
                            type: 'error'
                        }, { headers: destroyRedirectTo })];
                case 3: throw _l.sent();
                case 4:
                    profile = authResult.data;
                    return [4 /*yield*/, db_server_ts_1.prisma.connection.findUnique({
                            select: { userId: true },
                            where: {
                                providerName_providerId: { providerName: providerName, providerId: profile.id }
                            }
                        })];
                case 5:
                    existingConnection = _l.sent();
                    return [4 /*yield*/, (0, auth_server_ts_1.getUserId)(request)];
                case 6:
                    userId = _l.sent();
                    if (existingConnection && userId) {
                        if (existingConnection.userId === userId) {
                            return [2 /*return*/, (0, toast_server_ts_1.redirectWithToast)('/settings/profile/connections', {
                                    title: 'Already Connected',
                                    description: "Your \"".concat(profile.username, "\" ").concat(label, " account is already connected.")
                                }, { headers: destroyRedirectTo })];
                        }
                        else {
                            return [2 /*return*/, (0, toast_server_ts_1.redirectWithToast)('/settings/profile/connections', {
                                    title: 'Already Connected',
                                    description: "The \"".concat(profile.username, "\" ").concat(label, " account is already connected to another account.")
                                }, { headers: destroyRedirectTo })];
                        }
                    }
                    if (!userId) return [3 /*break*/, 8];
                    return [4 /*yield*/, db_server_ts_1.prisma.connection.create({
                            data: {
                                providerName: providerName,
                                providerId: profile.id,
                                userId: userId
                            }
                        })];
                case 7:
                    _l.sent();
                    return [2 /*return*/, (0, toast_server_ts_1.redirectWithToast)('/settings/profile/connections', {
                            title: 'Connected',
                            type: 'success',
                            description: "Your \"".concat(profile.username, "\" ").concat(label, " account has been connected.")
                        }, { headers: destroyRedirectTo })];
                case 8:
                    // Connection exists already? Make a new session
                    if (existingConnection) {
                        return [2 /*return*/, makeSession({ request: request, userId: existingConnection.userId })];
                    }
                    return [4 /*yield*/, db_server_ts_1.prisma.user.findUnique({
                            select: { id: true },
                            where: { email: profile.email.toLowerCase() }
                        })];
                case 9:
                    user = _l.sent();
                    if (!user) return [3 /*break*/, 12];
                    return [4 /*yield*/, db_server_ts_1.prisma.connection.create({
                            data: {
                                providerName: providerName,
                                providerId: profile.id,
                                userId: user.id
                            }
                        })];
                case 10:
                    _l.sent();
                    _b = makeSession;
                    _c = [{ request: request, userId: user.id }];
                    _h = {};
                    return [4 /*yield*/, (0, toast_server_ts_1.createToastHeaders)({
                            title: 'Connected',
                            description: "Your \"".concat(profile.username, "\" ").concat(label, " account has been connected.")
                        })];
                case 11: return [2 /*return*/, _b.apply(void 0, _c.concat([(_h.headers = _l.sent(),
                            _h)]))];
                case 12: return [4 /*yield*/, verification_server_ts_1.verifySessionStorage.getSession()];
                case 13:
                    verifySession = _l.sent();
                    verifySession.set(onboarding_tsx_1.onboardingEmailSessionKey, profile.email);
                    verifySession.set(onboarding___provider_tsx_1.prefilledProfileKey, __assign(__assign({}, profile), { email: (0, provider_ts_1.normalizeEmail)(profile.email), username: typeof profile.username === 'string'
                            ? (0, provider_ts_1.normalizeUsername)(profile.username)
                            : undefined }));
                    verifySession.set(onboarding___provider_tsx_1.providerIdKey, profile.id);
                    onboardingRedirect = [
                        "/onboarding/".concat(providerName),
                        redirectTo ? new URLSearchParams({ redirectTo: redirectTo }) : null,
                    ]
                        .filter(Boolean)
                        .join('?');
                    _d = node_1.redirect;
                    _e = [onboardingRedirect];
                    _j = {};
                    _f = misc_tsx_1.combineHeaders;
                    _k = {};
                    _g = 'set-cookie';
                    return [4 /*yield*/, verification_server_ts_1.verifySessionStorage.commitSession(verifySession)];
                case 14: return [2 /*return*/, _d.apply(void 0, _e.concat([(_j.headers = _f.apply(void 0, [(_k[_g] = _l.sent(), _k), destroyRedirectTo]),
                            _j)]))];
            }
        });
    });
}
exports.loader = loader;
function makeSession(_a, responseInit) {
    var request = _a.request, userId = _a.userId, redirectTo = _a.redirectTo;
    return __awaiter(this, void 0, void 0, function () {
        var session;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    redirectTo !== null && redirectTo !== void 0 ? redirectTo : (redirectTo = '/');
                    return [4 /*yield*/, db_server_ts_1.prisma.session.create({
                            select: { id: true, expirationDate: true, userId: true },
                            data: {
                                expirationDate: (0, auth_server_ts_1.getSessionExpirationDate)(),
                                userId: userId
                            }
                        })];
                case 1:
                    session = _b.sent();
                    return [2 /*return*/, (0, login_server_ts_1.handleNewSession)({ request: request, session: session, redirectTo: redirectTo, remember: true }, { headers: (0, misc_tsx_1.combineHeaders)(responseInit === null || responseInit === void 0 ? void 0 : responseInit.headers, destroyRedirectTo) })];
            }
        });
    });
}
