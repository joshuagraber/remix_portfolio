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
exports.__esModule = true;
exports.twoFAVerificationType = exports.handle = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@remix-run/react");
var icon_tsx_1 = require("#app/components/ui/icon.tsx");
exports.handle = {
    breadcrumb: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "lock-closed" }, { children: "2FA" })),
    getSitemapEntries: function () { return null; }
};
exports.twoFAVerificationType = '2fa';
function TwoFactorRoute() {
    return (0, jsx_runtime_1.jsx)(react_1.Outlet, {});
}
exports["default"] = TwoFactorRoute;
