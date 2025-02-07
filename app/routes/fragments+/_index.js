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
exports.loader = exports.meta = exports.handle = exports.POSTS_PER_PAGE = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var node_1 = require("@remix-run/node");
var react_1 = require("@remix-run/react");
var client_1 = require("mdx-bundler/client");
var react_2 = require("react");
var macros_1 = require("vite-env-only/macros");
var index_tsx_1 = require("#app/components/mdx/index.tsx");
var db_server_1 = require("#app/utils/db.server");
var mdx_server_1 = require("#app/utils/mdx.server");
var __pagination_bar_1 = require("./__pagination-bar");
var __time_1 = require("./__time");
exports.POSTS_PER_PAGE = 5;
exports.handle = {
    getSitemapEntries: (0, macros_1.serverOnly$)(function (request) { return __awaiter(void 0, void 0, void 0, function () {
        var fragments;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_server_1.prisma.post.findMany()];
                case 1:
                    fragments = _a.sent();
                    return [2 /*return*/, fragments.map(function (post) {
                            return { route: "/fragments/".concat(post.slug), priority: 0.7 };
                        })];
            }
        });
    }); })
};
var meta = function () {
    return [
        { title: 'Fragments | Joshua D. Graber' },
        {
            name: 'description',
            content: 'Collection of code fragments and short posts'
        },
        { property: 'og:title', content: 'Fragments | Joshua D. Graber' },
        {
            property: 'og:description',
            content: 'Collection of code fragments and short posts'
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/img/primary.png' },
        { property: 'og:url', content: 'https://joshuagraber.com/fragments' },
    ];
};
exports.meta = meta;
function loader(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var url, top, skip, _b, posts, totalPosts, postsWithMDX;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    url = new URL(request.url);
                    top = Number(url.searchParams.get('top')) || exports.POSTS_PER_PAGE;
                    skip = Number(url.searchParams.get('skip')) || 0;
                    return [4 /*yield*/, Promise.all([
                            db_server_1.prisma.post.findMany({
                                where: { publishAt: { not: null } },
                                select: {
                                    id: true,
                                    title: true,
                                    slug: true,
                                    content: true,
                                    description: true,
                                    createdAt: true,
                                    publishAt: true
                                },
                                orderBy: { publishAt: 'desc' },
                                take: top,
                                skip: skip
                            }),
                            db_server_1.prisma.post.count({
                                where: { publishAt: { not: null } }
                            }),
                        ])
                        // Bundle MDX for each post
                    ];
                case 1:
                    _b = _c.sent(), posts = _b[0], totalPosts = _b[1];
                    return [4 /*yield*/, Promise.all(posts.map(function (post) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, code, frontmatter;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, (0, mdx_server_1.compileMDX)(post.content)];
                                    case 1:
                                        _a = _b.sent(), code = _a.code, frontmatter = _a.frontmatter;
                                        return [2 /*return*/, __assign(__assign({}, post), { code: code, frontmatter: frontmatter })];
                                }
                            });
                        }); }))];
                case 2:
                    postsWithMDX = _c.sent();
                    return [2 /*return*/, (0, node_1.json)({
                            posts: postsWithMDX,
                            total: totalPosts
                        })];
            }
        });
    });
}
exports.loader = loader;
function PostContent(_a) {
    var code = _a.code;
    // Move this to useMemo to prevent recreating the component on every render
    var Component = (0, react_2.useMemo)(function () { return (0, client_1.getMDXComponent)(code); }, [code]);
    return (0, jsx_runtime_1.jsx)(Component, { components: index_tsx_1.mdxComponents });
}
function Fragments() {
    var _a = (0, react_1.useLoaderData)(), posts = _a.posts, total = _a.total;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "jdg_typography mx-auto w-full max-w-screen-md p-8" }, { children: [(0, jsx_runtime_1.jsx)("h1", __assign({ className: "mb-4 font-bold" }, { children: "Fragments" })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col gap-6" }, { children: [posts.map(function (post) { return ((0, jsx_runtime_1.jsxs)("article", __assign({ className: "max-w-none" }, { children: [(0, jsx_runtime_1.jsxs)(react_1.Link, __assign({ to: post.slug, className: "text-primary no-underline" }, { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ className: "text-primary" }, { children: post.title })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "mb-2 text-muted-foreground" }, { children: post.description }))] })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-sm text-neutral-500" }, { children: (0, jsx_runtime_1.jsx)(__time_1.Time, { time: post.publishAt }) })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "mb-4" }, { children: (0, jsx_runtime_1.jsx)(PostContent, { code: post.code }) }))] }), post.id)); }), (0, jsx_runtime_1.jsx)(__pagination_bar_1.PaginationBar, { total: total })] }))] })));
}
exports["default"] = Fragments;
