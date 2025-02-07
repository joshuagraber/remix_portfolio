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
exports.LinkPreview = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@remix-run/react");
var react_2 = require("react");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var icon_1 = require("./ui/icon");
function LinkPreview(_a) {
    var url = _a.url, className = _a.className;
    var previewFetcher = (0, react_1.useFetcher)();
    // Track separate state to prevent image flicker
    var _b = (0, react_2.useState)(false), isImageLoaded = _b[0], setIsImageLoaded = _b[1];
    (0, react_2.useEffect)(function () {
        if (previewFetcher.state === 'idle' && !previewFetcher.data) {
            previewFetcher.load("/resources/link-preview?url=".concat(encodeURIComponent(url)));
        }
    }, [url, previewFetcher]);
    var isLoading = previewFetcher.state === 'loading' ||
        previewFetcher.state === 'submitting' ||
        !isImageLoaded;
    var previewData = previewFetcher.data;
    return ((0, jsx_runtime_1.jsxs)("a", __assign({ href: url, target: "_blank", rel: "noopener noreferrer", className: (0, misc_tsx_1.cn)('group my-2 block cursor-pointer overflow-hidden rounded-md border border-primary no-underline transition-shadow focus:border-secondary-foreground', className, isLoading && 'h-80 sm:h-44') }, { children: [isLoading && ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex h-full w-full animate-pulse items-center justify-center bg-secondary p-4 dark:bg-secondary/30" }, { children: [' ', (0, jsx_runtime_1.jsx)(icon_1.Icon, { className: "h-16 w-16 text-secondary-foreground dark:text-primary", name: "dots-horizontal" })] }))), previewData && ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col sm:flex-row" }, { children: [previewData.image && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "h-44 flex-shrink-0 sm:h-44 sm:w-44" }, { children: (0, jsx_runtime_1.jsx)("img", { src: previewData.image, alt: previewData.title || '', className: "h-full w-full object-cover opacity-60 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100", onLoad: function () { return setIsImageLoaded(true); } }) }))), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "p-4" }, { children: [previewData.domain && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "text-sm text-muted-foreground" }, { children: previewData.domain }))), previewData.title && ((0, jsx_runtime_1.jsx)("h4", __assign({ className: "mt-2 text-xl font-semibold text-foreground" }, { children: previewData.title }))), previewData.description && ((0, jsx_runtime_1.jsx)("p", __assign({ className: "mt-2 line-clamp-2 text-body-sm text-muted-foreground" }, { children: previewData.description })))] }))] })))] })));
}
exports.LinkPreview = LinkPreview;
