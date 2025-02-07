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
exports.action = exports.loader = exports.handle = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@conform-to/react");
var zod_1 = require("@conform-to/zod");
var node_1 = require("@remix-run/node");
var react_2 = require("@remix-run/react");
var zod_2 = require("zod");
var forms_tsx_1 = require("#app/components/forms.tsx");
var button_tsx_1 = require("#app/components/ui/button.tsx");
var icon_tsx_1 = require("#app/components/ui/icon.tsx");
var status_button_tsx_1 = require("#app/components/ui/status-button.tsx");
var auth_server_ts_1 = require("#app/utils/auth.server.ts");
var db_server_ts_1 = require("#app/utils/db.server.ts");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var toast_server_ts_1 = require("#app/utils/toast.server.ts");
var user_validation_ts_1 = require("#app/utils/user-validation.ts");
exports.handle = {
    breadcrumb: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "dots-horizontal" }, { children: "Password" })),
    getSitemapEntries: function () { return null; }
};
var ChangePasswordForm = zod_2.z
    .object({
    currentPassword: user_validation_ts_1.PasswordSchema,
    newPassword: user_validation_ts_1.PasswordSchema,
    confirmNewPassword: user_validation_ts_1.PasswordSchema
})
    .superRefine(function (_a, ctx) {
    var confirmNewPassword = _a.confirmNewPassword, newPassword = _a.newPassword;
    if (confirmNewPassword !== newPassword) {
        ctx.addIssue({
            path: ['confirmNewPassword'],
            code: zod_2.z.ZodIssueCode.custom,
            message: 'The passwords must match'
        });
    }
});
function requirePassword(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var password;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_server_ts_1.prisma.password.findUnique({
                        select: { userId: true },
                        where: { userId: userId }
                    })];
                case 1:
                    password = _a.sent();
                    if (!password) {
                        throw (0, node_1.redirect)('/settings/profile/password/create');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function loader(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var userId;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, auth_server_ts_1.requireUserId)(request)];
                case 1:
                    userId = _b.sent();
                    return [4 /*yield*/, requirePassword(userId)];
                case 2:
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
        var userId, formData, submission, newPassword, _b, _c;
        var _d, _e, _f, _g;
        var _this = this;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0: return [4 /*yield*/, (0, auth_server_ts_1.requireUserId)(request)];
                case 1:
                    userId = _h.sent();
                    return [4 /*yield*/, requirePassword(userId)];
                case 2:
                    _h.sent();
                    return [4 /*yield*/, request.formData()];
                case 3:
                    formData = _h.sent();
                    return [4 /*yield*/, (0, zod_1.parseWithZod)(formData, {
                            async: true,
                            schema: ChangePasswordForm.superRefine(function (_a, ctx) {
                                var currentPassword = _a.currentPassword, newPassword = _a.newPassword;
                                return __awaiter(_this, void 0, void 0, function () {
                                    var user;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                if (!(currentPassword && newPassword)) return [3 /*break*/, 2];
                                                return [4 /*yield*/, (0, auth_server_ts_1.verifyUserPassword)({ id: userId }, currentPassword)];
                                            case 1:
                                                user = _b.sent();
                                                if (!user) {
                                                    ctx.addIssue({
                                                        path: ['currentPassword'],
                                                        code: zod_2.z.ZodIssueCode.custom,
                                                        message: 'Incorrect password.'
                                                    });
                                                }
                                                _b.label = 2;
                                            case 2: return [2 /*return*/];
                                        }
                                    });
                                });
                            })
                        })];
                case 4:
                    submission = _h.sent();
                    if (submission.status !== 'success') {
                        return [2 /*return*/, (0, node_1.json)({
                                result: submission.reply({
                                    hideFields: ['currentPassword', 'newPassword', 'confirmNewPassword']
                                })
                            }, { status: submission.status === 'error' ? 400 : 200 })];
                    }
                    newPassword = submission.value.newPassword;
                    _c = (_b = db_server_ts_1.prisma.user).update;
                    _d = {
                        select: { username: true },
                        where: { id: userId }
                    };
                    _e = {};
                    _f = {};
                    _g = {};
                    return [4 /*yield*/, (0, auth_server_ts_1.getPasswordHash)(newPassword)];
                case 5: return [4 /*yield*/, _c.apply(_b, [(_d.data = (_e.password = (_f.update = (_g.hash = _h.sent(),
                            _g),
                            _f),
                            _e),
                            _d)])];
                case 6:
                    _h.sent();
                    return [2 /*return*/, (0, toast_server_ts_1.redirectWithToast)("/settings/profile", {
                            type: 'success',
                            title: 'Password Changed',
                            description: 'Your password has been changed.'
                        }, { status: 302 })];
            }
        });
    });
}
exports.action = action;
function ChangePasswordRoute() {
    var _a;
    var actionData = (0, react_2.useActionData)();
    var isPending = (0, misc_tsx_1.useIsPending)();
    var _b = (0, react_1.useForm)({
        id: 'password-change-form',
        constraint: (0, zod_1.getZodConstraint)(ChangePasswordForm),
        lastResult: actionData === null || actionData === void 0 ? void 0 : actionData.result,
        onValidate: function (_a) {
            var formData = _a.formData;
            return (0, zod_1.parseWithZod)(formData, { schema: ChangePasswordForm });
        },
        shouldRevalidate: 'onBlur'
    }), form = _b[0], fields = _b[1];
    return ((0, jsx_runtime_1.jsxs)(react_2.Form, __assign({ method: "POST" }, (0, react_1.getFormProps)(form), { className: "mx-auto max-w-md" }, { children: [(0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { labelProps: { children: 'Current Password' }, inputProps: __assign(__assign({}, (0, react_1.getInputProps)(fields.currentPassword, { type: 'password' })), { autoComplete: 'current-password' }), errors: fields.currentPassword.errors }), (0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { labelProps: { children: 'New Password' }, inputProps: __assign(__assign({}, (0, react_1.getInputProps)(fields.newPassword, { type: 'password' })), { autoComplete: 'new-password' }), errors: fields.newPassword.errors }), (0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { labelProps: { children: 'Confirm New Password' }, inputProps: __assign(__assign({}, (0, react_1.getInputProps)(fields.confirmNewPassword, {
                    type: 'password'
                })), { autoComplete: 'new-password' }), errors: fields.confirmNewPassword.errors }), (0, jsx_runtime_1.jsx)(forms_tsx_1.ErrorList, { id: form.errorId, errors: form.errors }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "grid w-full grid-cols-2 gap-6" }, { children: [(0, jsx_runtime_1.jsx)(button_tsx_1.Button, __assign({ variant: "secondary", asChild: true }, { children: (0, jsx_runtime_1.jsx)(react_2.Link, __assign({ to: ".." }, { children: "Cancel" })) })), (0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({ type: "submit", status: isPending ? 'pending' : ((_a = form.status) !== null && _a !== void 0 ? _a : 'idle') }, { children: "Change Password" }))] }))] })));
}
exports["default"] = ChangePasswordRoute;
