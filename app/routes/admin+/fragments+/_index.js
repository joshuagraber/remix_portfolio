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
exports.loader = exports.handle = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var node_1 = require("@remix-run/node");
var react_1 = require("@remix-run/react");
var button_tsx_1 = require("#app/components/ui/button.tsx");
var auth_server_1 = require("#app/utils/auth.server");
var db_server_1 = require("#app/utils/db.server");
var mdx_ts_1 = require("#app/utils/mdx.ts");
var __deleters_1 = require("./__deleters");
var __image_manager_1 = require("./__image-manager");
exports.handle = {
    getSitemapEntries: function () { return null; }
};
function loader(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var _b, posts, images;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, auth_server_1.requireUserId)(request)];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, Promise.all([
                            db_server_1.prisma.post.findMany({
                                select: {
                                    id: true,
                                    title: true,
                                    slug: true,
                                    publishAt: true,
                                    createdAt: true,
                                    updatedAt: true
                                },
                                orderBy: { createdAt: 'desc' }
                            }),
                            db_server_1.prisma.postImage.findMany({
                                select: {
                                    id: true,
                                    altText: true,
                                    title: true
                                },
                                orderBy: { createdAt: 'desc' }
                            }),
                        ])];
                case 2:
                    _b = _c.sent(), posts = _b[0], images = _b[1];
                    return [2 /*return*/, (0, node_1.json)({ posts: posts, images: images })];
            }
        });
    });
}
exports.loader = loader;
function AdminPosts() {
    var _a = (0, react_1.useLoaderData)(), posts = _a.posts, images = _a.images;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "p-8" }, { children: [(0, jsx_runtime_1.jsx)("h1", __assign({ className: "font-bold" }, { children: "Manage Posts and Images" })), (0, jsx_runtime_1.jsx)(react_1.Link, __assign({ to: "/fragments" }, { children: "View fragments" })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "mb-6 flex flex-wrap items-center justify-between" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Manage posts" }), (0, jsx_runtime_1.jsx)(react_1.Link, __assign({ to: "create", className: "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" }, { children: "New Post" }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "space-y-4" }, { children: [(0, jsx_runtime_1.jsx)(react_1.Outlet, {}), (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: posts.map(function (post) { return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col items-start justify-between gap-4 rounded-lg border p-4 md:flex-row md:items-center md:gap-0" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ className: "text-xl font-semibold" }, { children: post.title })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex gap-2 text-sm text-muted-foreground" }, { children: [(0, jsx_runtime_1.jsxs)("span", { children: ["Created ", (0, mdx_ts_1.formatDateStringForPostDefault)(post.createdAt)] }), (0, jsx_runtime_1.jsx)("span", { children: "\u2022" }), (0, jsx_runtime_1.jsx)("span", { children: post.publishAt
                                                        ? "Published ".concat((0, mdx_ts_1.formatDateStringForPostDefault)(post.publishAt))
                                                        : 'Draft' }), (0, jsx_runtime_1.jsx)("span", { children: "\u2022" }), (0, jsx_runtime_1.jsx)(react_1.Link, __assign({ to: "/fragments/".concat(post.slug) }, { children: "View post" }))] }))] }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center gap-2" }, { children: [(0, jsx_runtime_1.jsx)(button_tsx_1.Button, __assign({ variant: "default" }, { children: (0, jsx_runtime_1.jsx)(react_1.Link, __assign({ className: "text-primary-foreground no-underline hover:text-primary-foreground", to: "edit/".concat(post.id) }, { children: "Edit" })) })), (0, jsx_runtime_1.jsx)(__deleters_1.DeletePost, { postId: post.id })] }))] }), post.id)); }) })] })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Manage post images" }), (0, jsx_runtime_1.jsx)(__image_manager_1.PostImageManager, { images: images })] })] })));
}
exports["default"] = AdminPosts;
