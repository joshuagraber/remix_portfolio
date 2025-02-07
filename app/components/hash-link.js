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
exports.HashLink = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@remix-run/react");
var misc_tsx_1 = require("#app/utils/misc.tsx");
function HashLink(_a) {
    var to = _a.to, children = _a.children, activeClassName = _a.activeClassName, className = _a.className;
    var location = (0, react_1.useLocation)();
    var isActive = location.hash.split('#')[1] === to.split('#')[1];
    return ((0, jsx_runtime_1.jsx)(react_1.Link, __assign({ to: to, className: (0, misc_tsx_1.cn)(className, isActive ? activeClassName : '') }, { children: children })));
}
exports.HashLink = HashLink;
