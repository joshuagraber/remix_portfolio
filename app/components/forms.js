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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.CheckboxField = exports.TextareaField = exports.OTPField = exports.Field = exports.ErrorList = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@conform-to/react");
var input_otp_1 = require("input-otp");
var react_2 = require("react");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var checkbox_tsx_1 = require("./ui/checkbox.tsx");
var input_otp_tsx_1 = require("./ui/input-otp.tsx");
var input_tsx_1 = require("./ui/input.tsx");
var label_tsx_1 = require("./ui/label.tsx");
var textarea_tsx_1 = require("./ui/textarea.tsx");
function ErrorList(_a) {
    var id = _a.id, errors = _a.errors;
    var errorsToRender = errors === null || errors === void 0 ? void 0 : errors.filter(Boolean);
    if (!(errorsToRender === null || errorsToRender === void 0 ? void 0 : errorsToRender.length))
        return null;
    return ((0, jsx_runtime_1.jsx)("ul", __assign({ id: id, className: "flex flex-col gap-1" }, { children: errorsToRender.map(function (e) { return ((0, jsx_runtime_1.jsx)("li", __assign({ className: "text-[10px] text-foreground-destructive" }, { children: e }), e)); }) })));
}
exports.ErrorList = ErrorList;
function Field(_a) {
    var _b;
    var labelProps = _a.labelProps, inputProps = _a.inputProps, errors = _a.errors, className = _a.className;
    var fallbackId = (0, react_2.useId)();
    var id = (_b = inputProps.id) !== null && _b !== void 0 ? _b : fallbackId;
    var errorId = (errors === null || errors === void 0 ? void 0 : errors.length) ? "".concat(id, "-error") : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: className }, { children: [(0, jsx_runtime_1.jsx)(label_tsx_1.Label, __assign({ htmlFor: id }, labelProps)), (0, jsx_runtime_1.jsx)(input_tsx_1.Input, __assign({ id: id, "aria-invalid": errorId ? true : undefined, "aria-describedby": errorId }, inputProps)), (0, jsx_runtime_1.jsx)("div", __assign({ className: "min-h-[32px] px-4 pb-3 pt-1" }, { children: errorId ? (0, jsx_runtime_1.jsx)(ErrorList, { id: errorId, errors: errors }) : null }))] })));
}
exports.Field = Field;
function OTPField(_a) {
    var _b;
    var labelProps = _a.labelProps, inputProps = _a.inputProps, errors = _a.errors, className = _a.className;
    var fallbackId = (0, react_2.useId)();
    var id = (_b = inputProps.id) !== null && _b !== void 0 ? _b : fallbackId;
    var errorId = (errors === null || errors === void 0 ? void 0 : errors.length) ? "".concat(id, "-error") : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: className }, { children: [(0, jsx_runtime_1.jsx)(label_tsx_1.Label, __assign({ htmlFor: id }, labelProps)), (0, jsx_runtime_1.jsxs)(input_otp_tsx_1.InputOTP, __assign({ pattern: input_otp_1.REGEXP_ONLY_DIGITS_AND_CHARS, maxLength: 6, id: id, "aria-invalid": errorId ? true : undefined, "aria-describedby": errorId }, inputProps, { children: [(0, jsx_runtime_1.jsxs)(input_otp_tsx_1.InputOTPGroup, { children: [(0, jsx_runtime_1.jsx)(input_otp_tsx_1.InputOTPSlot, { index: 0 }), (0, jsx_runtime_1.jsx)(input_otp_tsx_1.InputOTPSlot, { index: 1 }), (0, jsx_runtime_1.jsx)(input_otp_tsx_1.InputOTPSlot, { index: 2 })] }), (0, jsx_runtime_1.jsx)(input_otp_tsx_1.InputOTPSeparator, {}), (0, jsx_runtime_1.jsxs)(input_otp_tsx_1.InputOTPGroup, { children: [(0, jsx_runtime_1.jsx)(input_otp_tsx_1.InputOTPSlot, { index: 3 }), (0, jsx_runtime_1.jsx)(input_otp_tsx_1.InputOTPSlot, { index: 4 }), (0, jsx_runtime_1.jsx)(input_otp_tsx_1.InputOTPSlot, { index: 5 })] })] })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "min-h-[32px] px-4 pb-3 pt-1" }, { children: errorId ? (0, jsx_runtime_1.jsx)(ErrorList, { id: errorId, errors: errors }) : null }))] })));
}
exports.OTPField = OTPField;
function TextareaField(_a) {
    var _b, _c;
    var labelProps = _a.labelProps, textareaProps = _a.textareaProps, errors = _a.errors, className = _a.className;
    var fallbackId = (0, react_2.useId)();
    var id = (_c = (_b = textareaProps.id) !== null && _b !== void 0 ? _b : textareaProps.name) !== null && _c !== void 0 ? _c : fallbackId;
    var errorId = (errors === null || errors === void 0 ? void 0 : errors.length) ? "".concat(id, "-error") : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: className }, { children: [(0, jsx_runtime_1.jsx)(label_tsx_1.Label, __assign({ htmlFor: id }, labelProps)), (0, jsx_runtime_1.jsx)(textarea_tsx_1.Textarea, __assign({ id: id, "aria-invalid": errorId ? true : undefined, "aria-describedby": errorId }, textareaProps)), (0, jsx_runtime_1.jsx)("div", __assign({ className: (0, misc_tsx_1.cn)('px-4 pb-3 pt-1', errorId && 'min-h-[32px]', !errorId && 'h-0') }, { children: errorId ? (0, jsx_runtime_1.jsx)(ErrorList, { id: errorId, errors: errors }) : null }))] })));
}
exports.TextareaField = TextareaField;
function CheckboxField(_a) {
    var _b, _c;
    var labelProps = _a.labelProps, buttonProps = _a.buttonProps, errors = _a.errors, className = _a.className;
    var key = buttonProps.key, defaultChecked = buttonProps.defaultChecked, checkboxProps = __rest(buttonProps, ["key", "defaultChecked"]);
    var fallbackId = (0, react_2.useId)();
    var checkedValue = (_b = buttonProps.value) !== null && _b !== void 0 ? _b : 'on';
    var input = (0, react_1.useInputControl)({
        key: key,
        name: buttonProps.name,
        formId: buttonProps.form,
        initialValue: defaultChecked ? checkedValue : undefined
    });
    var id = (_c = buttonProps.id) !== null && _c !== void 0 ? _c : fallbackId;
    var errorId = (errors === null || errors === void 0 ? void 0 : errors.length) ? "".concat(id, "-error") : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: className }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex gap-2" }, { children: [(0, jsx_runtime_1.jsx)(checkbox_tsx_1.Checkbox, __assign({}, checkboxProps, { id: id, "aria-invalid": errorId ? true : undefined, "aria-describedby": errorId, checked: input.value === checkedValue, onCheckedChange: function (state) {
                            var _a;
                            input.change(state.valueOf() ? checkedValue : '');
                            (_a = buttonProps.onCheckedChange) === null || _a === void 0 ? void 0 : _a.call(buttonProps, state);
                        }, onFocus: function (event) {
                            var _a;
                            input.focus();
                            (_a = buttonProps.onFocus) === null || _a === void 0 ? void 0 : _a.call(buttonProps, event);
                        }, onBlur: function (event) {
                            var _a;
                            input.blur();
                            (_a = buttonProps.onBlur) === null || _a === void 0 ? void 0 : _a.call(buttonProps, event);
                        }, type: "button" })), (0, jsx_runtime_1.jsx)("label", __assign({ htmlFor: id }, labelProps, { className: "self-center text-body-xs text-muted-foreground" }))] })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "px-4 pb-3 pt-1" }, { children: errorId ? (0, jsx_runtime_1.jsx)(ErrorList, { id: errorId, errors: errors }) : null }))] })));
}
exports.CheckboxField = CheckboxField;
