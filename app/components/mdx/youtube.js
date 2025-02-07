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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.YouTubeEmbed = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var icon_1 = require("../ui/icon");
var YouTubeEmbed = function (_a) {
    var id = _a.id;
    var _b = react_1["default"].useState(true), isLoading = _b[0], setIsLoading = _b[1];
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative my-2 aspect-video md:my-4" }, { children: [isLoading && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "absolute inset-0 flex items-center justify-center bg-secondary dark:bg-primary-foreground" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex animate-pulse space-x-4" }, { children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { className: "h-16 w-16 text-secondary-foreground dark:text-primary", name: "dots-horizontal" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex-1 space-y-4 py-1" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-3/4 rounded bg-gray-300" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "space-y-2" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 rounded bg-gray-300" }), (0, jsx_runtime_1.jsx)("div", { className: "h-4 w-5/6 rounded bg-gray-300" })] }))] }))] })) }))), (0, jsx_runtime_1.jsx)("iframe", { className: "aspect-video w-full", src: "https://www.youtube.com/embed/".concat(id), title: "YouTube video player", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, onLoad: function () { return setIsLoading(false); } })] })));
};
exports.YouTubeEmbed = YouTubeEmbed;
