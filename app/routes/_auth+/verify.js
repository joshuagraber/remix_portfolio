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
var _a;
exports.__esModule = true;
exports.ErrorBoundary = exports.action = exports.VerifySchema = exports.redirectToQueryParam = exports.typeQueryParam = exports.targetQueryParam = exports.codeQueryParam = exports.handle = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@conform-to/react");
var zod_1 = require("@conform-to/zod");
var react_2 = require("@remix-run/react");
var react_3 = require("remix-utils/honeypot/react");
var zod_2 = require("zod");
var error_boundary_tsx_1 = require("#app/components/error-boundary.tsx");
var forms_tsx_1 = require("#app/components/forms.tsx");
var spacer_tsx_1 = require("#app/components/spacer.tsx");
var status_button_tsx_1 = require("#app/components/ui/status-button.tsx");
var honeypot_server_ts_1 = require("#app/utils/honeypot.server.ts");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var verify_server_ts_1 = require("./verify.server.ts");
exports.handle = {
    getSitemapEntries: function () { return null; }
};
exports.codeQueryParam = 'code';
exports.targetQueryParam = 'target';
exports.typeQueryParam = 'type';
exports.redirectToQueryParam = 'redirectTo';
var types = ['onboarding', 'reset-password', 'change-email', '2fa'];
var VerificationTypeSchema = zod_2.z["enum"](types);
exports.VerifySchema = zod_2.z.object((_a = {},
    _a[exports.codeQueryParam] = zod_2.z.string().min(6).max(6),
    _a[exports.typeQueryParam] = VerificationTypeSchema,
    _a[exports.targetQueryParam] = zod_2.z.string(),
    _a[exports.redirectToQueryParam] = zod_2.z.string().optional(),
    _a));
function action(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var formData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, request.formData()];
                case 1:
                    formData = _b.sent();
                    (0, honeypot_server_ts_1.checkHoneypot)(formData);
                    return [2 /*return*/, (0, verify_server_ts_1.validateRequest)(request, formData)];
            }
        });
    });
}
exports.action = action;
function VerifyRoute() {
    var _a;
    var searchParams = (0, react_2.useSearchParams)()[0];
    var isPending = (0, misc_tsx_1.useIsPending)();
    var actionData = (0, react_2.useActionData)();
    var parseWithZoddType = VerificationTypeSchema.safeParse(searchParams.get(exports.typeQueryParam));
    var type = parseWithZoddType.success ? parseWithZoddType.data : null;
    var checkEmail = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h1", __assign({ className: "text-h1" }, { children: "Check your email" })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "mt-3 text-body-md text-muted-foreground" }, { children: "We've sent you a code to verify your email address." }))] }));
    var headings = {
        onboarding: checkEmail,
        'reset-password': checkEmail,
        'change-email': checkEmail,
        '2fa': ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h1", __assign({ className: "text-h1" }, { children: "Check your 2FA app" })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "mt-3 text-body-md text-muted-foreground" }, { children: "Please enter your 2FA code to verify your identity." }))] }))
    };
    var _b = (0, react_1.useForm)({
        id: 'verify-form',
        constraint: (0, zod_1.getZodConstraint)(exports.VerifySchema),
        lastResult: actionData === null || actionData === void 0 ? void 0 : actionData.result,
        onValidate: function (_a) {
            var formData = _a.formData;
            return (0, zod_1.parseWithZod)(formData, { schema: exports.VerifySchema });
        },
        defaultValue: {
            code: searchParams.get(exports.codeQueryParam),
            type: type,
            target: searchParams.get(exports.targetQueryParam),
            redirectTo: searchParams.get(exports.redirectToQueryParam)
        }
    }), form = _b[0], fields = _b[1];
    return ((0, jsx_runtime_1.jsxs)("main", __assign({ className: "container flex flex-col justify-center pb-32 pt-20" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "text-center" }, { children: type ? headings[type] : 'Invalid Verification Type' })), (0, jsx_runtime_1.jsx)(spacer_tsx_1.Spacer, { size: "xs" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "mx-auto flex w-72 max-w-full flex-col justify-center gap-1" }, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(forms_tsx_1.ErrorList, { errors: form.errors, id: form.errorId }) }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "flex w-full gap-2" }, { children: (0, jsx_runtime_1.jsxs)(react_2.Form, __assign({ method: "POST" }, (0, react_1.getFormProps)(form), { className: "flex-1" }, { children: [(0, jsx_runtime_1.jsx)(react_3.HoneypotInputs, {}), (0, jsx_runtime_1.jsx)("div", __assign({ className: "flex items-center justify-center" }, { children: (0, jsx_runtime_1.jsx)(forms_tsx_1.OTPField, { labelProps: {
                                            htmlFor: fields[exports.codeQueryParam].id,
                                            children: 'Code'
                                        }, inputProps: __assign(__assign({}, (0, react_1.getInputProps)(fields[exports.codeQueryParam], { type: 'text' })), { autoComplete: 'one-time-code', autoFocus: true }), errors: fields[exports.codeQueryParam].errors }) })), (0, jsx_runtime_1.jsx)("input", __assign({}, (0, react_1.getInputProps)(fields[exports.typeQueryParam], { type: 'hidden' }))), (0, jsx_runtime_1.jsx)("input", __assign({}, (0, react_1.getInputProps)(fields[exports.targetQueryParam], { type: 'hidden' }))), (0, jsx_runtime_1.jsx)("input", __assign({}, (0, react_1.getInputProps)(fields[exports.redirectToQueryParam], {
                                    type: 'hidden'
                                }))), (0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({ className: "w-full", status: isPending ? 'pending' : ((_a = form.status) !== null && _a !== void 0 ? _a : 'idle'), type: "submit", disabled: isPending }, { children: "Submit" }))] })) }))] }))] })));
}
exports["default"] = VerifyRoute;
function ErrorBoundary() {
    return (0, jsx_runtime_1.jsx)(error_boundary_tsx_1.GeneralErrorBoundary, {});
}
exports.ErrorBoundary = ErrorBoundary;
