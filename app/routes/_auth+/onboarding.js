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
exports.meta = exports.action = exports.loader = exports.onboardingEmailSessionKey = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@conform-to/react");
var zod_1 = require("@conform-to/zod");
var node_1 = require("@remix-run/node");
var react_2 = require("@remix-run/react");
var react_3 = require("remix-utils/honeypot/react");
var safe_redirect_1 = require("remix-utils/safe-redirect");
var zod_2 = require("zod");
var forms_tsx_1 = require("#app/components/forms.tsx");
var spacer_tsx_1 = require("#app/components/spacer.tsx");
var status_button_tsx_1 = require("#app/components/ui/status-button.tsx");
var auth_server_ts_1 = require("#app/utils/auth.server.ts");
var db_server_ts_1 = require("#app/utils/db.server.ts");
var honeypot_server_ts_1 = require("#app/utils/honeypot.server.ts");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var session_server_ts_1 = require("#app/utils/session.server.ts");
var toast_server_ts_1 = require("#app/utils/toast.server.ts");
var user_validation_ts_1 = require("#app/utils/user-validation.ts");
var verification_server_ts_1 = require("#app/utils/verification.server.ts");
exports.onboardingEmailSessionKey = 'onboardingEmail';
var SignupFormSchema = zod_2.z
    .object({
    username: user_validation_ts_1.UsernameSchema,
    name: user_validation_ts_1.NameSchema,
    agreeToTermsOfServiceAndPrivacyPolicy: zod_2.z.boolean({
        required_error: 'You must agree to the terms of service and privacy policy'
    }),
    remember: zod_2.z.boolean().optional(),
    redirectTo: zod_2.z.string().optional()
})
    .and(user_validation_ts_1.PasswordAndConfirmPasswordSchema);
