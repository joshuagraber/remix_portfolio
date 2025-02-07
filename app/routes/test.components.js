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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.meta = exports.action = exports.handle = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@conform-to/react");
var zod_1 = require("@conform-to/zod");
var node_1 = require("@remix-run/node");
var react_2 = require("@remix-run/react");
var react_3 = __importDefault(require("react"));
var react_4 = require("remix-utils/honeypot/react");
var sonner_1 = require("sonner");
var zod_2 = require("zod");
var forms_tsx_1 = require("#app/components/forms.tsx");
var spacer_tsx_1 = require("#app/components/spacer.tsx");
var button_tsx_1 = require("#app/components/ui/button.tsx");
var icon_tsx_1 = require("#app/components/ui/icon.tsx");
var status_button_tsx_1 = require("#app/components/ui/status-button.tsx");
var tooltip_tsx_1 = require("#app/components/ui/tooltip.tsx");
var honeypot_server_ts_1 = require("#app/utils/honeypot.server.ts");
var misc_tsx_1 = require("#app/utils/misc.tsx");
exports.handle = {
    getSitemapEntries: function () { return null; }
};
function action(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var formData, submission;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, request.formData()];
                case 1:
                    formData = _b.sent();
                    (0, honeypot_server_ts_1.checkHoneypot)(formData);
                    return [4 /*yield*/, (0, zod_1.parseWithZod)(formData, {
                            schema: TestSchema,
                            async: true
                        })];
                case 2:
                    submission = _b.sent();
                    try {
                        console.log('form action', { submission: submission });
                        if (submission.status !== 'success') {
                            return [2 /*return*/, (0, node_1.json)({ result: submission.reply() }, { status: submission.status === 'error' ? 400 : 200 })];
                        }
                        return [2 /*return*/, (0, node_1.json)({ result: submission.reply() })];
                    }
                    catch (response) {
                        return [2 /*return*/, (0, node_1.json)({
                                result: submission.reply({ formErrors: [response.error.message] })
                            }, {
                                status: 500
                            })];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.action = action;
var meta = function () {
    return [{ title: 'Test components | JDG' }];
};
exports.meta = meta;
var TestSchema = zod_2.z.object({
    name: zod_2.z.string().min(2),
    iceCream: zod_2.z["enum"](['on']).optional(),
    favorites: zod_2.z.string(),
    code: zod_2.z.string().min(6).max(6)
});
function TestComponents() {
    var _a;
    var actionData = (0, react_2.useActionData)();
    var isPending = (0, misc_tsx_1.useIsPending)();
    // const [searchParams] = useSearchParams()
    // const redirectTo = searchParams.get('redirectTo')
    var _b = (0, react_1.useForm)({
        id: 'test-form',
        constraint: (0, zod_1.getZodConstraint)(TestSchema),
        lastResult: actionData === null || actionData === void 0 ? void 0 : actionData.result,
        onValidate: function (_a) {
            var formData = _a.formData;
            var result = (0, zod_1.parseWithZod)(formData, { schema: TestSchema });
            return result;
        },
        shouldRevalidate: 'onBlur'
    }), form = _b[0], fields = _b[1];
    react_3["default"].useEffect(function () {
        sonner_1.toast.success('test success', { duration: 60000 });
        sonner_1.toast.info('test into', { duration: 60000 });
        sonner_1.toast.error('test error', { duration: 60000 });
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "p-6" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Test and re-style components" }), (0, jsx_runtime_1.jsx)("h2", { children: "Forms" }), (0, jsx_runtime_1.jsxs)(react_2.Form, __assign({ method: "POST" }, (0, react_1.getFormProps)(form), { children: [(0, jsx_runtime_1.jsx)(react_4.HoneypotInputs, {}), (0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { labelProps: {
                            htmlFor: fields.name.id,
                            children: 'Name'
                        }, inputProps: __assign(__assign({}, (0, react_1.getInputProps)(fields.name, { type: 'text' })), { autoComplete: 'name' }), errors: fields.name.errors }), (0, jsx_runtime_1.jsx)(forms_tsx_1.CheckboxField, { labelProps: {
                            htmlFor: fields.iceCream.id,
                            children: 'Do you like ice cream?'
                        }, buttonProps: __assign({}, (0, react_1.getInputProps)(fields.iceCream, { type: 'checkbox' })), errors: fields.iceCream.errors }), (0, jsx_runtime_1.jsx)(forms_tsx_1.TextareaField, { labelProps: { children: 'Favorite flavors?' }, textareaProps: __assign({}, (0, react_1.getTextareaProps)(fields.favorites)), errors: fields.favorites.errors }), (0, jsx_runtime_1.jsx)(forms_tsx_1.OTPField, { labelProps: {
                            htmlFor: fields.code.id,
                            children: 'Code'
                        }, inputProps: __assign(__assign({}, (0, react_1.getInputProps)(fields.code, { type: 'text' })), { autoFocus: true, autoComplete: 'one-time-code' }), errors: fields.code.errors }), (0, jsx_runtime_1.jsx)(forms_tsx_1.ErrorList, { errors: form.errors, id: form.errorId }), (0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({ className: "w-full", status: isPending ? 'pending' : ((_a = form.status) !== null && _a !== void 0 ? _a : 'idle'), type: "submit", disabled: isPending }, { children: "Submit" }))] })), (0, jsx_runtime_1.jsx)(spacer_tsx_1.Spacer, { size: "2xs" }), (0, jsx_runtime_1.jsx)("h2", { children: "Buttons" }), (0, jsx_runtime_1.jsx)("h3", { children: "Status buttons" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex gap-3" }, { children: [(0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({ status: "error" }, { children: "Error" })), (0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({ status: "pending" }, { children: "Pending" })), (0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({ status: "idle" }, { children: "Idle" })), (0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({ status: "success" }, { children: "Success" }))] })), (0, jsx_runtime_1.jsx)(spacer_tsx_1.Spacer, { size: "2xs" }), (0, jsx_runtime_1.jsx)("h3", { children: "Variant buttons" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex gap-3" }, { children: [(0, jsx_runtime_1.jsx)(button_tsx_1.Button, __assign({ variant: "default" }, { children: "Default" })), (0, jsx_runtime_1.jsx)(button_tsx_1.Button, __assign({ variant: "destructive" }, { children: "Destructive" })), (0, jsx_runtime_1.jsx)(button_tsx_1.Button, __assign({ variant: "ghost" }, { children: "Ghost" })), (0, jsx_runtime_1.jsx)(button_tsx_1.Button, __assign({ variant: "link" }, { children: "Link" })), (0, jsx_runtime_1.jsx)(button_tsx_1.Button, __assign({ variant: "outline" }, { children: "Outline" })), (0, jsx_runtime_1.jsx)(button_tsx_1.Button, __assign({ variant: "secondary" }, { children: "Secondary" }))] })), (0, jsx_runtime_1.jsx)(spacer_tsx_1.Spacer, { size: "2xs" }), (0, jsx_runtime_1.jsx)("h2", { children: "Tooltip" }), (0, jsx_runtime_1.jsx)(tooltip_tsx_1.TooltipProvider, { children: (0, jsx_runtime_1.jsxs)(tooltip_tsx_1.Tooltip, { children: [(0, jsx_runtime_1.jsx)(tooltip_tsx_1.TooltipTrigger, { children: "Tooltip trigger" }), (0, jsx_runtime_1.jsx)(tooltip_tsx_1.TooltipContent, { children: "Tooltip content" })] }) }), (0, jsx_runtime_1.jsx)(spacer_tsx_1.Spacer, { size: "2xs" }), (0, jsx_runtime_1.jsx)(tooltip_tsx_1.TooltipProvider, { children: (0, jsx_runtime_1.jsxs)(tooltip_tsx_1.Tooltip, { children: [(0, jsx_runtime_1.jsx)(tooltip_tsx_1.TooltipTrigger, __assign({ asChild: true }, { children: (0, jsx_runtime_1.jsxs)("span", { children: ["Tooltip trigger (as child)", (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "check" })] }) })), (0, jsx_runtime_1.jsx)(tooltip_tsx_1.TooltipContent, { children: "Tooltip content" })] }) }), (0, jsx_runtime_1.jsx)(spacer_tsx_1.Spacer, { size: "2xs" }), (0, jsx_runtime_1.jsx)("h2", { children: "Other Colors" }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "border-2 border-solid" }, { children: "Border" })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-accent text-accent-foreground" }, { children: "Accent" })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-secondary text-secondary-foreground" }, { children: "Secondary" })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-primary text-primary-foreground" }, { children: "Primary" })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-destructive text-destructive-foreground" }, { children: "Destructive" })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-foreground-destructive" }, { children: "Foreground destructive" })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-muted text-muted-foreground" }, { children: "Muted" })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-card text-card-foreground" }, { children: "Card" })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-popover text-popover-foreground" }, { children: "Popover" })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-input" }, { children: "Input" })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-background" }, { children: "Background" })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-primary text-primary-foreground" }, { children: "Primary" })), (0, jsx_runtime_1.jsx)(spacer_tsx_1.Spacer, { size: "xs" }), (0, jsx_runtime_1.jsx)("h2", { children: "Miscellaneous" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col" }, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Headings" }), (0, jsx_runtime_1.jsx)("h1", { children: "This is an h1 by default" }), (0, jsx_runtime_1.jsx)("h2", { children: "This is an h2 by default" }), (0, jsx_runtime_1.jsx)("h3", { children: "This is an h3 by default" }), (0, jsx_runtime_1.jsx)("h4", { children: "This is an h4 by default" }), (0, jsx_runtime_1.jsx)("h5", { children: "This is an h5 by default" }), (0, jsx_runtime_1.jsx)("h6", { children: "This is an h6 by default" })] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "mt-6 flex flex-col" }, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Links" }), (0, jsx_runtime_1.jsx)(react_2.Link, __assign({ to: "/" }, { children: "This is how a link is styled" })), (0, jsx_runtime_1.jsx)(react_2.Link, __assign({ to: "/" }, { children: "Another one for seeing the difference" }))] })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Mono" }), (0, jsx_runtime_1.jsx)("pre", { children: JSON.stringify({ foo: 'bar', baz: 'buzz' }, null, 2) })] }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "mt-6 flex flex-col gap-6 sm:flex-row sm:flex-wrap" }, { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ className: "w-full" }, { children: "Theme color palate" })), (0, jsx_runtime_1.jsx)("div", { children: new Array(5).fill(null).map(function (_, i) {
                            return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center gap-2" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "h-20 w-20", style: {
                                            backgroundColor: "hsl(var(--neutral-".concat(i, "))")
                                        } }), (0, jsx_runtime_1.jsx)("p", { children: "neutral-".concat(i) })] }), i));
                        }) }), (0, jsx_runtime_1.jsx)("div", { children: new Array(10).fill(null).map(function (_, i) {
                            return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center gap-2" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "h-20 w-20", style: {
                                            backgroundColor: "hsl(var(--theme-".concat(i, "))")
                                        } }), (0, jsx_runtime_1.jsx)("p", { children: "theme-".concat(i) })] }), i));
                        }) })] }))] })));
}
exports["default"] = TestComponents;
