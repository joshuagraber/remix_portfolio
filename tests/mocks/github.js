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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.handlers = exports.insertGitHubUser = exports.deleteGitHubUsers = exports.deleteGitHubUser = void 0;
var node_path_1 = __importDefault(require("node:path"));
var node_url_1 = require("node:url");
var faker_1 = require("@faker-js/faker");
var fs_extra_1 = __importDefault(require("fs-extra"));
var msw_1 = require("msw");
var json = msw_1.HttpResponse.json;
var __dirname = node_path_1["default"].dirname((0, node_url_1.fileURLToPath)(import.meta.url));
var here = function () {
    var s = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        s[_i] = arguments[_i];
    }
    return node_path_1["default"].join.apply(node_path_1["default"], __spreadArray([__dirname], s, false));
};
var githubUserFixturePath = node_path_1["default"].join(here('..', 'fixtures', 'github', "users.".concat(process.env.VITEST_POOL_ID || 0, ".local.json")));
await fs_extra_1["default"].ensureDir(node_path_1["default"].dirname(githubUserFixturePath));
function createGitHubUser(code) {
    var createEmail = function () { return ({
        email: faker_1.faker.internet.email(),
        verified: faker_1.faker.datatype.boolean(),
        primary: false,
        visibility: faker_1.faker.helpers.arrayElement(['public', null])
    }); };
    var primaryEmail = __assign(__assign({}, createEmail()), { verified: true, primary: true });
    var emails = [
        {
            email: faker_1.faker.internet.email(),
            verified: false,
            primary: false,
            visibility: 'public'
        },
        {
            email: faker_1.faker.internet.email(),
            verified: true,
            primary: false,
            visibility: null
        },
        primaryEmail,
    ];
    code !== null && code !== void 0 ? code : (code = faker_1.faker.string.uuid());
    return {
        code: code,
        accessToken: "".concat(code, "_mock_access_token"),
        profile: {
            login: faker_1.faker.internet.userName(),
            id: faker_1.faker.string.uuid(),
            name: faker_1.faker.person.fullName(),
            avatar_url: 'https://github.com/ghost.png',
            emails: emails.map(function (e) { return e.email; })
        },
        emails: emails,
        primaryEmail: primaryEmail.email
    };
}
function getGitHubUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var json_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, fs_extra_1["default"].pathExists(githubUserFixturePath)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 3];
                    return [4 /*yield*/, fs_extra_1["default"].readJson(githubUserFixturePath)];
                case 2:
                    json_1 = _a.sent();
                    return [2 /*return*/, json_1];
                case 3: return [2 /*return*/, []];
                case 4:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function deleteGitHubUser(primaryEmail) {
    return __awaiter(this, void 0, void 0, function () {
        var users, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getGitHubUsers()];
                case 1:
                    users = _a.sent();
                    user = users.find(function (u) { return u.primaryEmail === primaryEmail; });
                    if (!user)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, setGitHubUsers(users.filter(function (u) { return u.primaryEmail !== primaryEmail; }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/, user];
            }
        });
    });
}
exports.deleteGitHubUser = deleteGitHubUser;
function deleteGitHubUsers() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1["default"].remove(githubUserFixturePath)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteGitHubUsers = deleteGitHubUsers;
function setGitHubUsers(users) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1["default"].writeJson(githubUserFixturePath, users, { spaces: 2 })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function insertGitHubUser(code) {
    return __awaiter(this, void 0, void 0, function () {
        var githubUsers, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getGitHubUsers()];
                case 1:
                    githubUsers = _a.sent();
                    user = githubUsers.find(function (u) { return u.code === code; });
                    if (user) {
                        Object.assign(user, createGitHubUser(code));
                    }
                    else {
                        user = createGitHubUser(code);
                        githubUsers.push(user);
                    }
                    return [4 /*yield*/, setGitHubUsers(githubUsers)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, user];
            }
        });
    });
}
exports.insertGitHubUser = insertGitHubUser;
function getUser(request) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var accessToken, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    accessToken = (_a = request.headers
                        .get('authorization')) === null || _a === void 0 ? void 0 : _a.slice('token '.length);
                    if (!accessToken) {
                        return [2 /*return*/, new Response('Unauthorized', { status: 401 })];
                    }
                    return [4 /*yield*/, getGitHubUsers()];
                case 1:
                    user = (_b.sent()).find(function (u) { return u.accessToken === accessToken; });
                    if (!user) {
                        return [2 /*return*/, new Response('Not Found', { status: 404 })];
                    }
                    return [2 /*return*/, user];
            }
        });
    });
}
var passthroughGitHub = !process.env.GITHUB_CLIENT_ID.startsWith('MOCK_') &&
    process.env.NODE_ENV !== 'test';
