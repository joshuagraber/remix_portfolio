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
exports.loader = exports.handle = exports.BreadcrumbHandle = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var invariant_1 = require("@epic-web/invariant");
var node_1 = require("@remix-run/node");
var react_1 = require("@remix-run/react");
var zod_1 = require("zod");
var spacer_tsx_1 = require("#app/components/spacer.tsx");
var icon_tsx_1 = require("#app/components/ui/icon.tsx");
var auth_server_ts_1 = require("#app/utils/auth.server.ts");
var db_server_ts_1 = require("#app/utils/db.server.ts");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var user_ts_1 = require("#app/utils/user.ts");
exports.BreadcrumbHandle = zod_1.z.object({ breadcrumb: zod_1.z.any() });
exports.handle = {
    breadcrumb: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "file-text" }, { children: "Edit Profile" })),
    getSitemapEntries: function () { return null; }
};
function loader(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var userId, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, auth_server_ts_1.requireUserId)(request)];
                case 1:
                    userId = _b.sent();
                    return [4 /*yield*/, db_server_ts_1.prisma.user.findUnique({
                            where: { id: userId },
                            select: { username: true }
                        })];
                case 2:
                    user = _b.sent();
                    (0, invariant_1.invariantResponse)(user, 'User not found', { status: 404 });
                    return [2 /*return*/, (0, node_1.json)({})];
            }
        });
    });
}
exports.loader = loader;
var BreadcrumbHandleMatch = zod_1.z.object({
    handle: exports.BreadcrumbHandle
});
function EditUserProfile() {
    var user = (0, user_ts_1.useUser)();
    var matches = (0, react_1.useMatches)();
    var breadcrumbs = matches
        .map(function (m) {
        var result = BreadcrumbHandleMatch.safeParse(m);
        if (!result.success || !result.data.handle.breadcrumb)
            return null;
        return ((0, jsx_runtime_1.jsx)(react_1.Link, __assign({ to: m.pathname, className: "flex items-center" }, { children: result.data.handle.breadcrumb }), m.id));
    })
        .filter(Boolean);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "m-auto mb-24 mt-16 max-w-3xl" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "container" }, { children: (0, jsx_runtime_1.jsxs)("ul", __assign({ className: "flex gap-3" }, { children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_1.Link, __assign({ className: "text-muted-foreground", to: "/users/".concat(user.username) }, { children: "Profile" })) }), breadcrumbs.map(function (breadcrumb, i, arr) { return ((0, jsx_runtime_1.jsxs)("li", __assign({ className: (0, misc_tsx_1.cn)('flex items-center gap-3', {
                                'text-muted-foreground': i < arr.length - 1
                            }) }, { children: ["\u25B6\uFE0F ", breadcrumb] }), i)); })] })) })), (0, jsx_runtime_1.jsx)(spacer_tsx_1.Spacer, { size: "xs" }), (0, jsx_runtime_1.jsx)("main", __assign({ className: "mx-auto bg-muted px-6 py-8 md:container md:rounded-3xl" }, { children: (0, jsx_runtime_1.jsx)(react_1.Outlet, {}) }))] })));
}
exports["default"] = EditUserProfile;
