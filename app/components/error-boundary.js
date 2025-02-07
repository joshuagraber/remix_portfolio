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
exports.GeneralErrorBoundary = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@remix-run/react");
var remix_1 = require("@sentry/remix");
var misc_tsx_1 = require("#app/utils/misc.tsx");
function GeneralErrorBoundary(_a) {
    var _b;
    var _c = _a.defaultStatusHandler, defaultStatusHandler = _c === void 0 ? function (_a) {
        var error = _a.error;
        return ((0, jsx_runtime_1.jsxs)("p", { children: [error.status, " ", error.data] }));
    } : _c, statusHandlers = _a.statusHandlers, _d = _a.unexpectedErrorHandler, unexpectedErrorHandler = _d === void 0 ? function (error) { return (0, jsx_runtime_1.jsx)("p", { children: (0, misc_tsx_1.getErrorMessage)(error) }); } : _d;
    var error = (0, react_1.useRouteError)();
    (0, remix_1.captureRemixErrorBoundaryError)(error);
    var params = (0, react_1.useParams)();
    if (typeof document !== 'undefined') {
        console.error(error);
    }
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "container flex items-center justify-center p-20 text-h2" }, { children: (0, react_1.isRouteErrorResponse)(error)
            ? ((_b = statusHandlers === null || statusHandlers === void 0 ? void 0 : statusHandlers[error.status]) !== null && _b !== void 0 ? _b : defaultStatusHandler)({
                error: error,
                params: params
            })
            : unexpectedErrorHandler(error) })));
}
exports.GeneralErrorBoundary = GeneralErrorBoundary;
