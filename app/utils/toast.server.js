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
exports.getToast = exports.createToastHeaders = exports.redirectWithToast = exports.toastSessionStorage = exports.toastKey = void 0;
var cuid2_1 = require("@paralleldrive/cuid2");
var node_1 = require("@remix-run/node");
var zod_1 = require("zod");
var misc_tsx_1 = require("./misc.tsx");
exports.toastKey = 'toast';
var ToastSchema = zod_1.z.object({
    description: zod_1.z.string(),
    id: zod_1.z.string()["default"](function () { return (0, cuid2_1.createId)(); }),
    title: zod_1.z.string().optional(),
    type: zod_1.z["enum"](['message', 'success', 'error'])["default"]('message')
});
exports.toastSessionStorage = (0, node_1.createCookieSessionStorage)({
    cookie: {
        name: 'en_toast',
        sameSite: 'lax',
        path: '/',
        httpOnly: true,
        secrets: process.env.SESSION_SECRET.split(','),
        secure: process.env.NODE_ENV === 'production'
    }
});
function redirectWithToast(url, toast, init) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e;
        var _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _a = node_1.redirect;
                    _b = [url];
                    _c = [__assign({}, init)];
                    _f = {};
                    _d = misc_tsx_1.combineHeaders;
                    _e = [init === null || init === void 0 ? void 0 : init.headers];
                    return [4 /*yield*/, createToastHeaders(toast)];
                case 1: return [2 /*return*/, _a.apply(void 0, _b.concat([__assign.apply(void 0, _c.concat([(_f.headers = _d.apply(void 0, _e.concat([_g.sent()])), _f)]))]))];
            }
        });
    });
}
exports.redirectWithToast = redirectWithToast;
function createToastHeaders(toastInput) {
    return __awaiter(this, void 0, void 0, function () {
        var session, toast, cookie;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.toastSessionStorage.getSession()];
                case 1:
                    session = _a.sent();
                    toast = ToastSchema.parse(toastInput);
                    session.flash(exports.toastKey, toast);
                    return [4 /*yield*/, exports.toastSessionStorage.commitSession(session)];
                case 2:
                    cookie = _a.sent();
                    return [2 /*return*/, new Headers({ 'set-cookie': cookie })];
            }
        });
    });
}
exports.createToastHeaders = createToastHeaders;
function getToast(request) {
    return __awaiter(this, void 0, void 0, function () {
        var session, result, toast, _a, _b, _c;
        var _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, exports.toastSessionStorage.getSession(request.headers.get('cookie'))];
                case 1:
                    session = _f.sent();
                    result = ToastSchema.safeParse(session.get(exports.toastKey));
                    toast = result.success ? result.data : null;
                    _d = {
                        toast: toast
                    };
                    if (!toast) return [3 /*break*/, 3];
                    _b = Headers.bind;
                    _e = {};
                    _c = 'set-cookie';
                    return [4 /*yield*/, exports.toastSessionStorage.destroySession(session)];
                case 2:
                    _a = new (_b.apply(Headers, [void 0, (_e[_c] = _f.sent(),
                            _e)]))();
                    return [3 /*break*/, 4];
                case 3:
                    _a = null;
                    _f.label = 4;
                case 4: return [2 /*return*/, (_d.headers = _a,
                        _d)];
            }
        });
    });
}
exports.getToast = getToast;
