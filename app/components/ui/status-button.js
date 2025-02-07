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
exports.StatusButton = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = __importStar(require("react"));
var spin_delay_1 = require("spin-delay");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var button_tsx_1 = require("./button.tsx");
var icon_tsx_1 = require("./icon.tsx");
var tooltip_tsx_1 = require("./tooltip.tsx");
exports.StatusButton = React.forwardRef(function (_a, ref) {
    var message = _a.message, status = _a.status, className = _a.className, children = _a.children, spinDelay = _a.spinDelay, props = __rest(_a, ["message", "status", "className", "children", "spinDelay"]);
    var delayedPending = (0, spin_delay_1.useSpinDelay)(status === 'pending', __assign({ delay: 400, minDuration: 300 }, spinDelay));
    var companion = {
        pending: delayedPending ? ((0, jsx_runtime_1.jsx)("div", __assign({ role: "status", className: "inline-flex h-6 w-6 items-center justify-center" }, { children: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "update", className: "animate-spin", title: "loading" }) }))) : null,
        success: ((0, jsx_runtime_1.jsx)("div", __assign({ role: "status", className: "inline-flex h-6 w-6 items-center justify-center" }, { children: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "check", title: "success" }) }))),
        error: ((0, jsx_runtime_1.jsx)("div", __assign({ role: "status", className: "inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive" }, { children: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "cross-1", className: "text-destructive-foreground", title: "error" }) }))),
        idle: null
    }[status];
    return ((0, jsx_runtime_1.jsxs)(button_tsx_1.Button, __assign({ ref: ref, className: (0, misc_tsx_1.cn)('flex justify-center gap-4', className) }, props, { children: [(0, jsx_runtime_1.jsx)("div", { children: children }), message ? ((0, jsx_runtime_1.jsx)(tooltip_tsx_1.TooltipProvider, { children: (0, jsx_runtime_1.jsxs)(tooltip_tsx_1.Tooltip, { children: [(0, jsx_runtime_1.jsx)(tooltip_tsx_1.TooltipTrigger, { children: companion }), (0, jsx_runtime_1.jsx)(tooltip_tsx_1.TooltipContent, { children: message })] }) })) : (companion)] })));
});
exports.StatusButton.displayName = 'Button';
