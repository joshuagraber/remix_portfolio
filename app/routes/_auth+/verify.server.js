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
exports.validateRequest = exports.isCodeValid = exports.prepareVerification = exports.requireRecentVerification = exports.getRedirectToUrl = void 0;
var zod_1 = require("@conform-to/zod");
var node_1 = require("@remix-run/node");
var zod_2 = require("zod");
var profile_change_email_server_tsx_1 = require("#app/routes/settings+/profile.change-email.server.tsx");
var profile_two_factor_tsx_1 = require("#app/routes/settings+/profile.two-factor.tsx");
var auth_server_ts_1 = require("#app/utils/auth.server.ts");
var db_server_ts_1 = require("#app/utils/db.server.ts");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var toast_server_ts_1 = require("#app/utils/toast.server.ts");
var totp_server_ts_1 = require("#app/utils/totp.server.ts");
var login_server_ts_1 = require("./login.server.ts");
var onboarding_server_ts_1 = require("./onboarding.server.ts");
var reset_password_server_ts_1 = require("./reset-password.server.ts");
var verify_tsx_1 = require("./verify.tsx");
function getRedirectToUrl(_a) {
    var request = _a.request, type = _a.type, target = _a.target, redirectTo = _a.redirectTo;
    var redirectToUrl = new URL("".concat((0, misc_tsx_1.getDomainUrl)(request), "/verify"));
    redirectToUrl.searchParams.set(verify_tsx_1.typeQueryParam, type);
    redirectToUrl.searchParams.set(verify_tsx_1.targetQueryParam, target);
    if (redirectTo) {
        redirectToUrl.searchParams.set(verify_tsx_1.redirectToQueryParam, redirectTo);
    }
    return redirectToUrl;
}
exports.getRedirectToUrl = getRedirectToUrl;
function requireRecentVerification(request) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, shouldReverify, reqUrl, redirectUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, auth_server_ts_1.requireUserId)(request)];
                case 1:
                    userId = _a.sent();
                    return [4 /*yield*/, (0, login_server_ts_1.shouldRequestTwoFA)(request)];
                case 2:
                    shouldReverify = _a.sent();
                    if (!shouldReverify) return [3 /*break*/, 4];
                    reqUrl = new URL(request.url);
                    redirectUrl = getRedirectToUrl({
                        request: request,
                        target: userId,
                        type: profile_two_factor_tsx_1.twoFAVerificationType,
                        redirectTo: reqUrl.pathname + reqUrl.search
                    });
                    return [4 /*yield*/, (0, toast_server_ts_1.redirectWithToast)(redirectUrl.toString(), {
                            title: 'Please Reverify',
                            description: 'Please reverify your account before proceeding'
                        })];
                case 3: throw _a.sent();
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.requireRecentVerification = requireRecentVerification;
function prepareVerification(_a) {
    var period = _a.period, request = _a.request, type = _a.type, target = _a.target;
    return __awaiter(this, void 0, void 0, function () {
        var verifyUrl, redirectTo, _b, otp, verificationConfig, verificationData;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    verifyUrl = getRedirectToUrl({ request: request, type: type, target: target });
                    redirectTo = new URL(verifyUrl.toString());
                    return [4 /*yield*/, (0, totp_server_ts_1.generateTOTP)({
                            algorithm: 'SHA-256',
                            // Leaving off 0, O, and I on purpose to avoid confusing users.
                            charSet: 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789',
                            period: period
                        })];
                case 1:
                    _b = _c.sent(), otp = _b.otp, verificationConfig = __rest(_b, ["otp"]);
                    verificationData = __assign(__assign({ type: type, target: target }, verificationConfig), { expiresAt: new Date(Date.now() + verificationConfig.period * 1000) });
                    return [4 /*yield*/, db_server_ts_1.prisma.verification.upsert({
                            where: { target_type: { target: target, type: type } },
                            create: verificationData,
                            update: verificationData
                        })
                        // add the otp to the url we'll email the user.
                    ];
                case 2:
                    _c.sent();
                    // add the otp to the url we'll email the user.
                    verifyUrl.searchParams.set(verify_tsx_1.codeQueryParam, otp);
                    return [2 /*return*/, { otp: otp, redirectTo: redirectTo, verifyUrl: verifyUrl }];
            }
        });
    });
}
exports.prepareVerification = prepareVerification;
function isCodeValid(_a) {
    var code = _a.code, type = _a.type, target = _a.target;
    return __awaiter(this, void 0, void 0, function () {
        var verification, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, db_server_ts_1.prisma.verification.findUnique({
                        where: {
                            target_type: { target: target, type: type },
                            OR: [{ expiresAt: { gt: new Date() } }, { expiresAt: null }]
                        },
                        select: { algorithm: true, secret: true, period: true, charSet: true }
                    })];
                case 1:
                    verification = _b.sent();
                    if (!verification)
                        return [2 /*return*/, false];
                    return [4 /*yield*/, (0, totp_server_ts_1.verifyTOTP)(__assign({ otp: code }, verification))];
                case 2:
                    result = _b.sent();
                    if (!result)
                        return [2 /*return*/, false];
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.isCodeValid = isCodeValid;
function validateRequest(request, body) {
    return __awaiter(this, void 0, void 0, function () {
        function deleteVerification() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, db_server_ts_1.prisma.verification["delete"]({
                                where: {
                                    target_type: {
                                        type: submissionValue[verify_tsx_1.typeQueryParam],
                                        target: submissionValue[verify_tsx_1.targetQueryParam]
                                    }
                                }
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        var submission, submissionValue, _a;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, zod_1.parseWithZod)(body, {
                        schema: verify_tsx_1.VerifySchema.superRefine(function (data, ctx) { return __awaiter(_this, void 0, void 0, function () {
                            var codeIsValid;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, isCodeValid({
                                            code: data[verify_tsx_1.codeQueryParam],
                                            type: data[verify_tsx_1.typeQueryParam],
                                            target: data[verify_tsx_1.targetQueryParam]
                                        })];
                                    case 1:
                                        codeIsValid = _a.sent();
                                        if (!codeIsValid) {
                                            ctx.addIssue({
                                                path: ['code'],
                                                code: zod_2.z.ZodIssueCode.custom,
                                                message: "Invalid code"
                                            });
                                            return [2 /*return*/];
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }),
                        async: true
                    })];
                case 1:
                    submission = _b.sent();
                    if (submission.status !== 'success') {
                        return [2 /*return*/, (0, node_1.json)({ result: submission.reply() }, { status: submission.status === 'error' ? 400 : 200 })];
                    }
                    submissionValue = submission.value;
                    _a = submissionValue[verify_tsx_1.typeQueryParam];
                    switch (_a) {
                        case 'reset-password': return [3 /*break*/, 2];
                        case 'onboarding': return [3 /*break*/, 4];
                        case 'change-email': return [3 /*break*/, 6];
                        case '2fa': return [3 /*break*/, 8];
                    }
                    return [3 /*break*/, 9];
                case 2: return [4 /*yield*/, deleteVerification()];
                case 3:
                    _b.sent();
                    return [2 /*return*/, (0, reset_password_server_ts_1.handleVerification)({ request: request, body: body, submission: submission })];
                case 4: return [4 /*yield*/, deleteVerification()];
                case 5:
                    _b.sent();
                    return [2 /*return*/, (0, onboarding_server_ts_1.handleVerification)({ request: request, body: body, submission: submission })];
                case 6: return [4 /*yield*/, deleteVerification()];
                case 7:
                    _b.sent();
                    return [2 /*return*/, (0, profile_change_email_server_tsx_1.handleVerification)({ request: request, body: body, submission: submission })];
                case 8:
                    {
                        return [2 /*return*/, (0, login_server_ts_1.handleVerification)({ request: request, body: body, submission: submission })];
                    }
                    _b.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.validateRequest = validateRequest;
