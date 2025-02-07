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
exports.PaginationBar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@remix-run/react");
var icon_tsx_1 = require("#app/components/ui/icon.tsx");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var __util_1 = require("./__util");
var _index_1 = require("./_index");
var paginationButtonClasses = 'text-primary border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground h-8 w-8 rounded-md flex items-center justify-center no-underline cursor-pointer';
var paginationButtonDisabledClasses = 'pointer-events-none opacity-50';
function PaginationBar(_a) {
    var total = _a.total;
    var searchParams = (0, react_1.useSearchParams)()[0];
    var skip = Number(searchParams.get('skip')) || 0;
    var top = Number(searchParams.get('top')) || _index_1.POSTS_PER_PAGE;
    var totalPages = Math.ceil(total / top);
    var currentPage = Math.floor(skip / top) + 1;
    var maxPages = 3;
    var halfMaxPages = Math.floor(maxPages / 2);
    var canPageBackwardsBy = (skip - 0) / top;
    var canPageForwardsBy = total - (skip + top);
    var pages = maxPages < totalPages ? maxPages : totalPages;
    var pageNumbers = [];
    if (currentPage <= halfMaxPages) {
        for (var i = 1; i <= pages; i++) {
            pageNumbers.push(i);
        }
    }
    else if (currentPage >= totalPages - halfMaxPages) {
        for (var i = totalPages - pages + 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    }
    else {
        for (var i = currentPage - halfMaxPages; i <= currentPage + halfMaxPages; i++) {
            pageNumbers.push(i);
        }
    }
    if (total < top)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "mx-auto flex items-center gap-1" }, { children: [(0, jsx_runtime_1.jsxs)(react_1.Link, __assign({ to: {
                    search: (0, __util_1.setSearchParamsString)(searchParams, {
                        skip: 0
                    })
                }, preventScrollReset: true, prefetch: "intent", className: (0, misc_tsx_1.cn)(paginationButtonClasses, canPageBackwardsBy < 2 && paginationButtonDisabledClasses) }, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ className: "sr-only" }, { children: " First page" })), (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "double-arrow-left" })] })), (0, jsx_runtime_1.jsxs)(react_1.Link, __assign({ to: {
                    search: (0, __util_1.setSearchParamsString)(searchParams, {
                        skip: Math.max(skip - top, 0)
                    })
                }, preventScrollReset: true, prefetch: "intent", className: (0, misc_tsx_1.cn)(paginationButtonClasses, canPageBackwardsBy < 1 && paginationButtonDisabledClasses) }, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ className: "sr-only" }, { children: " Previous page" })), (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "arrow-left" })] })), pageNumbers.map(function (pageNumber) {
                var pageSkip = (pageNumber - 1) * top;
                var isCurrentPage = pageNumber === currentPage;
                if (isCurrentPage) {
                    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "flex h-8 w-8 items-center justify-center rounded-md border border-input bg-primary text-primary-foreground" }, { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("span", __assign({ className: "sr-only" }, { children: ["Page ", pageNumber] })), (0, jsx_runtime_1.jsx)("span", { children: pageNumber })] }) }), "".concat(pageNumber, "-active")));
                }
                else {
                    return ((0, jsx_runtime_1.jsx)(react_1.Link, __assign({ to: {
                            search: (0, __util_1.setSearchParamsString)(searchParams, {
                                skip: pageSkip
                            })
                        }, preventScrollReset: true, prefetch: "intent", className: paginationButtonClasses }, { children: pageNumber }), pageNumber));
                }
            }), (0, jsx_runtime_1.jsxs)(react_1.Link, __assign({ to: {
                    search: (0, __util_1.setSearchParamsString)(searchParams, {
                        skip: skip + top
                    })
                }, preventScrollReset: true, prefetch: "intent", className: (0, misc_tsx_1.cn)(paginationButtonClasses, canPageForwardsBy < 1 && paginationButtonDisabledClasses) }, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ className: "sr-only" }, { children: " Next page" })), (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "arrow-right" })] })), (0, jsx_runtime_1.jsxs)(react_1.Link, __assign({ to: {
                    search: (0, __util_1.setSearchParamsString)(searchParams, {
                        skip: (totalPages - 1) * top
                    })
                }, preventScrollReset: true, prefetch: "intent", className: (0, misc_tsx_1.cn)(paginationButtonClasses, canPageForwardsBy < 2 && paginationButtonDisabledClasses) }, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ className: "sr-only" }, { children: " Last page" })), (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "double-arrow-right" })] }))] })));
}
exports.PaginationBar = PaginationBar;
