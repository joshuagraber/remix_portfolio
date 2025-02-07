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
exports.__esModule = true;
exports.action = exports.loader = exports.twoFAVerifyVerificationType = exports.handle = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@conform-to/react");
var zod_1 = require("@conform-to/zod");
var node_1 = require("@remix-run/node");
var react_2 = require("@remix-run/react");
var QRCode = __importStar(require("qrcode"));
var zod_2 = require("zod");
var forms_tsx_1 = require("#app/components/forms.tsx");
var icon_tsx_1 = require("#app/components/ui/icon.tsx");
var status_button_tsx_1 = require("#app/components/ui/status-button.tsx");
var verify_server_ts_1 = require("#app/routes/_auth+/verify.server.ts");
var auth_server_ts_1 = require("#app/utils/auth.server.ts");
var db_server_ts_1 = require("#app/utils/db.server.ts");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var toast_server_ts_1 = require("#app/utils/toast.server.ts");
var totp_server_ts_1 = require("#app/utils/totp.server.ts");
var profile_two_factor_tsx_1 = require("./profile.two-factor.tsx");
exports.handle = {
    breadcrumb: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "check" }, { children: "Verify" })),
    getSitemapEntries: function () { return null; }
};
var CancelSchema = zod_2.z.object({ intent: zod_2.z.literal('cancel') });
var VerifySchema = zod_2.z.object({
    intent: zod_2.z.literal('verify'),
    code: zod_2.z.string().min(6).max(6)
});
var ActionSchema = zod_2.z.discriminatedUnion('intent', [
    CancelSchema,
    VerifySchema,
]);
exports.twoFAVerifyVerificationType = '2fa-verify';
function loader(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var userId, verification, user, issuer, otpUri, qrCode;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, auth_server_ts_1.requireUserId)(request)];
                case 1:
                    userId = _b.sent();
                    return [4 /*yield*/, db_server_ts_1.prisma.verification.findUnique({
                            where: {
                                target_type: { type: exports.twoFAVerifyVerificationType, target: userId }
                            },
                            select: {
                                id: true,
                                algorithm: true,
                                secret: true,
                                period: true,
                                digits: true
                            }
                        })];
                case 2:
                    verification = _b.sent();
                    if (!verification) {
                        return [2 /*return*/, (0, node_1.redirect)('/settings/profile/two-factor')];
                    }
                    return [4 /*yield*/, db_server_ts_1.prisma.user.findUniqueOrThrow({
                            where: { id: userId },
                            select: { email: true }
                        })];
                case 3:
                    user = _b.sent();
                    issuer = new URL((0, misc_tsx_1.getDomainUrl)(request)).host;
                    otpUri = (0, totp_server_ts_1.getTOTPAuthUri)(__assign(__assign({}, verification), { 
                        // OTP clients break with the `-` in the algorithm name.
                        algorithm: verification.algorithm.replaceAll('-', ''), accountName: user.email, issuer: issuer }));
                    return [4 /*yield*/, QRCode.toDataURL(otpUri)];
                case 4:
                    qrCode = _b.sent();
                    return [2 /*return*/, (0, node_1.json)({ otpUri: otpUri, qrCode: qrCode })];
            }
        });
    });
}
exports.loader = loader;
function action(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var userId, formData, submission, _b;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, auth_server_ts_1.requireUserId)(request)];
                case 1:
                    userId = _c.sent();
                    return [4 /*yield*/, request.formData()];
                case 2:
                    formData = _c.sent();
                    return [4 /*yield*/, (0, zod_1.parseWithZod)(formData, {
                            schema: function () {
                                return ActionSchema.superRefine(function (data, ctx) { return __awaiter(_this, void 0, void 0, function () {
                                    var codeIsValid;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (data.intent === 'cancel')
                                                    return [2 /*return*/, null];
                                                return [4 /*yield*/, (0, verify_server_ts_1.isCodeValid)({
                                                        code: data.code,
                                                        type: exports.twoFAVerifyVerificationType,
                                                        target: userId
                                                    })];
                                            case 1:
                                                codeIsValid = _a.sent();
                                                if (!codeIsValid) {
                                                    ctx.addIssue({
                                                        path: ['code'],
                                                        code: zod_2.z.ZodIssueCode.custom,
                                                        message: "Invalid code"
                                                    });
                                                    return [2 /*return*/, zod_2.z.NEVER];
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            },
                            async: true
                        })];
                case 3:
                    submission = _c.sent();
                    if (submission.status !== 'success') {
                        return [2 /*return*/, (0, node_1.json)({ result: submission.reply() }, { status: submission.status === 'error' ? 400 : 200 })];
                    }
                    _b = submission.value.intent;
                    switch (_b) {
                        case 'cancel': return [3 /*break*/, 4];
                        case 'verify': return [3 /*break*/, 6];
                    }
                    return [3 /*break*/, 8];
                case 4: return [4 /*yield*/, db_server_ts_1.prisma.verification.deleteMany({
                        where: { type: exports.twoFAVerifyVerificationType, target: userId }
                    })];
                case 5:
                    _c.sent();
                    return [2 /*return*/, (0, node_1.redirect)('/settings/profile/two-factor')];
                case 6: return [4 /*yield*/, db_server_ts_1.prisma.verification.update({
                        where: {
                            target_type: { type: exports.twoFAVerifyVerificationType, target: userId }
                        },
                        data: { type: profile_two_factor_tsx_1.twoFAVerificationType }
                    })];
                case 7:
                    _c.sent();
                    return [2 /*return*/, (0, toast_server_ts_1.redirectWithToast)('/settings/profile/two-factor', {
                            type: 'success',
                            title: 'Enabled',
                            description: 'Two-factor authentication has been enabled.'
                        })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.action = action;
function TwoFactorRoute() {
    var _a, _b, _c;
    var data = (0, react_2.useLoaderData)();
    var actionData = (0, react_2.useActionData)();
    var navigation = (0, react_2.useNavigation)();
    var isPending = (0, misc_tsx_1.useIsPending)();
    var pendingIntent = isPending ? (_a = navigation.formData) === null || _a === void 0 ? void 0 : _a.get('intent') : null;
    var _d = (0, react_1.useForm)({
        id: 'verify-form',
        constraint: (0, zod_1.getZodConstraint)(ActionSchema),
        lastResult: actionData === null || actionData === void 0 ? void 0 : actionData.result,
        onValidate: function (_a) {
            var formData = _a.formData;
            return (0, zod_1.parseWithZod)(formData, { schema: ActionSchema });
        }
    }), form = _d[0], fields = _d[1];
    var lastSubmissionIntent = fields.intent.value;
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col items-center gap-4" }, { children: [(0, jsx_runtime_1.jsx)("img", { alt: "qr code", src: data.qrCode, className: "h-56 w-56" }), (0, jsx_runtime_1.jsx)("p", { children: "Scan this QR code with your authenticator app." }), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-sm" }, { children: "If you cannot scan the QR code, you can manually add this account to your authenticator app using this code:" })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "p-3" }, { children: (0, jsx_runtime_1.jsx)("pre", __assign({ className: "whitespace-pre-wrap break-all text-sm", "aria-label": "One-time Password URI" }, { children: data.otpUri })) })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-sm" }, { children: "Once you've added the account, enter the code from your authenticator app below. Once you enable 2FA, you will need to enter a code from your authenticator app every time you log in or perform important actions. Do not lose access to your authenticator app, or you will lose access to your account." })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "flex w-full max-w-xs flex-col justify-center gap-4" }, { children: (0, jsx_runtime_1.jsxs)(react_2.Form, __assign({ method: "POST" }, (0, react_1.getFormProps)(form), { className: "flex-1" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "flex items-center justify-center" }, { children: (0, jsx_runtime_1.jsx)(forms_tsx_1.OTPField, { labelProps: {
                                        htmlFor: fields.code.id,
                                        children: 'Code'
                                    }, inputProps: __assign(__assign({}, (0, react_1.getInputProps)(fields.code, { type: 'text' })), { autoFocus: true, autoComplete: 'one-time-code' }), errors: fields.code.errors }) })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "min-h-[32px] px-4 pb-3 pt-1" }, { children: (0, jsx_runtime_1.jsx)(forms_tsx_1.ErrorList, { id: form.errorId, errors: form.errors }) })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex justify-between gap-4" }, { children: [(0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({ className: "w-full", status: pendingIntent === 'verify'
                                            ? 'pending'
                                            : lastSubmissionIntent === 'verify'
                                                ? ((_b = form.status) !== null && _b !== void 0 ? _b : 'idle')
                                                : 'idle', type: "submit", name: "intent", value: "verify" }, { children: "Submit" })), (0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({ className: "w-full", variant: "secondary", status: pendingIntent === 'cancel'
                                            ? 'pending'
                                            : lastSubmissionIntent === 'cancel'
                                                ? ((_c = form.status) !== null && _c !== void 0 ? _c : 'idle')
                                                : 'idle', type: "submit", name: "intent", value: "cancel", disabled: isPending }, { children: "Cancel" }))] }))] })) }))] })) }));
}
exports["default"] = TwoFactorRoute;
