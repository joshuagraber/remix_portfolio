"use strict";
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
exports.action = exports.loader = void 0;
var node_1 = require("@remix-run/node");
var auth_server_ts_1 = require("#app/utils/auth.server.ts");
var connections_server_ts_1 = require("#app/utils/connections.server.ts");
var connections_tsx_1 = require("#app/utils/connections.tsx");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var redirect_cookie_server_ts_1 = require("#app/utils/redirect-cookie.server.ts");
function loader() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, node_1.redirect)('/login')];
        });
    });
}
exports.loader = loader;
function action(_a) {
    var request = _a.request, params = _a.params;
    return __awaiter(this, void 0, void 0, function () {
        var providerName, error_1, formData, rawRedirectTo, redirectTo, redirectToCookie;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    providerName = connections_tsx_1.ProviderNameSchema.parse(params.provider);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 7]);
                    return [4 /*yield*/, (0, connections_server_ts_1.handleMockAction)(providerName, request)];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, auth_server_ts_1.authenticator.authenticate(providerName, request)];
                case 3: return [2 /*return*/, _b.sent()];
                case 4:
                    error_1 = _b.sent();
                    if (!(error_1 instanceof Response)) return [3 /*break*/, 6];
                    return [4 /*yield*/, request.formData()];
                case 5:
                    formData = _b.sent();
                    rawRedirectTo = formData.get('redirectTo');
                    redirectTo = typeof rawRedirectTo === 'string'
                        ? rawRedirectTo
                        : (0, misc_tsx_1.getReferrerRoute)(request);
                    redirectToCookie = (0, redirect_cookie_server_ts_1.getRedirectCookieHeader)(redirectTo);
                    if (redirectToCookie) {
                        error_1.headers.append('set-cookie', redirectToCookie);
                    }
                    _b.label = 6;
                case 6: throw error_1;
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.action = action;
