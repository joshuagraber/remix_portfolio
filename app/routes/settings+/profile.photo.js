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
var react_3 = require("react");
var zod_2 = require("zod");
var forms_tsx_1 = require("#app/components/forms.tsx");
var button_tsx_1 = require("#app/components/ui/button.tsx");
var icon_tsx_1 = require("#app/components/ui/icon.tsx");
var status_button_tsx_1 = require("#app/components/ui/status-button.tsx");
var auth_server_ts_1 = require("#app/utils/auth.server.ts");
var db_server_ts_1 = require("#app/utils/db.server.ts");
var misc_tsx_1 = require("#app/utils/misc.tsx");
exports.handle = {
    breadcrumb: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "avatar" }, { children: "Photo" })),
    getSitemapEntries: function () { return null; }
};
var MAX_SIZE = 1024 * 1024 * 3; // 3MB
var DeleteImageSchema = zod_2.z.object({
    intent: zod_2.z.literal('delete')
});
var NewImageSchema = zod_2.z.object({
    intent: zod_2.z.literal('submit'),
    photoFile: zod_2.z["instanceof"](File)
        .refine(function (file) { return file.size > 0; }, 'Image is required')
        .refine(function (file) { return file.size <= MAX_SIZE; }, 'Image size must be less than 3MB')
});
var PhotoFormSchema = zod_2.z.discriminatedUnion('intent', [
    DeleteImageSchema,
    NewImageSchema,
]);
function loader(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var userId, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, auth_server_ts_1.requireUserId)(request)];
                case 1:
                    userId = _b.sent();
                    return [4 /*yield*/, db_server_ts_1.prisma.user.findUnique({
                            where: { id: userId },
                            select: {
                                id: true,
                                name: true,
                                username: true,
                                image: { select: { id: true } }
                            }
                        })];
                case 2:
                    user = _b.sent();
                    (0, invariant_1.invariantResponse)(user, 'User not found', { status: 404 });
                    return [2 /*return*/, (0, node_1.json)({ user: user })];
            }
        });
    });
}
exports.loader = loader;
function action(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var userId, formData, submission, _b, image, intent;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, auth_server_ts_1.requireUserId)(request)];
                case 1:
                    userId = _c.sent();
                    return [4 /*yield*/, (0, node_1.unstable_parseMultipartFormData)(request, (0, node_1.unstable_createMemoryUploadHandler)({ maxPartSize: MAX_SIZE }))];
                case 2:
                    formData = _c.sent();
                    return [4 /*yield*/, (0, zod_1.parseWithZod)(formData, {
                            schema: PhotoFormSchema.transform(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, _b;
                                var _c, _d;
                                return __generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            if (data.intent === 'delete')
                                                return [2 /*return*/, { intent: 'delete' }];
                                            if (data.photoFile.size <= 0)
                                                return [2 /*return*/, zod_2.z.NEVER];
                                            _c = {
                                                intent: data.intent
                                            };
                                            _d = {
                                                contentType: data.photoFile.type
                                            };
                                            _b = (_a = Buffer).from;
                                            return [4 /*yield*/, data.photoFile.arrayBuffer()];
                                        case 1: return [2 /*return*/, (_c.image = (_d.blob = _b.apply(_a, [_e.sent()]),
                                                _d),
                                                _c)];
                                    }
                                });
                            }); }),
                            async: true
                        })];
                case 3:
                    submission = _c.sent();
                    if (submission.status !== 'success') {
                        return [2 /*return*/, (0, node_1.json)({ result: submission.reply() }, { status: submission.status === 'error' ? 400 : 200 })];
                    }
                    _b = submission.value, image = _b.image, intent = _b.intent;
                    if (!(intent === 'delete')) return [3 /*break*/, 5];
                    return [4 /*yield*/, db_server_ts_1.prisma.userImage.deleteMany({ where: { userId: userId } })];
                case 4:
                    _c.sent();
                    return [2 /*return*/, (0, node_1.redirect)('/settings/profile')];
                case 5: return [4 /*yield*/, db_server_ts_1.prisma.$transaction(function ($prisma) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, $prisma.userImage.deleteMany({ where: { userId: userId } })];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, $prisma.user.update({
                                            where: { id: userId },
                                            data: { image: { create: image } }
                                        })];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 6:
                    _c.sent();
                    return [2 /*return*/, (0, node_1.redirect)('/settings/profile')];
            }
        });
    });
}
exports.action = action;
function PhotoRoute() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var data = (0, react_2.useLoaderData)();
    var doubleCheckDeleteImage = (0, misc_tsx_1.useDoubleCheck)();
    var actionData = (0, react_2.useActionData)();
    var navigation = (0, react_2.useNavigation)();
    var _j = (0, react_1.useForm)({
        id: 'profile-photo',
        constraint: (0, zod_1.getZodConstraint)(PhotoFormSchema),
        lastResult: actionData === null || actionData === void 0 ? void 0 : actionData.result,
        onValidate: function (_a) {
            var formData = _a.formData;
            return (0, zod_1.parseWithZod)(formData, { schema: PhotoFormSchema });
        },
        shouldRevalidate: 'onBlur'
    }), form = _j[0], fields = _j[1];
    var isPending = (0, misc_tsx_1.useIsPending)();
    var pendingIntent = isPending ? (_a = navigation.formData) === null || _a === void 0 ? void 0 : _a.get('intent') : null;
    var lastSubmissionIntent = fields.intent.value;
    var _k = (0, react_3.useState)(null), newImageSrc = _k[0], setNewImageSrc = _k[1];
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(react_2.Form, __assign({ method: "POST", encType: "multipart/form-data", className: "flex flex-col items-center justify-center gap-10", onReset: function () { return setNewImageSrc(null); } }, (0, react_1.getFormProps)(form), { children: [(0, jsx_runtime_1.jsx)("img", { src: newImageSrc !== null && newImageSrc !== void 0 ? newImageSrc : (data.user ? (0, misc_tsx_1.getUserImgSrc)((_b = data.user.image) === null || _b === void 0 ? void 0 : _b.id) : ''), className: "h-52 w-52 rounded-full object-cover", alt: (_d = (_c = data.user) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : (_e = data.user) === null || _e === void 0 ? void 0 : _e.username }), (0, jsx_runtime_1.jsx)(forms_tsx_1.ErrorList, { errors: fields.photoFile.errors, id: fields.photoFile.id }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex gap-4" }, { children: [(0, jsx_runtime_1.jsx)("input", __assign({}, (0, react_1.getInputProps)(fields.photoFile, { type: 'file' }), { accept: "image/*", className: "peer sr-only", required: true, tabIndex: newImageSrc ? -1 : 0, onChange: function (e) {
                                var _a;
                                var file = (_a = e.currentTarget.files) === null || _a === void 0 ? void 0 : _a[0];
                                if (file) {
                                    var reader = new FileReader();
                                    reader.onload = function (event) {
                                        var _a, _b, _c;
                                        setNewImageSrc((_c = (_b = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : null);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            } })), (0, jsx_runtime_1.jsx)(button_tsx_1.Button, __assign({ asChild: true, className: "cursor-pointer peer-valid:hidden peer-focus-within:ring-2 peer-focus-visible:ring-2" }, { children: (0, jsx_runtime_1.jsx)("label", __assign({ htmlFor: fields.photoFile.id }, { children: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "pencil-1" }, { children: "Change" })) })) })), (0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({ name: "intent", value: "submit", type: "submit", className: "peer-invalid:hidden", status: pendingIntent === 'submit'
                                ? 'pending'
                                : lastSubmissionIntent === 'submit'
                                    ? ((_f = form.status) !== null && _f !== void 0 ? _f : 'idle')
                                    : 'idle' }, { children: "Save Photo" })), (0, jsx_runtime_1.jsx)(button_tsx_1.Button, __assign({ variant: "destructive", className: "peer-invalid:hidden" }, form.reset.getButtonProps(), { children: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "trash" }, { children: "Reset" })) })), ((_g = data.user.image) === null || _g === void 0 ? void 0 : _g.id) ? ((0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({ className: "peer-valid:hidden", variant: "destructive" }, doubleCheckDeleteImage.getButtonProps({
                            type: 'submit',
                            name: 'intent',
                            value: 'delete'
                        }), { status: pendingIntent === 'delete'
                                ? 'pending'
                                : lastSubmissionIntent === 'delete'
                                    ? ((_h = form.status) !== null && _h !== void 0 ? _h : 'idle')
                                    : 'idle' }, { children: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "trash" }, { children: doubleCheckDeleteImage.doubleCheck
                                    ? 'Are you sure?'
                                    : 'Delete' })) }))) : null] })), (0, jsx_runtime_1.jsx)(forms_tsx_1.ErrorList, { errors: form.errors })] })) }));
}
exports["default"] = PhotoRoute;
