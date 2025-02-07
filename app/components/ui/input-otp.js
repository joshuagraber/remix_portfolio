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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.InputOTPSeparator = exports.InputOTPSlot = exports.InputOTPGroup = exports.InputOTP = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var input_otp_1 = require("input-otp");
var React = __importStar(require("react"));
var misc_tsx_1 = require("#app/utils/misc.tsx");
var InputOTP = React.forwardRef(function (_a, ref) {
    var className = _a.className, containerClassName = _a.containerClassName, props = __rest(_a, ["className", "containerClassName"]);
    return ((0, jsx_runtime_1.jsx)(input_otp_1.OTPInput, __assign({ ref: ref, containerClassName: (0, misc_tsx_1.cn)('flex items-center gap-2 has-[:disabled]:opacity-50', containerClassName), className: (0, misc_tsx_1.cn)('disabled:cursor-not-allowed', className) }, props)));
});
exports.InputOTP = InputOTP;
InputOTP.displayName = 'InputOTP';
var InputOTPGroup = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: ref, className: (0, misc_tsx_1.cn)('flex items-center', className) }, props)));
});
exports.InputOTPGroup = InputOTPGroup;
InputOTPGroup.displayName = 'InputOTPGroup';
var InputOTPSlot = React.forwardRef(function (_a, ref) {
    var index = _a.index, className = _a.className, props = __rest(_a, ["index", "className"]);
    var inputOTPContext = React.useContext(input_otp_1.OTPInputContext);
    var slot = inputOTPContext.slots[index];
    if (!slot)
        throw new Error('Invalid slot index');
    var char = slot.char, hasFakeCaret = slot.hasFakeCaret, isActive = slot.isActive;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ ref: ref, className: (0, misc_tsx_1.cn)('relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-base transition-all first:rounded-l-md first:border-l last:rounded-r-md md:text-sm', isActive && 'z-10 ring-2 ring-ring ring-offset-background', className) }, props, { children: [char, hasFakeCaret && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "pointer-events-none absolute inset-0 flex items-center justify-center" }, { children: (0, jsx_runtime_1.jsx)("div", { className: "h-4 w-px animate-caret-blink bg-foreground duration-1000" }) })))] })));
});
exports.InputOTPSlot = InputOTPSlot;
InputOTPSlot.displayName = 'InputOTPSlot';
var InputOTPSeparator = React.forwardRef(function (_a, ref) {
    var props = __rest(_a, []);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: ref, role: "separator" }, props, { children: "-" })));
});
exports.InputOTPSeparator = InputOTPSeparator;
InputOTPSeparator.displayName = 'InputOTPSeparator';
