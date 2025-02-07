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
exports.action = exports.loader = exports.newEmailAddressSessionKey = exports.handle = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@conform-to/react");
var zod_1 = require("@conform-to/zod");
var node_1 = require("@remix-run/node");
var react_2 = require("@remix-run/react");
var zod_2 = require("zod");
var forms_tsx_1 = require("#app/components/forms.tsx");
var icon_tsx_1 = require("#app/components/ui/icon.tsx");
var status_button_tsx_1 = require("#app/components/ui/status-button.tsx");
var verify_server_ts_1 = require("#app/routes/_auth+/verify.server.ts");
var auth_server_ts_1 = require("#app/utils/auth.server.ts");
var db_server_ts_1 = require("#app/utils/db.server.ts");
var email_server_ts_1 = require("#app/utils/email.server.ts");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var user_validation_ts_1 = require("#app/utils/user-validation.ts");
var verification_server_ts_1 = require("#app/utils/verification.server.ts");
var profile_change_email_server_tsx_1 = require("./profile.change-email.server.tsx");
exports.handle = {
    breadcrumb: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "envelope-closed" }, { children: "Change Email" })),
    getSitemapEntries: function () { return null; }
};
exports.newEmailAddressSessionKey = 'new-email-address';
var ChangeEmailSchema = zod_2.z.object({
    email: user_validation_ts_1.EmailSchema
});
function loader(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var userId, user, params;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, verify_server_ts_1.requireRecentVerification)(request)];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, (0, auth_server_ts_1.requireUserId)(request)];
                case 2:
                    userId = _b.sent();
                    return [4 /*yield*/, db_server_ts_1.prisma.user.findUnique({
                            where: { id: userId },
                            select: { email: true }
                        })];
                case 3:
                    user = _b.sent();
                    if (!user) {
                        params = new URLSearchParams({ redirectTo: request.url });
                        throw (0, node_1.redirect)("/login?".concat(params));
                    }
                    return [2 /*return*/, (0, node_1.json)({ user: user })];
            }
        });
    });
}
exports.loader = loader;
function action(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var userId, formData, submission, _b, otp, redirectTo, verifyUrl, response, verifySession, _c, _d, _e;
        var _f, _g;
        var _this = this;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0: return [4 /*yield*/, (0, auth_server_ts_1.requireUserId)(request)];
                case 1:
                    userId = _h.sent();
                    return [4 /*yield*/, request.formData()];
                case 2:
                    formData = _h.sent();
                    return [4 /*yield*/, (0, zod_1.parseWithZod)(formData, {
                            schema: ChangeEmailSchema.superRefine(function (data, ctx) { return __awaiter(_this, void 0, void 0, function () {
                                var existingUser;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, db_server_ts_1.prisma.user.findUnique({
                                                where: { email: data.email }
                                            })];
                                        case 1:
                                            existingUser = _a.sent();
                                            if (existingUser) {
                                                ctx.addIssue({
                                                    path: ['email'],
                                                    code: zod_2.z.ZodIssueCode.custom,
                                                    message: 'This email is already in use.'
                                                });
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }),
                            async: true
                        })];
                case 3:
                    submission = _h.sent();
                    if (submission.status !== 'success') {
                        return [2 /*return*/, (0, node_1.json)({ result: submission.reply() }, { status: submission.status === 'error' ? 400 : 200 })];
                    }
                    return [4 /*yield*/, (0, verify_server_ts_1.prepareVerification)({
                            period: 10 * 60,
                            request: request,
                            target: userId,
                            type: 'change-email'
                        })];
                case 4:
                    _b = _h.sent(), otp = _b.otp, redirectTo = _b.redirectTo, verifyUrl = _b.verifyUrl;
                    return [4 /*yield*/, (0, email_server_ts_1.sendEmail)({
                            to: submission.value.email,
                            subject: "JDG Email Change Verification",
                            react: (0, jsx_runtime_1.jsx)(profile_change_email_server_tsx_1.EmailChangeEmail, { verifyUrl: verifyUrl.toString(), otp: otp })
                        })];
                case 5:
                    response = _h.sent();
                    if (!(response.status === 'success')) return [3 /*break*/, 8];
                    return [4 /*yield*/, verification_server_ts_1.verifySessionStorage.getSession()];
                case 6:
                    verifySession = _h.sent();
                    verifySession.set(exports.newEmailAddressSessionKey, submission.value.email);
                    _c = node_1.redirect;
                    _d = [redirectTo.toString()];
                    _f = {};
                    _g = {};
                    _e = 'set-cookie';
                    return [4 /*yield*/, verification_server_ts_1.verifySessionStorage.commitSession(verifySession)];
                case 7: return [2 /*return*/, _c.apply(void 0, _d.concat([(_f.headers = (_g[_e] = _h.sent(),
                            _g),
                            _f)]))];
                case 8: return [2 /*return*/, (0, node_1.json)({ result: submission.reply({ formErrors: [response.error.message] }) }, { status: 500 })];
            }
        });
    });
}
exports.action = action;
function ChangeEmailIndex() {
    var _a;
    var data = (0, react_2.useLoaderData)();
    var actionData = (0, react_2.useActionData)();
    var _b = (0, react_1.useForm)({
        id: 'change-email-form',
        constraint: (0, zod_1.getZodConstraint)(ChangeEmailSchema),
        lastResult: actionData === null || actionData === void 0 ? void 0 : actionData.result,
        onValidate: function (_a) {
            var formData = _a.formData;
            return (0, zod_1.parseWithZod)(formData, { schema: ChangeEmailSchema });
        }
    }), form = _b[0], fields = _b[1];
    var isPending = (0, misc_tsx_1.useIsPending)();
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", __assign({ className: "text-h1" }, { children: "Change Email" })), (0, jsx_runtime_1.jsx)("p", { children: "You will receive an email at the new email address to confirm." }), (0, jsx_runtime_1.jsxs)("p", { children: ["An email notice will also be sent to your old address ", data.user.email, "."] }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "mx-auto mt-5 max-w-sm" }, { children: (0, jsx_runtime_1.jsxs)(react_2.Form, __assign({ method: "POST" }, (0, react_1.getFormProps)(form), { children: [(0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { labelProps: { children: 'New Email' }, inputProps: __assign(__assign({}, (0, react_1.getInputProps)(fields.email, { type: 'email' })), { autoComplete: 'email' }), errors: fields.email.errors }), (0, jsx_runtime_1.jsx)(forms_tsx_1.ErrorList, { id: form.errorId, errors: form.errors }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({ status: isPending ? 'pending' : ((_a = form.status) !== null && _a !== void 0 ? _a : 'idle') }, { children: "Send Confirmation" })) })] })) }))] }));
}
exports["default"] = ChangeEmailIndex;
