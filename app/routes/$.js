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
exports.__esModule = true;
exports.ErrorBoundary = exports.loader = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
// This is called a "splat route" and as it's in the root `/app/routes/`
// directory, it's a catchall. If no other routes match, this one will and we
// can know that the user is hitting a URL that doesn't exist. By throwing a
// 404 from the loader, we can force the error boundary to render which will
// ensure the user gets the right status code and we can display a nicer error
// message for them than the Remix and/or browser default.
var react_1 = require("@remix-run/react");
var error_boundary_tsx_1 = require("#app/components/error-boundary.tsx");
var icon_tsx_1 = require("#app/components/ui/icon.tsx");
function loader() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            throw new Response('Not found', { status: 404 });
        });
    });
}
exports.loader = loader;
function NotFound() {
    // due to the loader, this component will never be rendered, but we'll return
    // the error boundary just in case.
    return (0, jsx_runtime_1.jsx)(ErrorBoundary, {});
}
exports["default"] = NotFound;
function ErrorBoundary() {
    var location = (0, react_1.useLocation)();
    return ((0, jsx_runtime_1.jsx)(error_boundary_tsx_1.GeneralErrorBoundary, { statusHandlers: {
            404: function () { return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col gap-6" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col gap-3" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "We can't find this page:" }), (0, jsx_runtime_1.jsx)("pre", __assign({ className: "whitespace-pre-wrap break-all text-body-lg" }, { children: location.pathname }))] })), (0, jsx_runtime_1.jsx)(react_1.Link, __assign({ to: "/", className: "text-body-md underline" }, { children: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "arrow-left" }, { children: "Back to home" })) }))] }))); }
        } }));
}
exports.ErrorBoundary = ErrorBoundary;