function requireOnboardingEmail(request) {
    return __awaiter(this, void 0, void 0, function () {
        var verifySession, email;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, auth_server_ts_1.requireAnonymous)(request)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, verification_server_ts_1.verifySessionStorage.getSession(request.headers.get('cookie'))];
                case 2:
                    verifySession = _a.sent();
                    email = verifySession.get(exports.onboardingEmailSessionKey);
                    if (typeof email !== 'string' || !email) {
                        throw (0, node_1.redirect)('/signup');
                    }
                    return [2 /*return*/, email];
            }
        });
    });
}
function loader(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var email;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, requireOnboardingEmail(request)];
                case 1:
                    email = _b.sent();
                    return [2 /*return*/, (0, node_1.json)({ email: email })];
            }
        });
    });
}
exports.loader = loader;
function action(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var email, formData, submission, _b, session, remember, redirectTo, authSession, verifySession, headers, _c, _d, _e, _f, _g, _h;
        var _this = this;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0: return [4 /*yield*/, requireOnboardingEmail(request)];
                case 1:
                    email = _j.sent();
                    return [4 /*yield*/, request.formData()];
                case 2:
                    formData = _j.sent();
                    (0, honeypot_server_ts_1.checkHoneypot)(formData);
                    return [4 /*yield*/, (0, zod_1.parseWithZod)(formData, {
                            schema: function (intent) {
                                return SignupFormSchema.superRefine(function (data, ctx) { return __awaiter(_this, void 0, void 0, function () {
                                    var existingUser;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, db_server_ts_1.prisma.user.findUnique({
                                                    where: { username: data.username },
                                                    select: { id: true }
                                                })];
                                            case 1:
                                                existingUser = _a.sent();
                                                if (existingUser) {
                                                    ctx.addIssue({
                                                        path: ['username'],
                                                        code: zod_2.z.ZodIssueCode.custom,
                                                        message: 'A user already exists with this username'
                                                    });
                                                    return [2 /*return*/];
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }).transform(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                    var session;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (intent !== null)
                                                    return [2 /*return*/, __assign(__assign({}, data), { session: null })];
                                                return [4 /*yield*/, (0, auth_server_ts_1.signup)(__assign(__assign({}, data), { email: email }))];
                                            case 1:
                                                session = _a.sent();
                                                return [2 /*return*/, __assign(__assign({}, data), { session: session })];
                                        }
                                    });
                                }); });
                            },
                            async: true
                        })];
                case 3:
                    submission = _j.sent();
                    if (submission.status !== 'success' || !submission.value.session) {
                        return [2 /*return*/, (0, node_1.json)({ result: submission.reply() }, { status: submission.status === 'error' ? 400 : 200 })];
                    }
                    _b = submission.value, session = _b.session, remember = _b.remember, redirectTo = _b.redirectTo;
                    return [4 /*yield*/, session_server_ts_1.authSessionStorage.getSession(request.headers.get('cookie'))];
                case 4:
                    authSession = _j.sent();
                    authSession.set(auth_server_ts_1.sessionKey, session.id);
                    return [4 /*yield*/, verification_server_ts_1.verifySessionStorage.getSession()];
                case 5:
                    verifySession = _j.sent();
                    headers = new Headers();
                    _d = (_c = headers).append;
                    _e = ['set-cookie'];
                    return [4 /*yield*/, session_server_ts_1.authSessionStorage.commitSession(authSession, {
                            expires: remember ? session.expirationDate : undefined
                        })];
                case 6:
                    _d.apply(_c, _e.concat([_j.sent()]));
                    _g = (_f = headers).append;
                    _h = ['set-cookie'];
                    return [4 /*yield*/, verification_server_ts_1.verifySessionStorage.destroySession(verifySession)];
                case 7:
                    _g.apply(_f, _h.concat([_j.sent()]));
                    return [2 /*return*/, (0, toast_server_ts_1.redirectWithToast)((0, safe_redirect_1.safeRedirect)(redirectTo), { title: 'Welcome', description: 'Thanks for signing up!' }, { headers: headers })];
            }
        });
    });
}
exports.action = action;
var meta = function () {
    return [{ title: 'Setup JDG Account' }];
};
exports.meta = meta;
function OnboardingRoute() {
    var _a;
    var data = (0, react_2.useLoaderData)();
    var actionData = (0, react_2.useActionData)();
    var isPending = (0, misc_tsx_1.useIsPending)();
    var searchParams = (0, react_2.useSearchParams)()[0];
    var redirectTo = searchParams.get('redirectTo');
    var _b = (0, react_1.useForm)({
        id: 'onboarding-form',
        constraint: (0, zod_1.getZodConstraint)(SignupFormSchema),
        defaultValue: { redirectTo: redirectTo },
        lastResult: actionData === null || actionData === void 0 ? void 0 : actionData.result,
        onValidate: function (_a) {
            var formData = _a.formData;
            return (0, zod_1.parseWithZod)(formData, { schema: SignupFormSchema });
        },
        shouldRevalidate: 'onBlur'
    }), form = _b[0], fields = _b[1];
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "container flex min-h-full flex-col justify-center pb-32 pt-20" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "mx-auto w-full max-w-lg" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col gap-3 text-center" }, { children: [(0, jsx_runtime_1.jsxs)("h1", __assign({ className: "text-h1" }, { children: ["Welcome aboard ", data.email, "!"] })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-body-md text-muted-foreground" }, { children: "Please enter your details." }))] })), (0, jsx_runtime_1.jsx)(spacer_tsx_1.Spacer, { size: "xs" }), (0, jsx_runtime_1.jsxs)(react_2.Form, __assign({ method: "POST", className: "mx-auto min-w-full max-w-sm sm:min-w-[368px]" }, (0, react_1.getFormProps)(form), { children: [(0, jsx_runtime_1.jsx)(react_3.HoneypotInputs, {}), (0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { labelProps: { htmlFor: fields.username.id, children: 'Username' }, inputProps: __assign(__assign({}, (0, react_1.getInputProps)(fields.username, { type: 'text' })), { autoComplete: 'username', className: 'lowercase' }), errors: fields.username.errors }), (0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { labelProps: { htmlFor: fields.name.id, children: 'Name' }, inputProps: __assign(__assign({}, (0, react_1.getInputProps)(fields.name, { type: 'text' })), { autoComplete: 'name' }), errors: fields.name.errors }), (0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { labelProps: { htmlFor: fields.password.id, children: 'Password' }, inputProps: __assign(__assign({}, (0, react_1.getInputProps)(fields.password, { type: 'password' })), { autoComplete: 'new-password' }), errors: fields.password.errors }), (0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { labelProps: {
                                htmlFor: fields.confirmPassword.id,
                                children: 'Confirm Password'
                            }, inputProps: __assign(__assign({}, (0, react_1.getInputProps)(fields.confirmPassword, { type: 'password' })), { autoComplete: 'new-password' }), errors: fields.confirmPassword.errors }), (0, jsx_runtime_1.jsx)(forms_tsx_1.CheckboxField, { labelProps: {
                                htmlFor: fields.agreeToTermsOfServiceAndPrivacyPolicy.id,
                                children: 'Do you agree to our Terms of Service and Privacy Policy?'
                            }, buttonProps: (0, react_1.getInputProps)(fields.agreeToTermsOfServiceAndPrivacyPolicy, { type: 'checkbox' }), errors: fields.agreeToTermsOfServiceAndPrivacyPolicy.errors }), (0, jsx_runtime_1.jsx)(forms_tsx_1.CheckboxField, { labelProps: {
                                htmlFor: fields.remember.id,
                                children: 'Remember me'
                            }, buttonProps: (0, react_1.getInputProps)(fields.remember, { type: 'checkbox' }), errors: fields.remember.errors }), (0, jsx_runtime_1.jsx)("input", __assign({}, (0, react_1.getInputProps)(fields.redirectTo, { type: 'hidden' }))), (0, jsx_runtime_1.jsx)(forms_tsx_1.ErrorList, { errors: form.errors, id: form.errorId }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "flex items-center justify-between gap-6" }, { children: (0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({ className: "w-full", status: isPending ? 'pending' : ((_a = form.status) !== null && _a !== void 0 ? _a : 'idle'), type: "submit", disabled: isPending }, { children: "Create an account" })) }))] }))] })) })));
}
exports["default"] = OnboardingRoute;
