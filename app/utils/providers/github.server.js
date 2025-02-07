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
var _a;
exports.__esModule = true;
exports.GitHubProvider = void 0;
var cuid2_1 = require("@paralleldrive/cuid2");
var node_1 = require("@remix-run/node");
var remix_auth_github_1 = require("remix-auth-github");
var zod_1 = require("zod");
var cache_server_ts_1 = require("../cache.server.ts");
var connections_server_ts_1 = require("../connections.server.ts");
var constants_ts_1 = require("./constants.ts");
var GitHubUserSchema = zod_1.z.object({ login: zod_1.z.string() });
var GitHubUserParseResult = zod_1.z
    .object({
    success: zod_1.z.literal(true),
    data: GitHubUserSchema
})
    .or(zod_1.z.object({
    success: zod_1.z.literal(false)
}));
var shouldMock = ((_a = process.env.GITHUB_CLIENT_ID) === null || _a === void 0 ? void 0 : _a.startsWith('MOCK_')) ||
    process.env.NODE_ENV === 'test';
var GitHubProvider = /** @class */ (function () {
    function GitHubProvider() {
    }
    GitHubProvider.prototype.getAuthStrategy = function () {
        var _this = this;
        return new remix_auth_github_1.GitHubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: '/auth/github/callback'
        }, function (_a) {
            var profile = _a.profile;
            return __awaiter(_this, void 0, void 0, function () {
                var email, username, imageUrl;
                var _b, _c;
                return __generator(this, function (_d) {
                    email = (_b = profile.emails[0]) === null || _b === void 0 ? void 0 : _b.value.trim().toLowerCase();
                    if (!email) {
                        throw new Error('Email not found');
                    }
                    username = profile.displayName;
                    imageUrl = (_c = profile.photos[0]) === null || _c === void 0 ? void 0 : _c.value;
                    return [2 /*return*/, {
                            email: email,
                            id: profile.id,
                            username: username,
                            name: profile.name.givenName,
                            imageUrl: imageUrl
                        }];
                });
            });
        });
    };
    GitHubProvider.prototype.resolveConnectionData = function (providerId, _a) {
        var _b = _a === void 0 ? {} : _a, timings = _b.timings;
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, (0, cache_server_ts_1.cachified)({
                            key: "connection-data:github:".concat(providerId),
                            cache: cache_server_ts_1.cache,
                            timings: timings,
                            ttl: 1000 * 60,
                            swr: 1000 * 60 * 60 * 24 * 7,
                            getFreshValue: function (context) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var response, rawJson, result;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, fetch("https://api.github.com/user/".concat(providerId), { headers: { Authorization: "token ".concat(process.env.GITHUB_TOKEN) } })];
                                            case 1:
                                                response = _a.sent();
                                                return [4 /*yield*/, response.json()];
                                            case 2:
                                                rawJson = _a.sent();
                                                result = GitHubUserSchema.safeParse(rawJson);
                                                if (!result.success) {
                                                    // if it was unsuccessful, then we should kick it out of the cache
                                                    // asap and try again.
                                                    context.metadata.ttl = 0;
                                                }
                                                return [2 /*return*/, result];
                                        }
                                    });
                                });
                            },
                            checkValue: GitHubUserParseResult
                        })];
                    case 1:
                        result = _c.sent();
                        return [2 /*return*/, {
                                displayName: result.success ? result.data.login : 'Unknown',
                                link: result.success ? "https://github.com/".concat(result.data.login) : null
                            }];
                }
            });
        });
    };
    GitHubProvider.prototype.handleMockAction = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var connectionSession, state, code, searchParams, _a, _b, _c;
            var _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!shouldMock)
                            return [2 /*return*/];
                        return [4 /*yield*/, connections_server_ts_1.connectionSessionStorage.getSession(request.headers.get('cookie'))];
                    case 1:
                        connectionSession = _f.sent();
                        state = (0, cuid2_1.createId)();
                        connectionSession.set('oauth2:state', state);
                        code = request.headers.get(constants_ts_1.MOCK_CODE_GITHUB_HEADER) || constants_ts_1.MOCK_CODE_GITHUB;
                        searchParams = new URLSearchParams({ code: code, state: state });
                        _a = node_1.redirect;
                        _b = ["/auth/github/callback?".concat(searchParams)];
                        _d = {};
                        _e = {};
                        _c = 'set-cookie';
                        return [4 /*yield*/, connections_server_ts_1.connectionSessionStorage.commitSession(connectionSession)];
                    case 2: throw _a.apply(void 0, _b.concat([(_d.headers = (_e[_c] = _f.sent(),
                            _e),
                            _d)]));
                }
            });
        });
    };
    return GitHubProvider;
}());
exports.GitHubProvider = GitHubProvider;
