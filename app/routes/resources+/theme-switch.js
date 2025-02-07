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
exports.useOptionalTheme = exports.useTheme = exports.useOptimisticThemeMode = exports.ThemeSwitch = exports.action = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@conform-to/react");
var zod_1 = require("@conform-to/zod");
var invariant_1 = require("@epic-web/invariant");
var node_1 = require("@remix-run/node");
var react_2 = require("@remix-run/react");
var react_3 = require("react");
var server_only_1 = require("remix-utils/server-only");
var zod_2 = require("zod");
var dropdown_menu_tsx_1 = require("#app/components/ui/dropdown-menu.tsx");
var icon_tsx_1 = require("#app/components/ui/icon.tsx");
var client_hints_tsx_1 = require("#app/utils/client-hints.tsx");
var request_info_ts_1 = require("#app/utils/request-info.ts");
var theme_server_ts_1 = require("#app/utils/theme.server.ts");
var ThemeFormSchema = zod_2.z.object({
    theme: zod_2.z["enum"](['system', 'light', 'dark']),
    // this is useful for progressive enhancement
    redirectTo: zod_2.z.string().optional()
});
function action(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var formData, submission, _b, theme, redirectTo, responseInit;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, request.formData()];
                case 1:
                    formData = _c.sent();
                    submission = (0, zod_1.parseWithZod)(formData, {
                        schema: ThemeFormSchema
                    });
                    (0, invariant_1.invariantResponse)(submission.status === 'success', 'Invalid theme received');
                    _b = submission.value, theme = _b.theme, redirectTo = _b.redirectTo;
                    responseInit = {
                        headers: { 'set-cookie': (0, theme_server_ts_1.setTheme)(theme) }
                    };
                    if (redirectTo) {
                        return [2 /*return*/, (0, react_2.redirect)(redirectTo, responseInit)];
                    }
                    else {
                        return [2 /*return*/, (0, node_1.json)({ result: submission.reply() }, responseInit)];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.action = action;
function ThemeSwitch(_a) {
    var _b, _c;
    var userPreference = _a.userPreference;
    var fetcher = (0, react_2.useFetcher)();
    var requestInfo = (0, request_info_ts_1.useRequestInfo)();
    var hints = (0, client_hints_tsx_1.useHints)();
    var form = (0, react_1.useForm)({
        id: 'theme-switch',
        lastResult: (_b = fetcher.data) === null || _b === void 0 ? void 0 : _b.result
    })[0];
    var optimisticMode = useOptimisticThemeMode();
    var mode = (_c = optimisticMode !== null && optimisticMode !== void 0 ? optimisticMode : userPreference) !== null && _c !== void 0 ? _c : 'system';
    // Add system theme change listener
    (0, react_3.useEffect)(function () {
        if (mode === 'system') {
            var mediaQuery_1 = window.matchMedia('(prefers-color-scheme: dark)');
            var handleChange_1 = function (e) {
                console.debug('MediaQuery changed:', e.matches);
                document.documentElement.classList.toggle('dark', e.matches);
                document.documentElement.classList.toggle('light', !e.matches);
            };
            mediaQuery_1.addEventListener('change', handleChange_1);
            // Set initial theme
            handleChange_1({ matches: mediaQuery_1.matches });
            return function () { return mediaQuery_1.removeEventListener('change', handleChange_1); };
        }
    }, [mode]);
    var modeLabel = {
        light: ((0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "sun" }, { children: (0, jsx_runtime_1.jsx)("span", __assign({ className: "sr-only" }, { children: "Light" })) }))),
        dark: ((0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "moon" }, { children: (0, jsx_runtime_1.jsx)("span", __assign({ className: "sr-only" }, { children: "Dark" })) }))),
        system: ((0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "laptop" }, { children: (0, jsx_runtime_1.jsx)("span", __assign({ className: "sr-only" }, { children: "System" })) })))
    };
    return ((0, jsx_runtime_1.jsxs)(dropdown_menu_tsx_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_tsx_1.DropdownMenuTrigger, __assign({ className: "flex h-8 w-8 items-center justify-center" }, { children: modeLabel[mode] })), (0, jsx_runtime_1.jsxs)(dropdown_menu_tsx_1.DropdownMenuContent, __assign({ align: "start", side: "top" }, { children: [' ', (0, jsx_runtime_1.jsxs)(fetcher.Form, __assign({ method: "POST" }, (0, react_1.getFormProps)(form), { action: "/resources/theme-switch" }, { children: [(0, jsx_runtime_1.jsx)(server_only_1.ServerOnly, { children: function () { return ((0, jsx_runtime_1.jsx)("input", { type: "hidden", name: "redirectTo", value: requestInfo.path })); } }), (0, jsx_runtime_1.jsx)(dropdown_menu_tsx_1.DropdownMenuItem, __assign({ asChild: true }, { children: (0, jsx_runtime_1.jsxs)("button", __assign({ type: "submit", name: "theme", value: "system", className: "flex w-full items-center gap-2 ".concat(mode === 'system' ? 'text-primary' : '') }, { children: [(0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "laptop" }), "System"] })) })), (0, jsx_runtime_1.jsx)(dropdown_menu_tsx_1.DropdownMenuItem, __assign({ asChild: true }, { children: (0, jsx_runtime_1.jsxs)("button", __assign({ type: "submit", name: "theme", value: "light", className: "flex w-full items-center gap-2 ".concat(mode === 'light' ? 'text-primary' : '') }, { children: [(0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "sun" }), "Light"] })) })), (0, jsx_runtime_1.jsx)(dropdown_menu_tsx_1.DropdownMenuItem, __assign({ asChild: true }, { children: (0, jsx_runtime_1.jsxs)("button", __assign({ type: "submit", name: "theme", value: "dark", className: "flex w-full items-center gap-2 ".concat(mode === 'dark' ? 'text-primary' : '') }, { children: [(0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "moon" }), "Dark"] })) }))] }))] }))] }));
}
exports.ThemeSwitch = ThemeSwitch;
/**
 * If the user's changing their theme mode preference, this will return the
 * value it's being changed to.
 */
