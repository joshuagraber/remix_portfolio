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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.action = exports.loader = exports.handle = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var node_1 = require("@remix-run/node");
var react_1 = require("@remix-run/react");
var icon_tsx_1 = require("#app/components/ui/icon.tsx");
var status_button_tsx_1 = require("#app/components/ui/status-button.tsx");
var auth_server_ts_1 = require("#app/utils/auth.server.ts");
var db_server_ts_1 = require("#app/utils/db.server.ts");
var totp_server_ts_1 = require("#app/utils/totp.server.ts");
var profile_two_factor_tsx_1 = require("./profile.two-factor.tsx");
var profile_two_factor_verify_tsx_1 = require("./profile.two-factor.verify.tsx");
exports.handle = {
    getSitemapEntries: function () { return null; }
};
function loader(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var userId, verification;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, auth_server_ts_1.requireUserId)(request)];
                case 1:
                    userId = _b.sent();
                    return [4 /*yield*/, db_server_ts_1.prisma.verification.findUnique({
                            where: { target_type: { type: profile_two_factor_tsx_1.twoFAVerificationType, target: userId } },
                            select: { id: true }
                        })];
                case 2:
                    verification = _b.sent();
                    return [2 /*return*/, (0, node_1.json)({ is2FAEnabled: Boolean(verification) })];
            }
        });
    });
}
exports.loader = loader;
function action(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var userId, _b, _otp, config, verificationData;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, auth_server_ts_1.requireUserId)(request)];
                case 1:
                    userId = _c.sent();
                    return [4 /*yield*/, (0, totp_server_ts_1.generateTOTP)()];
                case 2:
                    _b = _c.sent(), _otp = _b.otp, config = __rest(_b, ["otp"]);
                    verificationData = __assign(__assign({}, config), { type: profile_two_factor_verify_tsx_1.twoFAVerifyVerificationType, target: userId });
                    return [4 /*yield*/, db_server_ts_1.prisma.verification.upsert({
                            where: {
                                target_type: { target: userId, type: profile_two_factor_verify_tsx_1.twoFAVerifyVerificationType }
                            },
                            create: verificationData,
                            update: verificationData
                        })];
                case 3:
                    _c.sent();
                    return [2 /*return*/, (0, node_1.redirect)('/settings/profile/two-factor/verify')];
            }
        });
    });
}
exports.action = action;
function TwoFactorRoute() {
    var data = (0, react_1.useLoaderData)();
    var enable2FAFetcher = (0, react_1.useFetcher)();
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "flex flex-col gap-4" }, { children: data.is2FAEnabled ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ className: "text-lg" }, { children: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "check" }, { children: "You have enabled two-factor authentication." })) })), (0, jsx_runtime_1.jsx)(react_1.Link, __assign({ to: "disable" }, { children: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "lock-open-1" }, { children: "Disable 2FA" })) }))] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { children: (0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, __assign({ name: "lock-open-1" }, { children: "You have not enabled two-factor authentication yet." })) }), (0, jsx_runtime_1.jsxs)("p", __assign({ className: "text-sm" }, { children: ["Two factor authentication adds an extra layer of security to your account. You will need to enter a code from an authenticator app like", ' ', (0, jsx_runtime_1.jsx)("a", __assign({ className: "underline", href: "https://1password.com/" }, { children: "1Password" })), ' ', "to log in."] })), (0, jsx_runtime_1.jsx)(enable2FAFetcher.Form, __assign({ method: "POST" }, { children: (0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({ type: "submit", name: "intent", value: "enable", status: enable2FAFetcher.state === 'loading' ? 'pending' : 'idle', className: "mx-auto" }, { children: "Enable 2FA" })) }))] })) })));
}
exports["default"] = TwoFactorRoute;
