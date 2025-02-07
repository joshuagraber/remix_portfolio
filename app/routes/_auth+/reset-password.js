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
exports.ErrorBoundary = exports.meta = exports.action = exports.loader = exports.resetPasswordUsernameSessionKey = exports.handle = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@conform-to/react");
var zod_1 = require("@conform-to/zod");
var node_1 = require("@remix-run/node");
var react_2 = require("@remix-run/react");
var error_boundary_tsx_1 = require("#app/components/error-boundary.tsx");
var forms_tsx_1 = require("#app/components/forms.tsx");
var status_button_tsx_1 = require("#app/components/ui/status-button.tsx");
var auth_server_ts_1 = require("#app/utils/auth.server.ts");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var user_validation_ts_1 = require("#app/utils/user-validation.ts");
var verification_server_ts_1 = require("#app/utils/verification.server.ts");
exports.handle = {
    getSitemapEntries: function () { return null; }
};
exports.resetPasswordUsernameSessionKey = 'resetPasswordUsername';
var ResetPasswordSchema = user_validation_ts_1.PasswordAndConfirmPasswordSchema;
function requireResetPasswordUsername(request) {
    return __awaiter(this, void 0, void 0, function () {
        var verifySession, resetPasswordUsername;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, auth_server_ts_1.requireAnonymous)(request)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, verification_server_ts_1.verifySessionStorage.getSession(request.headers.get('cookie'))];
                case 2:
                    verifySession = _a.sent();
                    resetPasswordUsername = verifySession.get(exports.resetPasswordUsernameSessionKey);
                    if (typeof resetPasswordUsername !== 'string' || !resetPasswordUsername) {
                        throw (0, node_1.redirect)('/login');
                    }
                    return [2 /*return*/, resetPasswordUsername];
            }
        });
    });
}
function loader(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var resetPasswordUsername;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, requireResetPasswordUsername(request)];
                case 1:
                    resetPasswordUsername = _b.sent();
                    return [2 /*return*/, (0, node_1.json)({ resetPasswordUsername: resetPasswordUsername })];
            }
        });
    });
}
exports.loader = loader;
function action(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var resetPasswordUsername, formData, submission, password, verifySession, _b, _c, _d;
        var _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, requireResetPasswordUsername(request)];
                case 1:
                    resetPasswordUsername = _g.sent();
                    return [4 /*yield*/, request.formData()];
                case 2:
                    formData = _g.sent();
                    submission = (0, zod_1.parseWithZod)(formData, {
                        schema: ResetPasswordSchema
                    });
                    if (submission.status !== 'success') {
                        return [2 /*return*/, (0, node_1.json)({ result: submission.reply() }, { status: submission.status === 'error' ? 400 : 200 })];
                    }
                    password = submission.value.password;
                    return [4 /*yield*/, (0, auth_server_ts_1.resetUserPassword)({ username: resetPasswordUsername, password: password })];
                case 3:
                    _g.sent();
                    return [4 /*yield*/, verification_server_ts_1.verifySessionStorage.getSession()];
                case 4:
                    verifySession = _g.sent();
                    _b = node_1.redirect;
                    _c = ['/login'];
                    _e = {};
                    _f = {};
                    _d = 'set-cookie';
                    return [4 /*yield*/, verification_server_ts_1.verifySessionStorage.destroySession(verifySession)];
                case 5: return [2 /*return*/, _b.apply(void 0, _c.concat([(_e.headers = (_f[_d] = _g.sent(),
                            _f),
                            _e)]))];
            }
        });
    });
}
exports.action = action;
var meta = function () {
    return [{ title: 'Reset Password | JDG' }];
};
exports.meta = meta;
function ResetPasswordPage() {
    var _a;
    var data = (0, react_2.useLoaderData)();
    var actionData = (0, react_2.useActionData)();
    var isPending = (0, misc_tsx_1.useIsPending)();
    var _b = (0, react_1.useForm)({
        id: 'reset-password',
        constraint: (0, zod_1.getZodConstraint)(ResetPasswordSchema),
        lastResult: actionData === null || actionData === void 0 ? void 0 : actionData.result,
        onValidate: function (_a) {
            var formData = _a.formData;
            return (0, zod_1.parseWithZod)(formData, { schema: ResetPasswordSchema });
        },
        shouldRevalidate: 'onBlur'
    }), form = _b[0], fields = _b[1];
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "container flex flex-col justify-center pb-32 pt-20" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "text-center" }, { children: [(0, jsx_runtime_1.jsx)("h1", __assign({ className: "text-h1" }, { children: "Password Reset" })), (0, jsx_runtime_1.jsxs)("p", __assign({ className: "mt-3 text-body-md text-muted-foreground" }, { children: ["Hi, ", data.resetPasswordUsername, ". No worries. It happens all the time."] }))] })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "mx-auto mt-16 min-w-full max-w-sm sm:min-w-[368px]" }, { children: (0, jsx_runtime_1.jsxs)(react_2.Form, __assign({ method: "POST" }, (0, react_1.getFormProps)(form), { children: [(0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { labelProps: {
                                htmlFor: fields.password.id,
                                children: 'New Password'
                            }, inputProps: __assign(__assign({}, (0, react_1.getInputProps)(fields.password, { type: 'password' })), { autoComplete: 'new-password', autoFocus: true }), errors: fields.password.errors }), (0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { labelProps: {
                                htmlFor: fields.confirmPassword.id,
                                children: 'Confirm Password'
                            }, inputProps: __assign(__assign({}, (0, react_1.getInputProps)(fields.confirmPassword, { type: 'password' })), { autoComplete: 'new-password' }), errors: fields.confirmPassword.errors }), (0, jsx_runtime_1.jsx)(forms_tsx_1.ErrorList, { errors: form.errors, id: form.errorId }), (0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({ className: "w-full", status: isPending ? 'pending' : ((_a = form.status) !== null && _a !== void 0 ? _a : 'idle'), type: "submit", disabled: isPending }, { children: "Reset password" }))] })) }))] })));
}
exports["default"] = ResetPasswordPage;
function ErrorBoundary() {
    return (0, jsx_runtime_1.jsx)(error_boundary_tsx_1.GeneralErrorBoundary, {});
}
exports.ErrorBoundary = ErrorBoundary;