function useOptimisticThemeMode() {
    var fetchers = (0, react_2.useFetchers)();
    var themeFetcher = fetchers.find(function (f) { return f.formAction === '/resources/theme-switch'; });
    if (themeFetcher && themeFetcher.formData) {
        var submission = (0, zod_1.parseWithZod)(themeFetcher.formData, {
            schema: ThemeFormSchema
        });
        if (submission.status === 'success') {
            return submission.value.theme;
        }
    }
}
exports.useOptimisticThemeMode = useOptimisticThemeMode;
/**
 * @returns the user's theme preference, or the client hint theme if the user
 * has not set a preference.
 */
function useTheme() {
    var _a;
    var hints = (0, client_hints_tsx_1.useHints)();
    var requestInfo = (0, request_info_ts_1.useRequestInfo)();
    var optimisticMode = useOptimisticThemeMode();
    if (optimisticMode) {
        return optimisticMode === 'system' ? hints.theme : optimisticMode;
    }
    return (_a = requestInfo.userPrefs.theme) !== null && _a !== void 0 ? _a : hints.theme;
}
exports.useTheme = useTheme;
function useOptionalTheme() {
    var _a;
    var optionalHints = (0, client_hints_tsx_1.useOptionalHints)();
    var optionalRequestInfo = (0, request_info_ts_1.useOptionalRequestInfo)();
    var optimisticMode = useOptimisticThemeMode();
    if (optimisticMode) {
        return optimisticMode === 'system' ? optionalHints === null || optionalHints === void 0 ? void 0 : optionalHints.theme : optimisticMode;
    }
    return (_a = optionalRequestInfo === null || optionalRequestInfo === void 0 ? void 0 : optionalRequestInfo.userPrefs.theme) !== null && _a !== void 0 ? _a : optionalHints === null || optionalHints === void 0 ? void 0 : optionalHints.theme;
}
exports.useOptionalTheme = useOptionalTheme;
