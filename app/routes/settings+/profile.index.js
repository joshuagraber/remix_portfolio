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
var invariant_1 = require("@epic-web/invariant");
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
var session_server_ts_1 = require("#app/utils/session.server.ts");
var toast_server_ts_1 = require("#app/utils/toast.server.ts");
var user_validation_ts_1 = require("#app/utils/user-validation.ts");
var profile_two_factor_tsx_1 = require("./profile.two-factor.tsx");
exports.handle = {
    getSitemapEntries: function () { return null; }
};
var ProfileFormSchema = zod_2.z.object({
    name: user_validation_ts_1.NameSchema.optional(),
    username: user_validation_ts_1.UsernameSchema
});
function loader(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var userId, user, twoFactorVerification, password;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, auth_server_ts_1.requireUserId)(request)];
                case 1:
                    userId = _b.sent();
                    return [4 /*yield*/, db_server_ts_1.prisma.user.findUniqueOrThrow({
                            where: { id: userId },
                            select: {
                                id: true,
                                name: true,
                                username: true,
                                email: true,
                                image: {
                                    select: { id: true }
                                },
                                _count: {
                                    select: {
                                        sessions: {
                                            where: {
                                                expirationDate: { gt: new Date() }
                                            }
                                        }
                                    }
                                }
                            }
                        })];
                case 2:
                    user = _b.sent();
                    return [4 /*yield*/, db_server_ts_1.prisma.verification.findUnique({
                            select: { id: true },
                            where: { target_type: { type: profile_two_factor_tsx_1.twoFAVerificationType, target: userId } }
                        })];
                case 3:
                    twoFactorVerification = _b.sent();
                    return [4 /*yield*/, db_server_ts_1.prisma.password.findUnique({
                            select: { userId: true },
                            where: { userId: userId }
                        })];
                case 4:
                    password = _b.sent();
                    return [2 /*return*/, (0, node_1.json)({
                            user: user,
                            hasPassword: Boolean(password),
                            isTwoFactorEnabled: Boolean(twoFactorVerification)
                        })];
            }
        });
    });
}
exports.loader = loader;
var profileUpdateActionIntent = 'update-profile';
var signOutOfSessionsActionIntent = 'sign-out-of-sessions';
var deleteDataActionIntent = 'delete-data';
function action(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var userId, formData, intent;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, auth_server_ts_1.requireUserId)(request)];
                case 1:
                    userId = _b.sent();
                    return [4 /*yield*/, request.formData()];
                case 2:
                    formData = _b.sent();
                    intent = formData.get('intent');
                    switch (intent) {
                        case profileUpdateActionIntent: {
                            return [2 /*return*/, profileUpdateAction({ request: request, userId: userId, formData: formData })];
                        }
                        case signOutOfSessionsActionIntent: {
                            return [2 /*return*/, signOutOfSessionsAction({ request: request, userId: userId, formData: formData })];
                        }
                        case deleteDataActionIntent: {
                            return [2 /*return*/, deleteDataAction({ request: request, userId: userId, formData: formData })];
                        }
                        default: {
                            throw new Response("Invalid intent \"".concat(intent, "\""), { status: 400 });
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.action = action;
function EditUserProfile() {
    var _a;
    var data = (0, react_2.useLoaderData)();
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col gap-12" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "flex justify-center" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative h-52 w-52" }, { children: [(0, jsx_runtime_1.jsx)("img", { src: (0, misc_tsx_1.getUserImgSrc)((_a = data.user.image) === null || _a === void 0 ? void 0 : _a.id), alt: data.user.username, className: "h-full w-full rounded-full object-cover" }), (0, jsx_runtime_1.jsx)(button_tsx_1.Button, __assign({ asChild: true, variant: "outline", className: "absolute -right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full p-0" }, { children: (0, jsx_runtime_1.jsx)(react_2.Link, __assign({ preventScrollReset: true, to: "photo", title: "Change profile photo", "aria-label": "Change profile photo" }, { children: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "camera", className: "h-4 w-4" }) })) }))] })) })), (0, jsx_runtime_1.jsx)(UpdateProfile, {}), (0, jsx_runtime_1.jsx)("div", { className: "col-span-6 my-6 h-1 border-b-[1.5px] border-foreground" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "col-span-full flex flex-col gap-6" }, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(react_2.Link, __assign({ to: "change-email" }, { children: (0, jsx_runtime_1.jsxs)(icon_tsx_1.Icon, __assign({ name: "envelope-closed" }, { children: ["Change email from ", data.user.email] })) })) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(react_2.Link, __assign({ to: "two-factor" }, { children: data.isTwoFactorEnabled ? ((0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "lock-closed" }, { children: "2FA is enabled" }))) : ((0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "lock-open-1" }, { children: "Enable 2FA" }))) })) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(react_2.Link, __assign({ to: data.hasPassword ? 'password' : 'password/create' }, { children: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "dots-horizontal" }, { children: data.hasPassword ? 'Change Password' : 'Create a Password' })) })) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(react_2.Link, __assign({ to: "connections" }, { children: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "link-2" }, { children: "Manage connections" })) })) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(react_2.Link, __assign({ reloadDocument: true, download: "my-epic-notes-data.json", to: "/resources/download-user-data" }, { children: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "download" }, { children: "Download your data" })) })) }), (0, jsx_runtime_1.jsx)(SignOutOfSessions, {}), (0, jsx_runtime_1.jsx)(DeleteData, {})] }))] })));
}
exports["default"] = EditUserProfile;
function profileUpdateAction(_a) {
    var userId = _a.userId, formData = _a.formData;
    return __awaiter(this, void 0, void 0, function () {
        var submission, data;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, zod_1.parseWithZod)(formData, {
                        async: true,
                        schema: ProfileFormSchema.superRefine(function (_a, ctx) {
                            var username = _a.username;
                            return __awaiter(_this, void 0, void 0, function () {
                                var existingUsername;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, db_server_ts_1.prisma.user.findUnique({
                                                where: { username: username },
                                                select: { id: true }
                                            })];
                                        case 1:
                                            existingUsername = _b.sent();
                                            if (existingUsername && existingUsername.id !== userId) {
                                                ctx.addIssue({
                                                    path: ['username'],
                                                    code: zod_2.z.ZodIssueCode.custom,
                                                    message: 'A user already exists with this username'
                                                });
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        })
                    })];
                case 1:
                    submission = _b.sent();
                    if (submission.status !== 'success') {
                        return [2 /*return*/, (0, node_1.json)({ result: submission.reply() }, { status: submission.status === 'error' ? 400 : 200 })];
                    }
                    data = submission.value;
                    return [4 /*yield*/, db_server_ts_1.prisma.user.update({
                            select: { username: true },
                            where: { id: userId },
                            data: {
                                name: data.name,
                                username: data.username
                            }
                        })];
                case 2:
                    _b.sent();
                    return [2 /*return*/, (0, node_1.json)({
                            result: submission.reply()
                        })];
            }
        });
    });
}
function UpdateProfile() {
    var _a, _b;
    var data = (0, react_2.useLoaderData)();
    var fetcher = (0, react_2.useFetcher)();
    var _c = (0, react_1.useForm)({
        id: 'edit-profile',
        constraint: (0, zod_1.getZodConstraint)(ProfileFormSchema),
        lastResult: (_a = fetcher.data) === null || _a === void 0 ? void 0 : _a.result,
        onValidate: function (_a) {
            var formData = _a.formData;
            return (0, zod_1.parseWithZod)(formData, { schema: ProfileFormSchema });
        },
        defaultValue: {
            username: data.user.username,
            name: data.user.name
        }
    }), form = _c[0], fields = _c[1];
    return ((0, jsx_runtime_1.jsxs)(fetcher.Form, __assign({ method: "POST" }, (0, react_1.getFormProps)(form), { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "grid grid-cols-6 gap-x-10" }, { children: [(0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { className: "col-span-3", labelProps: {
                            htmlFor: fields.username.id,
                            children: 'Username'
                        }, inputProps: (0, react_1.getInputProps)(fields.username, { type: 'text' }), errors: fields.username.errors }), (0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { className: "col-span-3", labelProps: { htmlFor: fields.name.id, children: 'Name' }, inputProps: (0, react_1.getInputProps)(fields.name, { type: 'text' }), errors: fields.name.errors })] })), (0, jsx_runtime_1.jsx)(forms_tsx_1.ErrorList, { errors: form.errors, id: form.errorId }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "mt-8 flex justify-center" }, { children: (0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({ type: "submit", size: "wide", name: "intent", value: profileUpdateActionIntent, status: fetcher.state !== 'idle' ? 'pending' : ((_b = form.status) !== null && _b !== void 0 ? _b : 'idle') }, { children: "Save changes" })) }))] })));
}
function signOutOfSessionsAction(_a) {
    var request = _a.request, userId = _a.userId;
    return __awaiter(this, void 0, void 0, function () {
        var authSession, sessionId;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, session_server_ts_1.authSessionStorage.getSession(request.headers.get('cookie'))];
                case 1:
                    authSession = _b.sent();
                    sessionId = authSession.get(auth_server_ts_1.sessionKey);
                    (0, invariant_1.invariantResponse)(sessionId, 'You must be authenticated to sign out of other sessions');
                    return [4 /*yield*/, db_server_ts_1.prisma.session.deleteMany({
                            where: {
                                userId: userId,
                                id: { not: sessionId }
                            }
                        })];
                case 2:
                    _b.sent();
                    return [2 /*return*/, (0, node_1.json)({ status: 'success' })];
            }
        });
    });
}
function SignOutOfSessions() {
    var _a, _b;
    var data = (0, react_2.useLoaderData)();
    var dc = (0, misc_tsx_1.useDoubleCheck)();
    var fetcher = (0, react_2.useFetcher)();
    var otherSessionsCount = data.user._count.sessions - 1;
    return ((0, jsx_runtime_1.jsx)("div", { children: otherSessionsCount ? ((0, jsx_runtime_1.jsx)(fetcher.Form, __assign({ method: "POST" }, { children: (0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({}, dc.getButtonProps({
                type: 'submit',
                name: 'intent',
                value: signOutOfSessionsActionIntent
            }), { variant: dc.doubleCheck ? 'destructive' : 'default', status: fetcher.state !== 'idle'
                    ? 'pending'
                    : ((_b = (_a = fetcher.data) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : 'idle') }, { children: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "avatar" }, { children: dc.doubleCheck
                        ? "Are you sure?"
                        : "Sign out of ".concat(otherSessionsCount, " other sessions") })) })) }))) : ((0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "avatar" }, { children: "This is your only session" }))) }));
}
function deleteDataAction(_a) {
    var userId = _a.userId;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, db_server_ts_1.prisma.user["delete"]({ where: { id: userId } })];
                case 1:
                    _b.sent();
                    return [2 /*return*/, (0, toast_server_ts_1.redirectWithToast)('/', {
                            type: 'success',
                            title: 'Data Deleted',
                            description: 'All of your data has been deleted'
                        })];
            }
        });
    });
}
function DeleteData() {
    var dc = (0, misc_tsx_1.useDoubleCheck)();
    var fetcher = (0, react_2.useFetcher)();
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(fetcher.Form, __assign({ method: "POST" }, { children: (0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({}, dc.getButtonProps({
                type: 'submit',
                name: 'intent',
                value: deleteDataActionIntent
            }), { variant: dc.doubleCheck ? 'destructive' : 'default', status: fetcher.state !== 'idle' ? 'pending' : 'idle' }, { children: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "trash" }, { children: dc.doubleCheck ? "Are you sure?" : "Delete all your data" })) })) })) }));
}
