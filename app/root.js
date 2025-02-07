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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ErrorBoundary = exports.Layout = exports.headers = exports.meta = exports.loader = exports.links = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var node_1 = require("@remix-run/node");
var react_1 = require("@remix-run/react");
var remix_1 = require("@sentry/remix");
var react_2 = require("remix-utils/honeypot/react");
var apple_touch_icon_png_1 = __importDefault(require("./assets/favicons/apple-touch-icon.png"));
var favicon_svg_1 = __importDefault(require("./assets/favicons/favicon.svg"));
var error_boundary_tsx_1 = require("./components/error-boundary.tsx");
var hash_link_tsx_1 = require("./components/hash-link.tsx");
var progress_bar_tsx_1 = require("./components/progress-bar.tsx");
var toaster_tsx_1 = require("./components/toaster.tsx");
var icon_tsx_1 = require("./components/ui/icon.tsx");
var sonner_tsx_1 = require("./components/ui/sonner.tsx");
var theme_switch_tsx_1 = require("./routes/resources+/theme-switch.tsx");
var tailwind_css_url_1 = __importDefault(require("./styles/tailwind.css?url"));
var auth_server_ts_1 = require("./utils/auth.server.ts");
var client_hints_tsx_1 = require("./utils/client-hints.tsx");
var db_server_ts_1 = require("./utils/db.server.ts");
var env_server_ts_1 = require("./utils/env.server.ts");
var honeypot_server_ts_1 = require("./utils/honeypot.server.ts");
var misc_tsx_1 = require("./utils/misc.tsx");
var nonce_provider_ts_1 = require("./utils/nonce-provider.ts");
var theme_server_ts_1 = require("./utils/theme.server.ts");
var timing_server_ts_1 = require("./utils/timing.server.ts");
var toast_server_ts_1 = require("./utils/toast.server.ts");
var user_ts_1 = require("./utils/user.ts");
require("@mdxeditor/editor/style.css");
(0, jsx_runtime_1.jsx)("link", { rel: "preload", href: "/fonts/Inter-Regular.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" });
var links = function () {
    return [
        // Preload svg sprite as a resource to avoid render blocking
        { rel: 'preload', href: icon_tsx_1.href, as: 'image' },
        {
            rel: 'icon',
            href: '/favicon.ico',
            sizes: '48x48'
        },
        { rel: 'icon', type: 'image/svg+xml', href: favicon_svg_1["default"] },
        { rel: 'apple-touch-icon', href: apple_touch_icon_png_1["default"] },
        {
            rel: 'manifest',
            href: '/site.webmanifest',
            crossOrigin: 'use-credentials'
        },
        { rel: 'stylesheet', href: tailwind_css_url_1["default"] },
    ].filter(Boolean);
};
exports.links = links;
function loader(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var timings, userId, user, _b, _c, toast, toastHeaders, honeyProps;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    timings = (0, timing_server_ts_1.makeTimings)('root loader');
                    return [4 /*yield*/, (0, timing_server_ts_1.time)(function () { return (0, auth_server_ts_1.getUserId)(request); }, {
                            timings: timings,
                            type: 'getUserId',
                            desc: 'getUserId in root'
                        })];
                case 1:
                    userId = _d.sent();
                    if (!userId) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, timing_server_ts_1.time)(function () {
                            return db_server_ts_1.prisma.user.findUniqueOrThrow({
                                select: {
                                    id: true,
                                    name: true,
                                    username: true,
                                    image: { select: { id: true } },
                                    roles: {
                                        select: {
                                            name: true,
                                            permissions: {
                                                select: { entity: true, action: true, access: true }
                                            }
                                        }
                                    }
                                },
                                where: { id: userId }
                            });
                        }, { timings: timings, type: 'find user', desc: 'find user in root' })];
                case 2:
                    _b = _d.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _b = null;
                    _d.label = 4;
                case 4:
                    user = _b;
                    if (!(userId && !user)) return [3 /*break*/, 6];
                    console.info('something weird happened');
                    // something weird happened... The user is authenticated but we can't find
                    // them in the database. Maybe they were deleted? Let's log them out.
                    return [4 /*yield*/, (0, auth_server_ts_1.logout)({ request: request, redirectTo: '/' })];
                case 5:
                    // something weird happened... The user is authenticated but we can't find
                    // them in the database. Maybe they were deleted? Let's log them out.
                    _d.sent();
                    _d.label = 6;
                case 6: return [4 /*yield*/, (0, toast_server_ts_1.getToast)(request)];
                case 7:
                    _c = _d.sent(), toast = _c.toast, toastHeaders = _c.headers;
                    honeyProps = honeypot_server_ts_1.honeypot.getInputProps();
                    return [2 /*return*/, (0, node_1.json)({
                            user: user,
                            requestInfo: {
                                hints: (0, client_hints_tsx_1.getHints)(request),
                                origin: (0, misc_tsx_1.getDomainUrl)(request),
                                path: new URL(request.url).pathname,
                                userPrefs: {
                                    theme: (0, theme_server_ts_1.getTheme)(request)
                                }
                            },
                            ENV: (0, env_server_ts_1.getEnv)(),
                            toast: toast,
                            honeyProps: honeyProps
                        }, {
                            headers: (0, misc_tsx_1.combineHeaders)({ 'Server-Timing': timings.toString() }, toastHeaders)
                        })];
            }
        });
    });
}
exports.loader = loader;
var meta = function (_a) {
    var data = _a.data;
    var img = (data === null || data === void 0 ? void 0 : data.requestInfo.hints.theme) === 'dark'
        ? '/img/primary_inverted.png'
        : '/img/primary.png';
    return [
        { title: 'Joshua D. Graber' },
        { name: 'description', content: 'Personal website of Joshua D. Graber' },
        { property: 'og:title', content: 'Joshua D. Graber' },
        {
            property: 'og:description',
            content: 'Personal website of Joshua D. Graber'
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: img },
        { property: 'og:image:alt', content: 'Joshua D. Graber' },
        { property: 'og:url', content: 'https://joshuagraber.com' },
        { name: 'twitter:card', content: 'summary_large_image' },
        // { name: 'twitter:creator', content: '@joshuagraber' },
        // { name: 'twitter:site', content: '@joshuagraber' },
        { name: 'twitter:title', content: 'Joshua D. Graber' },
        {
            name: 'twitter:description',
            content: 'Personal website of Joshua D. Graber'
        },
        { name: 'twitter:image', content: img },
        { name: 'twitter:image:alt', content: 'Joshua D. Graber' },
        {
            name: 'color-scheme',
            content: 'dark light'
        },
    ];
};
exports.meta = meta;
var headers = function (_a) {
    var _b;
    var loaderHeaders = _a.loaderHeaders;
    var headers = {
        'Server-Timing': (_b = loaderHeaders.get('Server-Timing')) !== null && _b !== void 0 ? _b : ''
    };
    return headers;
};
exports.headers = headers;
function Document(_a) {
    var children = _a.children, nonce = _a.nonce, _b = _a.theme, theme = _b === void 0 ? 'light' : _b, _c = _a.env, env = _c === void 0 ? {} : _c;
    var allowIndexing = ENV.ALLOW_INDEXING !== 'false';
    return ((0, jsx_runtime_1.jsxs)("html", __assign({ lang: "en", className: "".concat(theme, " h-full overflow-x-hidden") }, { children: [(0, jsx_runtime_1.jsxs)("head", { children: [(0, jsx_runtime_1.jsx)(client_hints_tsx_1.ClientHintCheck, { nonce: nonce }), (0, jsx_runtime_1.jsx)(react_1.Meta, {}), (0, jsx_runtime_1.jsx)("meta", { charSet: "utf-8" }), (0, jsx_runtime_1.jsx)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }), allowIndexing ? null : ((0, jsx_runtime_1.jsx)("meta", { name: "robots", content: "noindex, nofollow" })), (0, jsx_runtime_1.jsx)(react_1.Links, {})] }), (0, jsx_runtime_1.jsxs)("body", __assign({ className: "bg-background text-foreground" }, { children: [children, (0, jsx_runtime_1.jsx)("script", { nonce: nonce, dangerouslySetInnerHTML: {
                            __html: "window.ENV = ".concat(JSON.stringify(env))
                        } }), (0, jsx_runtime_1.jsx)(react_1.ScrollRestoration, { nonce: nonce }), (0, jsx_runtime_1.jsx)(react_1.Scripts, { nonce: nonce })] }))] })));
}
function Layout(_a) {
    var children = _a.children;
    // if there was an error running the loader, data could be missing
    var data = (0, react_1.useLoaderData)();
    var nonce = (0, nonce_provider_ts_1.useNonce)();
    var theme = (0, theme_switch_tsx_1.useOptionalTheme)();
    return ((0, jsx_runtime_1.jsx)(Document, __assign({ nonce: nonce, theme: theme, env: data === null || data === void 0 ? void 0 : data.ENV }, { children: children })));
}
exports.Layout = Layout;
function App() {
    var data = (0, react_1.useLoaderData)();
    var user = (0, user_ts_1.useOptionalUser)();
    var theme = (0, theme_switch_tsx_1.useTheme)();
    (0, toaster_tsx_1.useToast)(data.toast);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex min-h-screen flex-col justify-between" }, { children: [(0, jsx_runtime_1.jsx)("header", __assign({ className: "container py-6" }, { children: (0, jsx_runtime_1.jsxs)("nav", __assign({ className: "flex flex-wrap items-center justify-between gap-4 md:gap-8" }, { children: [(0, jsx_runtime_1.jsxs)(react_1.NavLink, __assign({ className: function (_a) {
                                        var isActive = _a.isActive;
                                        return "text-body-lg no-underline focus:underline md:text-body-xl hover:underline".concat(isActive ? ' ' + 'text-secondary-foreground' : '');
                                    }, to: "/" }, { children: ["JDG", ' '] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "text-sm [&>*]:no-underline" }, { children: [(0, jsx_runtime_1.jsx)(hash_link_tsx_1.HashLink, __assign({ className: "no-underline hover:underline focus:underline md:text-body-md", activeClassName: "text-secondary-foreground", to: "/#writing" }, { children: "writing" })), ' ', "|", ' ', (0, jsx_runtime_1.jsx)(hash_link_tsx_1.HashLink, __assign({ className: "no-underline hover:underline focus:underline md:text-body-md", activeClassName: "text-secondary-foreground", to: "/#software" }, { children: "software" })), ' ', "|", ' ', (0, jsx_runtime_1.jsx)(hash_link_tsx_1.HashLink, __assign({ className: "no-underline hover:underline focus:underline md:text-body-md", activeClassName: "text-secondary-foreground", to: "/#editing" }, { children: "editing" })), ' ', "|", ' ', (0, jsx_runtime_1.jsx)(react_1.NavLink, __assign({ className: function (_a) {
                                                var isActive = _a.isActive;
                                                return (0, misc_tsx_1.cn)('no-underline hover:underline focus:underline md:text-body-md', isActive && 'text-secondary-foreground');
                                            }, to: "fragments" }, { children: "fragments" })), (user === null || user === void 0 ? void 0 : user.roles.some(function (_a) {
                                            var name = _a.name;
                                            return name === 'admin';
                                        })) && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [' ', "|", ' ', (0, jsx_runtime_1.jsx)(react_1.NavLink, __assign({ className: function (_a) {
                                                        var isActive = _a.isActive;
                                                        return (0, misc_tsx_1.cn)('no-underline hover:underline focus:underline md:text-body-md', isActive && 'text-secondary-foreground');
                                                    }, to: "/admin" }, { children: "admin" }))] }))] }))] })) })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "flex-1" }, { children: (0, jsx_runtime_1.jsx)(react_1.Outlet, {}) })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "container flex justify-between pb-5" }, { children: (0, jsx_runtime_1.jsx)(theme_switch_tsx_1.ThemeSwitch, { userPreference: data.requestInfo.userPrefs.theme }) }))] })), (0, jsx_runtime_1.jsx)(sonner_tsx_1.Toaster, { closeButton: true, position: "top-center", theme: theme }), (0, jsx_runtime_1.jsx)(progress_bar_tsx_1.Progress, {})] }));
}
function AppWithProviders() {
    var data = (0, react_1.useLoaderData)();
    return ((0, jsx_runtime_1.jsx)(react_2.HoneypotProvider, __assign({}, data.honeyProps, { children: (0, jsx_runtime_1.jsx)(App, {}) })));
}
exports["default"] = (0, remix_1.withSentry)(AppWithProviders);
// this is a last resort error boundary. There's not much useful information we
// can offer at this level.
exports.ErrorBoundary = error_boundary_tsx_1.GeneralErrorBoundary;
