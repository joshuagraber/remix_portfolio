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
exports.sendEmail = void 0;
var components_1 = require("@react-email/components");
var zod_1 = require("zod");
var resendErrorSchema = zod_1.z.union([
    zod_1.z.object({
        name: zod_1.z.string(),
        message: zod_1.z.string(),
        statusCode: zod_1.z.number()
    }),
    zod_1.z.object({
        name: zod_1.z.literal('UnknownError'),
        message: zod_1.z.literal('Unknown Error'),
        statusCode: zod_1.z.literal(500),
        cause: zod_1.z.any()
    }),
]);
var resendSuccessSchema = zod_1.z.object({
    id: zod_1.z.string()
});
function sendEmail(_a) {
    var react = _a.react, options = __rest(_a, ["react"]);
    return __awaiter(this, void 0, void 0, function () {
        var from, email, _b, _c, response, data, parsedData, parseResult;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    from = 'hello@epicstack.dev';
                    _b = [__assign({ from: from }, options)];
                    if (!react) return [3 /*break*/, 2];
                    return [4 /*yield*/, renderReactEmail(react)];
                case 1:
                    _c = _d.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _c = null;
                    _d.label = 3;
                case 3:
                    email = __assign.apply(void 0, _b.concat([(_c)]));
                    // feel free to remove this condition once you've set up resend
                    if (!process.env.RESEND_API_KEY && !process.env.MOCKS) {
                        console.error("RESEND_API_KEY not set and we're not in mocks mode.");
                        console.error("To send emails, set the RESEND_API_KEY environment variable.");
                        console.error("Would have sent the following email:", JSON.stringify(email));
                        return [2 /*return*/, {
                                status: 'success',
                                data: { id: 'mocked' }
                            }];
                    }
                    return [4 /*yield*/, fetch('https://api.resend.com/emails', {
                            method: 'POST',
                            body: JSON.stringify(email),
                            headers: {
                                Authorization: "Bearer ".concat(process.env.RESEND_API_KEY),
                                'Content-Type': 'application/json'
                            }
                        })];
                case 4:
                    response = _d.sent();
                    return [4 /*yield*/, response.json()];
                case 5:
                    data = _d.sent();
                    parsedData = resendSuccessSchema.safeParse(data);
                    if (response.ok && parsedData.success) {
                        return [2 /*return*/, {
                                status: 'success',
                                data: parsedData
                            }];
                    }
                    else {
                        parseResult = resendErrorSchema.safeParse(data);
                        if (parseResult.success) {
                            return [2 /*return*/, {
                                    status: 'error',
                                    error: parseResult.data
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status: 'error',
                                    error: {
                                        name: 'UnknownError',
                                        message: 'Unknown Error',
                                        statusCode: 500,
                                        cause: data
                                    }
                                }];
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.sendEmail = sendEmail;
function renderReactEmail(react) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, html, text;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        (0, components_1.render)(react),
                        (0, components_1.render)(react, { plainText: true }),
                    ])];
                case 1:
                    _a = _b.sent(), html = _a[0], text = _a[1];
                    return [2 /*return*/, { html: html, text: text }];
            }
        });
    });
}
