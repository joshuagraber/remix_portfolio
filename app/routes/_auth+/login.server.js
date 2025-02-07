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
exports.shouldRequestTwoFA = exports.handleVerification = exports.handleNewSession = void 0;
var invariant_1 = require("@epic-web/invariant");
var node_1 = require("@remix-run/node");
var safe_redirect_1 = require("remix-utils/safe-redirect");
var profile_two_factor_tsx_1 = require("#app/routes/settings+/profile.two-factor.tsx");
var auth_server_ts_1 = require("#app/utils/auth.server.ts");
var db_server_ts_1 = require("#app/utils/db.server.ts");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var session_server_ts_1 = require("#app/utils/session.server.ts");
var toast_server_ts_1 = require("#app/utils/toast.server.ts");
var verification_server_ts_1 = require("#app/utils/verification.server.ts");
var verify_server_ts_1 = require("./verify.server.ts");
var verifiedTimeKey = 'verified-time';
var unverifiedSessionIdKey = 'unverified-session-id';
var rememberKey = 'remember';
function handleNewSession(_a, responseInit) {
    var request = _a.request, session = _a.session, redirectTo = _a.redirectTo, remember = _a.remember;
    return __awaiter(this, void 0, void 0, function () {
        var verification, userHasTwoFactor, verifySession, redirectUrl, _b, _c, _d, _e, authSession, _f, _g, _h, _j;
        var _k, _l, _m, _o;
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0: return [4 /*yield*/, db_server_ts_1.prisma.verification.findUnique({
                        select: { id: true },
                        where: {
                            target_type: { target: session.userId, type: profile_two_factor_tsx_1.twoFAVerificationType }
                        }
                    })];
                case 1:
                    verification = _p.sent();
                    userHasTwoFactor = Boolean(verification);
                    if (!userHasTwoFactor) return [3 /*break*/, 4];
                    return [4 /*yield*/, verification_server_ts_1.verifySessionStorage.getSession()];
                case 2:
                    verifySession = _p.sent();
                    verifySession.set(unverifiedSessionIdKey, session.id);
                    verifySession.set(rememberKey, remember);
                    redirectUrl = (0, verify_server_ts_1.getRedirectToUrl)({
                        request: request,
                        type: profile_two_factor_tsx_1.twoFAVerificationType,
                        target: session.userId,
                        redirectTo: redirectTo
                    });
                    _b = node_1.redirect;
                    _c = ["".concat(redirectUrl.pathname, "?").concat(redirectUrl.searchParams)];
                    _d = misc_tsx_1.combineResponseInits;
                    _k = {};
                    _l = {};
                    _e = 'set-cookie';
                    return [4 /*yield*/, verification_server_ts_1.verifySessionStorage.commitSession(verifySession)];
                case 3: return [2 /*return*/, _b.apply(void 0, _c.concat([_d.apply(void 0, [(_k.headers = (_l[_e] = _p.sent(),
                                _l),
                                _k), responseInit])]))];
                case 4: return [4 /*yield*/, session_server_ts_1.authSessionStorage.getSession(request.headers.get('cookie'))];
                case 5:
                    authSession = _p.sent();
                    authSession.set(auth_server_ts_1.sessionKey, session.id);
                    _f = node_1.redirect;
                    _g = [(0, safe_redirect_1.safeRedirect)(redirectTo)];
                    _h = misc_tsx_1.combineResponseInits;
                    _m = {};
                    _o = {};
                    _j = 'set-cookie';
                    return [4 /*yield*/, session_server_ts_1.authSessionStorage.commitSession(authSession, {
                            expires: remember ? session.expirationDate : undefined
                        })];
                case 6: return [2 /*return*/, _f.apply(void 0, _g.concat([_h.apply(void 0, [(_m.headers = (_o[_j] = _p.sent(),
                                _o),
                                _m), responseInit])]))];
            }
        });
    });
}
exports.handleNewSession = handleNewSession;
function handleVerification(_a) {
    var request = _a.request, submission = _a.submission;
    return __awaiter(this, void 0, void 0, function () {
        var authSession, verifySession, remember, redirectTo, headers, unverifiedSessionId, session, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    (0, invariant_1.invariant)(submission.status === 'success', 'Submission should be successful by now');
                    return [4 /*yield*/, session_server_ts_1.authSessionStorage.getSession(request.headers.get('cookie'))];
                case 1:
                    authSession = _l.sent();
                    return [4 /*yield*/, verification_server_ts_1.verifySessionStorage.getSession(request.headers.get('cookie'))];
                case 2:
                    verifySession = _l.sent();
                    remember = verifySession.get(rememberKey);
                    redirectTo = submission.value.redirectTo;
                    headers = new Headers();
                    authSession.set(verifiedTimeKey, Date.now());
                    unverifiedSessionId = verifySession.get(unverifiedSessionIdKey);
                    if (!unverifiedSessionId) return [3 /*break*/, 7];
                    return [4 /*yield*/, db_server_ts_1.prisma.session.findUnique({
                            select: { expirationDate: true },
                            where: { id: unverifiedSessionId }
                        })];
                case 3:
                    session = _l.sent();
                    if (!!session) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, toast_server_ts_1.redirectWithToast)('/login', {
                            type: 'error',
                            title: 'Invalid session',
                            description: 'Could not find session to verify. Please try again.'
                        })];
                case 4: throw _l.sent();
                case 5:
                    authSession.set(auth_server_ts_1.sessionKey, unverifiedSessionId);
                    _c = (_b = headers).append;
                    _d = ['set-cookie'];
                    return [4 /*yield*/, session_server_ts_1.authSessionStorage.commitSession(authSession, {
                            expires: remember ? session.expirationDate : undefined
                        })];
                case 6:
                    _c.apply(_b, _d.concat([_l.sent()]));
                    return [3 /*break*/, 9];
                case 7:
                    _f = (_e = headers).append;
                    _g = ['set-cookie'];
                    return [4 /*yield*/, session_server_ts_1.authSessionStorage.commitSession(authSession)];
                case 8:
                    _f.apply(_e, _g.concat([_l.sent()]));
                    _l.label = 9;
                case 9:
                    _j = (_h = headers).append;
                    _k = ['set-cookie'];
                    return [4 /*yield*/, verification_server_ts_1.verifySessionStorage.destroySession(verifySession)];
                case 10:
                    _j.apply(_h, _k.concat([_l.sent()]));
                    return [2 /*return*/, (0, node_1.redirect)((0, safe_redirect_1.safeRedirect)(redirectTo), { headers: headers })];
            }
        });
    });
}
exports.handleVerification = handleVerification;
function shouldRequestTwoFA(request) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var authSession, verifySession, userId, userHasTwoFA, verifiedTime, twoHours;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, session_server_ts_1.authSessionStorage.getSession(request.headers.get('cookie'))];
                case 1:
                    authSession = _b.sent();
                    return [4 /*yield*/, verification_server_ts_1.verifySessionStorage.getSession(request.headers.get('cookie'))];
                case 2:
                    verifySession = _b.sent();
                    if (verifySession.has(unverifiedSessionIdKey))
                        return [2 /*return*/, true];
                    return [4 /*yield*/, (0, auth_server_ts_1.getUserId)(request)];
                case 3:
                    userId = _b.sent();
                    if (!userId)
                        return [2 /*return*/, false
                            // if it's over two hours since they last verified, we should request 2FA again
                        ];
                    return [4 /*yield*/, db_server_ts_1.prisma.verification.findUnique({
                            select: { id: true },
                            where: { target_type: { target: userId, type: profile_two_factor_tsx_1.twoFAVerificationType } }
                        })];
                case 4:
                    userHasTwoFA = _b.sent();
                    if (!userHasTwoFA)
                        return [2 /*return*/, false];
                    verifiedTime = (_a = authSession.get(verifiedTimeKey)) !== null && _a !== void 0 ? _a : new Date(0);
                    twoHours = 1000 * 60 * 2;
                    return [2 /*return*/, Date.now() - verifiedTime > twoHours];
            }
        });
    });
}
exports.shouldRequestTwoFA = shouldRequestTwoFA;
