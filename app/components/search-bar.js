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
exports.SearchBar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@remix-run/react");
var react_2 = require("react");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var icon_tsx_1 = require("./ui/icon.tsx");
var input_tsx_1 = require("./ui/input.tsx");
var label_tsx_1 = require("./ui/label.tsx");
var status_button_tsx_1 = require("./ui/status-button.tsx");
function SearchBar(_a) {
    var _b;
    var status = _a.status, _c = _a.autoFocus, autoFocus = _c === void 0 ? false : _c, _d = _a.autoSubmit, autoSubmit = _d === void 0 ? false : _d;
    var id = (0, react_2.useId)();
    var searchParams = (0, react_1.useSearchParams)()[0];
    var submit = (0, react_1.useSubmit)();
    var isSubmitting = (0, misc_tsx_1.useIsPending)({
        formMethod: 'GET',
        formAction: '/users'
    });
    var handleFormChange = (0, misc_tsx_1.useDebounce)(function (form) {
        submit(form);
    }, 400);
    return ((0, jsx_runtime_1.jsxs)(react_1.Form, __assign({ method: "GET", action: "/users", className: "flex flex-wrap items-center justify-center gap-2", onChange: function (e) { return autoSubmit && handleFormChange(e.currentTarget); } }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex-1" }, { children: [(0, jsx_runtime_1.jsx)(label_tsx_1.Label, __assign({ htmlFor: id, className: "sr-only" }, { children: "Search" })), (0, jsx_runtime_1.jsx)(input_tsx_1.Input, { type: "search", name: "search", id: id, defaultValue: (_b = searchParams.get('search')) !== null && _b !== void 0 ? _b : '', placeholder: "Search", className: "w-full", autoFocus: autoFocus })] })), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(status_button_tsx_1.StatusButton, __assign({ type: "submit", status: isSubmitting ? 'pending' : status, className: "flex w-full items-center justify-center" }, { children: [(0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "magnifying-glass", size: "md" }), (0, jsx_runtime_1.jsx)("span", __assign({ className: "sr-only" }, { children: "Search" }))] })) })] })));
}
exports.SearchBar = SearchBar;
