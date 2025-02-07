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
var _a, _b;
exports.__esModule = true;
exports.ProviderConnectionForm = exports.providerIcons = exports.providerLabels = exports.ProviderNameSchema = exports.providerNames = exports.GITHUB_PROVIDER_NAME = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@remix-run/react");
var zod_1 = require("zod");
var icon_tsx_1 = require("#app/components/ui/icon.tsx");
var status_button_tsx_1 = require("#app/components/ui/status-button.tsx");
var misc_tsx_1 = require("./misc.tsx");
exports.GITHUB_PROVIDER_NAME = 'github';
// to add another provider, set their name here and add it to the providerNames below
exports.providerNames = [exports.GITHUB_PROVIDER_NAME];
exports.ProviderNameSchema = zod_1.z["enum"](exports.providerNames);
exports.providerLabels = (_a = {},
    _a[exports.GITHUB_PROVIDER_NAME] = 'GitHub',
    _a);
exports.providerIcons = (_b = {},
    _b[exports.GITHUB_PROVIDER_NAME] = (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "github-logo" }),
    _b);
function ProviderConnectionForm(_a) {
    var redirectTo = _a.redirectTo, type = _a.type, providerName = _a.providerName;
    var label = exports.providerLabels[providerName];
    var formAction = "/auth/".concat(providerName);
    var isPending = (0, misc_tsx_1.useIsPending)({ formAction: formAction });
    return ((0, jsx_runtime_1.jsxs)(react_1.Form, __assign({ className: "flex items-center justify-center gap-2", action: formAction, method: "POST" }, { children: [redirectTo ? ((0, jsx_runtime_1.jsx)("input", { type: "hidden", name: "redirectTo", value: redirectTo })) : null, (0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({ type: "submit", className: "w-full", status: isPending ? 'pending' : 'idle' }, { children: (0, jsx_runtime_1.jsxs)("span", __assign({ className: "inline-flex items-center gap-1.5" }, { children: [exports.providerIcons[providerName], (0, jsx_runtime_1.jsxs)("span", { children: [type, " with ", label] })] })) }))] })));
}
exports.ProviderConnectionForm = ProviderConnectionForm;
