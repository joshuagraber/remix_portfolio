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
exports.action = exports.headers = exports.loader = exports.handle = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var invariant_1 = require("@epic-web/invariant");
var node_1 = require("@remix-run/node");
var react_1 = require("@remix-run/react");
var react_2 = require("react");
var icon_tsx_1 = require("#app/components/ui/icon.tsx");
var status_button_tsx_1 = require("#app/components/ui/status-button.tsx");
var tooltip_tsx_1 = require("#app/components/ui/tooltip.tsx");
var auth_server_ts_1 = require("#app/utils/auth.server.ts");
var connections_server_ts_1 = require("#app/utils/connections.server.ts");
var connections_tsx_1 = require("#app/utils/connections.tsx");
var db_server_ts_1 = require("#app/utils/db.server.ts");
var timing_server_ts_1 = require("#app/utils/timing.server.ts");
var toast_server_ts_1 = require("#app/utils/toast.server.ts");
exports.handle = {
    breadcrumb: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "link-2" }, { children: "Connections" })),
    getSitemapEntries: function () { return null; }
};
function userCanDeleteConnections(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_server_ts_1.prisma.user.findUnique({
                        select: {
                            password: { select: { userId: true } },
                            _count: { select: { connections: true } }
                        },
                        where: { id: userId }
                    })
                    // user can delete their connections if they have a password
                ];
                case 1:
                    user = _a.sent();
                    // user can delete their connections if they have a password
                    if (user === null || user === void 0 ? void 0 : user.password)
                        return [2 /*return*/, true
                            // users have to have more than one remaining connection to delete one
                        ];
                    // users have to have more than one remaining connection to delete one
                    return [2 /*return*/, Boolean((user === null || user === void 0 ? void 0 : user._count.connections) && (user === null || user === void 0 ? void 0 : user._count.connections) > 1)];
            }
        });
    });
}
function loader(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var userId, timings, rawConnections, connections, _i, rawConnections_1, connection, r, providerName, connectionData, _b;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, (0, auth_server_ts_1.requireUserId)(request)];
                case 1:
                    userId = _d.sent();
                    timings = (0, timing_server_ts_1.makeTimings)('profile connections loader');
                    return [4 /*yield*/, db_server_ts_1.prisma.connection.findMany({
                            select: { id: true, providerName: true, providerId: true, createdAt: true },
                            where: { userId: userId }
                        })];
                case 2:
                    rawConnections = _d.sent();
                    connections = [];
                    _i = 0, rawConnections_1 = rawConnections;
                    _d.label = 3;
                case 3:
                    if (!(_i < rawConnections_1.length)) return [3 /*break*/, 6];
                    connection = rawConnections_1[_i];
                    r = connections_tsx_1.ProviderNameSchema.safeParse(connection.providerName);
                    if (!r.success)
                        return [3 /*break*/, 5];
                    providerName = r.data;
                    return [4 /*yield*/, (0, connections_server_ts_1.resolveConnectionData)(providerName, connection.providerId, { timings: timings })];
                case 4:
                    connectionData = _d.sent();
                    connections.push(__assign(__assign({}, connectionData), { providerName: providerName, id: connection.id, createdAtFormatted: connection.createdAt.toLocaleString() }));
                    _d.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    _b = node_1.json;
                    _c = {
                        connections: connections
                    };
                    return [4 /*yield*/, userCanDeleteConnections(userId)];
                case 7: return [2 /*return*/, _b.apply(void 0, [(_c.canDeleteConnections = _d.sent(),
                            _c), { headers: { 'Server-Timing': timings.toString() } }])];
            }
        });
    });
}
exports.loader = loader;
var headers = function (_a) {
    var _b;
    var loaderHeaders = _a.loaderHeaders;
    var headers = {
        'Server-Timing': (_b = loaderHeaders.get('Server-Timing')) !== null && _b !== void 0 ? _b : ''
    };
    return headers;
};
exports.headers = headers;
function action(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var userId, formData, _b, connectionId, toastHeaders;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, auth_server_ts_1.requireUserId)(request)];
                case 1:
                    userId = _c.sent();
                    return [4 /*yield*/, request.formData()];
                case 2:
                    formData = _c.sent();
                    (0, invariant_1.invariantResponse)(formData.get('intent') === 'delete-connection', 'Invalid intent');
                    _b = invariant_1.invariantResponse;
                    return [4 /*yield*/, userCanDeleteConnections(userId)];
                case 3:
                    _b.apply(void 0, [_c.sent(), 'You cannot delete your last connection unless you have a password.']);
                    connectionId = formData.get('connectionId');
                    (0, invariant_1.invariantResponse)(typeof connectionId === 'string', 'Invalid connectionId');
                    return [4 /*yield*/, db_server_ts_1.prisma.connection["delete"]({
                            where: {
                                id: connectionId,
                                userId: userId
                            }
                        })];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, (0, toast_server_ts_1.createToastHeaders)({
                            title: 'Deleted',
                            description: 'Your connection has been deleted.'
                        })];
                case 5:
                    toastHeaders = _c.sent();
                    return [2 /*return*/, (0, node_1.json)({ status: 'success' }, { headers: toastHeaders })];
            }
        });
    });
}
exports.action = action;
function Connections() {
    var data = (0, react_1.useLoaderData)();
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "mx-auto max-w-md" }, { children: [data.connections.length ? ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col gap-2" }, { children: [(0, jsx_runtime_1.jsx)("p", { children: "Here are your current connections:" }), (0, jsx_runtime_1.jsx)("ul", __assign({ className: "flex flex-col gap-4" }, { children: data.connections.map(function (c) { return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(Connection, { connection: c, canDelete: data.canDeleteConnections }) }, c.id)); }) }))] }))) : ((0, jsx_runtime_1.jsx)("p", { children: "You don't have any connections yet." })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "mt-5 flex flex-col gap-5 border-b-2 border-t-2 border-border py-3" }, { children: connections_tsx_1.providerNames.map(function (providerName) { return ((0, jsx_runtime_1.jsx)(connections_tsx_1.ProviderConnectionForm, { type: "Connect", providerName: providerName }, providerName)); }) }))] })));
}
exports["default"] = Connections;
function Connection(_a) {
    var _b, _c;
    var connection = _a.connection, canDelete = _a.canDelete;
    var deleteFetcher = (0, react_1.useFetcher)();
    var _d = (0, react_2.useState)(false), infoOpen = _d[0], setInfoOpen = _d[1];
    var icon = connections_tsx_1.providerIcons[connection.providerName];
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex justify-between gap-2" }, { children: [(0, jsx_runtime_1.jsxs)("span", __assign({ className: "inline-flex items-center gap-1.5" }, { children: [icon, (0, jsx_runtime_1.jsxs)("span", { children: [connection.link ? ((0, jsx_runtime_1.jsx)("a", __assign({ href: connection.link, className: "underline" }, { children: connection.displayName }))) : (connection.displayName), ' ', "(", connection.createdAtFormatted, ")"] })] })), canDelete ? ((0, jsx_runtime_1.jsxs)(deleteFetcher.Form, __assign({ method: "POST" }, { children: [(0, jsx_runtime_1.jsx)("input", { name: "connectionId", value: connection.id, type: "hidden" }), (0, jsx_runtime_1.jsx)(tooltip_tsx_1.TooltipProvider, { children: (0, jsx_runtime_1.jsxs)(tooltip_tsx_1.Tooltip, { children: [(0, jsx_runtime_1.jsx)(tooltip_tsx_1.TooltipTrigger, __assign({ asChild: true }, { children: (0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({ name: "intent", value: "delete-connection", variant: "destructive", size: "sm", status: deleteFetcher.state !== 'idle'
                                            ? 'pending'
                                            : ((_c = (_b = deleteFetcher.data) === null || _b === void 0 ? void 0 : _b.status) !== null && _c !== void 0 ? _c : 'idle') }, { children: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "cross-1" }) })) })), (0, jsx_runtime_1.jsx)(tooltip_tsx_1.TooltipContent, { children: "Disconnect this account" })] }) })] }))) : ((0, jsx_runtime_1.jsx)(tooltip_tsx_1.TooltipProvider, { children: (0, jsx_runtime_1.jsxs)(tooltip_tsx_1.Tooltip, __assign({ open: infoOpen, onOpenChange: setInfoOpen }, { children: [(0, jsx_runtime_1.jsx)(tooltip_tsx_1.TooltipTrigger, __assign({ onClick: function () { return setInfoOpen(true); } }, { children: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "question-mark-circled" }) })), (0, jsx_runtime_1.jsx)(tooltip_tsx_1.TooltipContent, { children: "You cannot delete your last connection unless you have a password." })] })) }))] })));
}
