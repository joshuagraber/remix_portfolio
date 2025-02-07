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
exports.handle = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@remix-run/react");
exports.handle = {
    getSitemapEntries: function () { return null; }
};
function Admin() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Admin" }), (0, jsx_runtime_1.jsx)("p", { children: "This is the admin page." }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col" }, { children: [(0, jsx_runtime_1.jsx)(react_1.Link, __assign({ to: "fragments" }, { children: "Add or update fragments" })), (0, jsx_runtime_1.jsx)(react_1.Link, __assign({ to: "cache" }, { children: "Inspect cache" }))] }))] }));
}
exports["default"] = Admin;