exports.handlers = [
    msw_1.http.post('https://github.com/login/oauth/access_token', function (_a) {
        var request = _a.request;
        return __awaiter(void 0, void 0, void 0, function () {
            var params, _b, code, githubUsers, user;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (passthroughGitHub)
                            return [2 /*return*/, (0, msw_1.passthrough)()];
                        _b = URLSearchParams.bind;
                        return [4 /*yield*/, request.text()];
                    case 1:
                        params = new (_b.apply(URLSearchParams, [void 0, _c.sent()]))();
                        code = params.get('code');
                        return [4 /*yield*/, getGitHubUsers()];
                    case 2:
                        githubUsers = _c.sent();
                        user = githubUsers.find(function (u) { return u.code === code; });
                        if (!!user) return [3 /*break*/, 4];
                        return [4 /*yield*/, insertGitHubUser(code)];
                    case 3:
                        user = _c.sent();
                        _c.label = 4;
                    case 4: return [2 /*return*/, new Response(new URLSearchParams({
                            access_token: user.accessToken,
                            token_type: '__MOCK_TOKEN_TYPE__'
                        }).toString(), { headers: { 'content-type': 'application/x-www-form-urlencoded' } })];
                }
            });
        });
    }),
    msw_1.http.get('https://api.github.com/user/emails', function (_a) {
        var request = _a.request;
        return __awaiter(void 0, void 0, void 0, function () {
            var user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (passthroughGitHub)
                            return [2 /*return*/, (0, msw_1.passthrough)()];
                        return [4 /*yield*/, getUser(request)];
                    case 1:
                        user = _b.sent();
                        if (user instanceof Response)
                            return [2 /*return*/, user];
                        return [2 /*return*/, json(user.emails)];
                }
            });
        });
    }),
    msw_1.http.get('https://api.github.com/user/:id', function (_a) {
        var params = _a.params;
        return __awaiter(void 0, void 0, void 0, function () {
            var mockUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (passthroughGitHub)
                            return [2 /*return*/, (0, msw_1.passthrough)()];
                        return [4 /*yield*/, getGitHubUsers()];
                    case 1:
                        mockUser = (_b.sent()).find(function (u) { return u.profile.id === params.id; });
                        if (mockUser)
                            return [2 /*return*/, json(mockUser.profile)];
                        return [2 /*return*/, new Response('Not Found', { status: 404 })];
                }
            });
        });
    }),
    msw_1.http.get('https://api.github.com/user', function (_a) {
        var request = _a.request;
        return __awaiter(void 0, void 0, void 0, function () {
            var user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (passthroughGitHub)
                            return [2 /*return*/, (0, msw_1.passthrough)()];
                        return [4 /*yield*/, getUser(request)];
                    case 1:
                        user = _b.sent();
                        if (user instanceof Response)
                            return [2 /*return*/, user];
                        return [2 /*return*/, json(user.profile)];
                }
            });
        });
    }),
    msw_1.http.get('https://github.com/ghost.png', function () { return __awaiter(void 0, void 0, void 0, function () {
        var buffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (passthroughGitHub)
                        return [2 /*return*/, (0, msw_1.passthrough)()];
                    return [4 /*yield*/, fs_extra_1["default"].readFile('./tests/fixtures/github/ghost.jpg')];
                case 1:
                    buffer = _a.sent();
                    return [2 /*return*/, new Response(buffer, {
                            // the .png is not a mistake even though it looks like it... It's really a jpg
                            // but the ghost image URL really has a png extension 😅
                            headers: { 'content-type': 'image/jpg' }
                        })];
            }
        });
    }); }),
];
