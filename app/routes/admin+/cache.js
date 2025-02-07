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
exports.ErrorBoundary = exports.action = exports.loader = exports.handle = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var invariant_1 = require("@epic-web/invariant");
var node_1 = require("@remix-run/node");
var react_1 = require("@remix-run/react");
var error_boundary_1 = require("#app/components/error-boundary");
var forms_tsx_1 = require("#app/components/forms.tsx");
var spacer_tsx_1 = require("#app/components/spacer.tsx");
var button_tsx_1 = require("#app/components/ui/button.tsx");
var cache_server_ts_1 = require("#app/utils/cache.server.ts");
var litefs_server_ts_1 = require("#app/utils/litefs.server.ts");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var permissions_server_ts_1 = require("#app/utils/permissions.server.ts");
exports.handle = {
    getSitemapEntries: function () { return null; }
};
function loader(_a) {
    var _b, _c;
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var searchParams, query, limit, currentInstanceInfo, instance, instances, cacheKeys;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, (0, permissions_server_ts_1.requireUserWithRole)(request, 'admin')];
                case 1:
                    _d.sent();
                    searchParams = new URL(request.url).searchParams;
                    query = searchParams.get('query');
                    if (query === '') {
                        searchParams["delete"]('query');
                        return [2 /*return*/, (0, node_1.redirect)("/admin/cache?".concat(searchParams.toString()))];
                    }
                    limit = Number((_b = searchParams.get('limit')) !== null && _b !== void 0 ? _b : 100);
                    return [4 /*yield*/, (0, litefs_server_ts_1.getInstanceInfo)()];
                case 2:
                    currentInstanceInfo = _d.sent();
                    instance = (_c = searchParams.get('instance')) !== null && _c !== void 0 ? _c : currentInstanceInfo.currentInstance;
                    return [4 /*yield*/, (0, litefs_server_ts_1.getAllInstances)()];
                case 3:
                    instances = _d.sent();
                    return [4 /*yield*/, (0, litefs_server_ts_1.ensureInstance)(instance)];
                case 4:
                    _d.sent();
                    if (!(typeof query === 'string')) return [3 /*break*/, 6];
                    return [4 /*yield*/, (0, cache_server_ts_1.searchCacheKeys)(query, limit)];
                case 5:
                    cacheKeys = _d.sent();
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, (0, cache_server_ts_1.getAllCacheKeys)(limit)];
                case 7:
                    cacheKeys = _d.sent();
                    _d.label = 8;
                case 8: return [2 /*return*/, (0, node_1.json)({ cacheKeys: cacheKeys, instance: instance, instances: instances, currentInstanceInfo: currentInstanceInfo })];
            }
        });
    });
}
exports.loader = loader;
function action(_a) {
    var _b;
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var formData, key, currentInstance, instance, type, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, (0, permissions_server_ts_1.requireUserWithRole)(request, 'admin')];
                case 1:
                    _d.sent();
                    return [4 /*yield*/, request.formData()];
                case 2:
                    formData = _d.sent();
                    key = formData.get('cacheKey');
                    return [4 /*yield*/, (0, litefs_server_ts_1.getInstanceInfo)()];
                case 3:
                    currentInstance = (_d.sent()).currentInstance;
                    instance = (_b = formData.get('instance')) !== null && _b !== void 0 ? _b : currentInstance;
                    type = formData.get('type');
                    (0, invariant_1.invariantResponse)(typeof key === 'string', 'cacheKey must be a string');
                    (0, invariant_1.invariantResponse)(typeof type === 'string', 'type must be a string');
                    (0, invariant_1.invariantResponse)(typeof instance === 'string', 'instance must be a string');
                    return [4 /*yield*/, (0, litefs_server_ts_1.ensureInstance)(instance)];
                case 4:
                    _d.sent();
                    _c = type;
                    switch (_c) {
                        case 'sqlite': return [3 /*break*/, 5];
                        case 'lru': return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 8];
                case 5: return [4 /*yield*/, cache_server_ts_1.cache["delete"](key)];
                case 6:
                    _d.sent();
                    return [3 /*break*/, 9];
                case 7:
                    {
                        cache_server_ts_1.lruCache["delete"](key);
                        return [3 /*break*/, 9];
                    }
                    _d.label = 8;
                case 8:
                    {
                        throw new Error("Unknown cache type: ".concat(type));
                    }
                    _d.label = 9;
                case 9: return [2 /*return*/, (0, node_1.json)({ success: true })];
            }
        });
    });
}
exports.action = action;
function CacheAdminRoute() {
    var _a, _b, _c;
    var data = (0, react_1.useLoaderData)();
    var searchParams = (0, react_1.useSearchParams)()[0];
    var submit = (0, react_1.useSubmit)();
    var query = (_a = searchParams.get('query')) !== null && _a !== void 0 ? _a : '';
    var limit = (_b = searchParams.get('limit')) !== null && _b !== void 0 ? _b : '100';
    var instance = (_c = searchParams.get('instance')) !== null && _c !== void 0 ? _c : data.instance;
    var handleFormChange = (0, misc_tsx_1.useDebounce)(function (form) {
        submit(form);
    }, 400);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "container" }, { children: [(0, jsx_runtime_1.jsx)("h1", __assign({ className: "text-h1" }, { children: "Cache Admin" })), (0, jsx_runtime_1.jsx)(spacer_tsx_1.Spacer, { size: "2xs" }), (0, jsx_runtime_1.jsxs)(react_1.Form, __assign({ method: "get", className: "flex flex-col gap-4", onChange: function (e) { return handleFormChange(e.currentTarget); } }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "flex-1" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-1 gap-4" }, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ type: "submit", className: "flex h-16 items-center justify-center" }, { children: "\uD83D\uDD0E" })), (0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { className: "flex-1", labelProps: { children: 'Search' }, inputProps: {
                                        type: 'search',
                                        name: 'query',
                                        defaultValue: query
                                    } }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "flex h-16 w-14 items-center text-lg font-medium text-muted-foreground" }, { children: (0, jsx_runtime_1.jsx)("span", __assign({ title: "Total results shown" }, { children: data.cacheKeys.sqlite.length + data.cacheKeys.lru.length })) }))] })) })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-wrap items-center gap-4" }, { children: [(0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { labelProps: {
                                    children: 'Limit'
                                }, inputProps: {
                                    name: 'limit',
                                    defaultValue: limit,
                                    type: 'number',
                                    step: '1',
                                    min: '1',
                                    max: '10000',
                                    placeholder: 'results limit'
                                } }), (0, jsx_runtime_1.jsx)("select", __assign({ name: "instance", defaultValue: instance }, { children: Object.entries(data.instances).map(function (_a) {
                                    var inst = _a[0], region = _a[1];
                                    return ((0, jsx_runtime_1.jsx)("option", __assign({ value: inst }, { children: [
                                            inst,
                                            "(".concat(region, ")"),
                                            inst === data.currentInstanceInfo.currentInstance
                                                ? '(current)'
                                                : '',
                                            inst === data.currentInstanceInfo.primaryInstance
                                                ? ' (primary)'
                                                : '',
                                        ]
                                            .filter(Boolean)
                                            .join(' ') }), inst));
                                }) }))] }))] })), (0, jsx_runtime_1.jsx)(spacer_tsx_1.Spacer, { size: "2xs" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col gap-4" }, { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ className: "text-h2" }, { children: "LRU Cache:" })), data.cacheKeys.lru.map(function (key) { return ((0, jsx_runtime_1.jsx)(CacheKeyRow, { cacheKey: key, instance: instance, type: "lru" }, key)); })] })), (0, jsx_runtime_1.jsx)(spacer_tsx_1.Spacer, { size: "3xs" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col gap-4" }, { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ className: "text-h2" }, { children: "SQLite Cache:" })), data.cacheKeys.sqlite.map(function (key) { return ((0, jsx_runtime_1.jsx)(CacheKeyRow, { cacheKey: key, instance: instance, type: "sqlite" }, key)); })] }))] })));
}
exports["default"] = CacheAdminRoute;
function CacheKeyRow(_a) {
    var cacheKey = _a.cacheKey, instance = _a.instance, type = _a.type;
    var fetcher = (0, react_1.useFetcher)();
    var dc = (0, misc_tsx_1.useDoubleCheck)();
    var encodedKey = encodeURIComponent(cacheKey);
    var valuePage = "/admin/cache/".concat(type, "/").concat(encodedKey, "?instance=").concat(instance);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center gap-2 font-mono" }, { children: [(0, jsx_runtime_1.jsxs)(fetcher.Form, __assign({ method: "POST" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "hidden", name: "cacheKey", value: cacheKey }), (0, jsx_runtime_1.jsx)("input", { type: "hidden", name: "instance", value: instance }), (0, jsx_runtime_1.jsx)("input", { type: "hidden", name: "type", value: type }), (0, jsx_runtime_1.jsx)(button_tsx_1.Button, __assign({ size: "sm", variant: "secondary" }, dc.getButtonProps({ type: 'submit' }), { children: fetcher.state === 'idle'
                            ? dc.doubleCheck
                                ? 'You sure?'
                                : 'Delete'
                            : 'Deleting...' }))] })), (0, jsx_runtime_1.jsx)(react_1.Link, __assign({ reloadDocument: true, to: valuePage }, { children: cacheKey }))] })));
}
function ErrorBoundary() {
    return ((0, jsx_runtime_1.jsx)(error_boundary_1.GeneralErrorBoundary, { statusHandlers: {
            403: function (_a) {
                var error = _a.error;
                return ((0, jsx_runtime_1.jsxs)("p", { children: ["You are not allowed to do that: ", error === null || error === void 0 ? void 0 : error.data.message] }));
            }
        } }));
}
exports.ErrorBoundary = ErrorBoundary;
