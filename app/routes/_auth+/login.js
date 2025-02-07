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
exports.ErrorBoundary = exports.meta = exports.action = exports.loader = exports.handle = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@conform-to/react");
var zod_1 = require("@conform-to/zod");
var node_1 = require("@remix-run/node");
var react_2 = require("@remix-run/react");
var react_3 = require("remix-utils/honeypot/react");
var zod_2 = require("zod");
var error_boundary_tsx_1 = require("#app/components/error-boundary.tsx");
var forms_tsx_1 = require("#app/components/forms.tsx");
var spacer_tsx_1 = require("#app/components/spacer.tsx");
var status_button_tsx_1 = require("#app/components/ui/status-button.tsx");
var auth_server_ts_1 = require("#app/utils/auth.server.ts");
var connections_tsx_1 = require("#app/utils/connections.tsx");
var honeypot_server_ts_1 = require("#app/utils/honeypot.server.ts");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var user_validation_ts_1 = require("#app/utils/user-validation.ts");
var login_server_ts_1 = require("./login.server.ts");
exports.handle = {
    getSitemapEntries: function () { return null; }
};
var LoginFormSchema = zod_2.z.object({
    username: user_validation_ts_1.UsernameSchema,
    password: user_validation_ts_1.PasswordSchema,
    redirectTo: zod_2.z.string().optional(),
    remember: zod_2.z.boolean().optional()
});
function loader(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, auth_server_ts_1.requireAnonymous)(request)];
                case 1:
                    _b.sent();
                    return [2 /*return*/, (0, node_1.json)({})];
            }
        });
    });
}
exports.loader = loader;
function action(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var formData, submission, _b, session, remember, redirectTo;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, auth_server_ts_1.requireAnonymous)(request)];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, request.formData()];
                case 2:
                    formData = _c.sent();
                    (0, honeypot_server_ts_1.checkHoneypot)(formData);
                    return [4 /*yield*/, (0, zod_1.parseWithZod)(formData, {
                            schema: function (intent) {
                                return LoginFormSchema.transform(function (data, ctx) { return __awaiter(_this, void 0, void 0, function () {
                                    var session;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (intent !== null)
                                                    return [2 /*return*/, __assign(__assign({}, data), { session: null })];
                                                return [4 /*yield*/, (0, auth_server_ts_1.login)(data)];
                                            case 1:
                                                session = _a.sent();
                                                if (!session) {
                                                    ctx.addIssue({
                                                        code: zod_2.z.ZodIssueCode.custom,
                                                        message: 'Invalid username or password'
                                                    });
                                                    return [2 /*return*/, zod_2.z.NEVER];
                                                }
                                                return [2 /*return*/, __assign(__assign({}, data), { session: session })];
                                        }
                                    });
                                }); });
                            },
                            async: true
                        })];
                case 3:
                    submission = _c.sent();
                    if (submission.status !== 'success' || !submission.value.session) {
                        return [2 /*return*/, (0, node_1.json)({ result: submission.reply({ hideFields: ['password'] }) }, { status: submission.status === 'error' ? 400 : 200 })];
                    }
                    _b = submission.value, session = _b.session, remember = _b.remember, redirectTo = _b.redirectTo;
                    return [2 /*return*/, (0, login_server_ts_1.handleNewSession)({
                            request: request,
                            session: session,
                            remember: remember !== null && remember !== void 0 ? remember : false,
                            redirectTo: redirectTo
                        })];
            }
        });
    });
}
exports.action = action;
function LoginPage() {
    var _a;
    var actionData = (0, react_2.useActionData)();
    var isPending = (0, misc_tsx_1.useIsPending)();
    var searchParams = (0, react_2.useSearchParams)()[0];
    var redirectTo = searchParams.get('redirectTo');
    var _b = (0, react_1.useForm)({
        id: 'login-form',
        constraint: (0, zod_1.getZodConstraint)(LoginFormSchema),
        defaultValue: { redirectTo: redirectTo },
        lastResult: actionData === null || actionData === void 0 ? void 0 : actionData.result,
        onValidate: function (_a) {
            var formData = _a.formData;
            return (0, zod_1.parseWithZod)(formData, { schema: LoginFormSchema });
        },
        shouldRevalidate: 'onBlur'
    }), form = _b[0], fields = _b[1];
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "flex min-h-full flex-col justify-center pb-32 pt-20" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "mx-auto w-full max-w-md" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col gap-3 text-center" }, { children: [(0, jsx_runtime_1.jsx)("h1", __assign({ className: "text-h1" }, { children: "Welcome back!" })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-body-md text-muted-foreground" }, { children: "Please enter your details." }))] })), (0, jsx_runtime_1.jsx)(spacer_tsx_1.Spacer, { size: "xs" }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "mx-auto w-full max-w-md px-8" }, { children: [(0, jsx_runtime_1.jsxs)(react_2.Form, __assign({ method: "POST" }, (0, react_1.getFormProps)(form), { children: [(0, jsx_runtime_1.jsx)(react_3.HoneypotInputs, {}), (0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { labelProps: { children: 'Username' }, inputProps: __assign(__assign({}, (0, react_1.getInputProps)(fields.username, { type: 'text' })), { autoFocus: true, className: 'lowercase', autoComplete: 'username' }), errors: fields.username.errors }), (0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { labelProps: { children: 'Password' }, inputProps: __assign(__assign({}, (0, react_1.getInputProps)(fields.password, {
                                            type: 'password'
                                        })), { autoComplete: 'current-password' }), errors: fields.password.errors }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex justify-between" }, { children: [(0, jsx_runtime_1.jsx)(forms_tsx_1.CheckboxField, { labelProps: {
                                                    htmlFor: fields.remember.id,
                                                    children: 'Remember me'
                                                }, buttonProps: (0, react_1.getInputProps)(fields.remember, {
                                                    type: 'checkbox'
                                                }), errors: fields.remember.errors }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(react_2.Link, __assign({ to: "/forgot-password", className: "text-body-xs font-semibold" }, { children: "Forgot password?" })) })] })), (0, jsx_runtime_1.jsx)("input", __assign({}, (0, react_1.getInputProps)(fields.redirectTo, { type: 'hidden' }))), (0, jsx_runtime_1.jsx)(forms_tsx_1.ErrorList, { errors: form.errors, id: form.errorId }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "flex items-center justify-between gap-6 pt-3" }, { children: (0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({ className: "w-full", status: isPending ? 'pending' : ((_a = form.status) !== null && _a !== void 0 ? _a : 'idle'), type: "submit", disabled: isPending }, { children: "Log in" })) }))] })), (0, jsx_runtime_1.jsx)("ul", __assign({ className: "mt-5 flex flex-col gap-5 border-b-2 border-t-2 border-border py-3" }, { children: connections_tsx_1.providerNames.map(function (providerName) { return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(connections_tsx_1.ProviderConnectionForm, { type: "Login", providerName: providerName, redirectTo: redirectTo }) }, providerName)); }) })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center justify-center gap-2 pt-6" }, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ className: "text-muted-foreground" }, { children: "New here?" })), (0, jsx_runtime_1.jsx)(react_2.Link, __assign({ to: redirectTo
                                            ? "/signup?".concat(encodeURIComponent(redirectTo))
                                            : '/signup' }, { children: "Create an account" }))] }))] })) })] })) })));
}
exports["default"] = LoginPage;
var meta = function () {
    return [{ title: 'Login to JDG' }];
};
exports.meta = meta;
function ErrorBoundary() {
    return (0, jsx_runtime_1.jsx)(error_boundary_tsx_1.GeneralErrorBoundary, {});
}
exports.ErrorBoundary = ErrorBoundary;
