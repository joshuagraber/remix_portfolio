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
var invariant_1 = require("@epic-web/invariant");
var faker_1 = require("@faker-js/faker");
var db_server_ts_1 = require("#app/utils/db.server.ts");
var provider_1 = require("#app/utils/providers/provider");
var user_validation_1 = require("#app/utils/user-validation");
var utils_ts_1 = require("#tests/mocks/utils.ts");
var playwright_utils_ts_1 = require("#tests/playwright-utils.ts");
var URL_REGEX = /(?<url>https?:\/\/[^\s$.?#].[^\s]*)/;
var CODE_REGEX = /Here's your verification code: (?<code>[\d\w]+)/;
function extractUrl(text) {
    var _a;
    var match = text.match(URL_REGEX);
    return (_a = match === null || match === void 0 ? void 0 : match.groups) === null || _a === void 0 ? void 0 : _a.url;
}
var test = playwright_utils_ts_1.test.extend({
    getOnboardingData: function (_a, use) { return __awaiter(void 0, void 0, void 0, function () {
        var userData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userData = (0, playwright_utils_ts_1.createUser)();
                    return [4 /*yield*/, use(function () {
                            var onboardingData = __assign(__assign({}, userData), { password: faker_1.faker.internet.password() });
                            return onboardingData;
                        })];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, db_server_ts_1.prisma.user.deleteMany({ where: { username: userData.username } })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); }
});
test('onboarding with link', function (_a) {
    var page = _a.page, getOnboardingData = _a.getOnboardingData;
    return __awaiter(void 0, void 0, void 0, function () {
        var onboardingData, createAccountLink, emailTextbox, email, onboardingUrl;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    onboardingData = getOnboardingData();
                    return [4 /*yield*/, page.goto('/')];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, page.getByRole('link', { name: /log in/i }).click()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL("/login")];
                case 3:
                    _b.sent();
                    createAccountLink = page.getByRole('link', {
                        name: /create an account/i
                    });
                    return [4 /*yield*/, createAccountLink.click()];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL("/signup")];
                case 5:
                    _b.sent();
                    emailTextbox = page.getByRole('textbox', { name: /email/i });
                    return [4 /*yield*/, emailTextbox.click()];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, emailTextbox.fill(onboardingData.email)];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, page.getByRole('button', { name: /submit/i }).click()];
                case 8:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByRole('button', { name: /submit/i, disabled: true })).toBeVisible()];
                case 9:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByText(/check your email/i)).toBeVisible()];
                case 10:
                    _b.sent();
                    return [4 /*yield*/, (0, utils_ts_1.readEmail)(onboardingData.email)];
                case 11:
                    email = _b.sent();
                    (0, invariant_1.invariant)(email, 'Email not found');
                    (0, playwright_utils_ts_1.expect)(email.to).toBe(onboardingData.email.toLowerCase());
                    (0, playwright_utils_ts_1.expect)(email.from).toBe('hello@epicstack.dev');
                    (0, playwright_utils_ts_1.expect)(email.subject).toMatch(/welcome/i);
                    onboardingUrl = extractUrl(email.text);
                    (0, invariant_1.invariant)(onboardingUrl, 'Onboarding URL not found');
                    return [4 /*yield*/, page.goto(onboardingUrl)];
                case 12:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL(/\/verify/)];
                case 13:
                    _b.sent();
                    return [4 /*yield*/, page
                            .getByRole('main')
                            .getByRole('button', { name: /submit/i })
                            .click()];
                case 14:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL("/onboarding")];
                case 15:
                    _b.sent();
                    return [4 /*yield*/, page
                            .getByRole('textbox', { name: /^username/i })
                            .fill(onboardingData.username)];
                case 16:
                    _b.sent();
                    return [4 /*yield*/, page.getByRole('textbox', { name: /^name/i }).fill(onboardingData.name)];
                case 17:
                    _b.sent();
                    return [4 /*yield*/, page.getByLabel(/^password/i).fill(onboardingData.password)];
                case 18:
                    _b.sent();
                    return [4 /*yield*/, page.getByLabel(/^confirm password/i).fill(onboardingData.password)];
                case 19:
                    _b.sent();
                    return [4 /*yield*/, page.getByLabel(/terms/i).check()];
                case 20:
                    _b.sent();
                    return [4 /*yield*/, page.getByLabel(/remember me/i).check()];
                case 21:
                    _b.sent();
                    return [4 /*yield*/, page.getByRole('button', { name: /Create an account/i }).click()];
                case 22:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL("/")];
                case 23:
                    _b.sent();
                    return [4 /*yield*/, page.getByRole('link', { name: onboardingData.name }).click()];
                case 24:
                    _b.sent();
                    return [4 /*yield*/, page.getByRole('menuitem', { name: /profile/i }).click()];
                case 25:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL("/users/".concat(onboardingData.username))];
                case 26:
                    _b.sent();
                    return [4 /*yield*/, page.getByRole('link', { name: onboardingData.name }).click()];
                case 27:
                    _b.sent();
                    return [4 /*yield*/, page.getByRole('menuitem', { name: /logout/i }).click()];
                case 28:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL("/")];
                case 29:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
test('onboarding with a short code', function (_a) {
    var page = _a.page, getOnboardingData = _a.getOnboardingData;
    return __awaiter(void 0, void 0, void 0, function () {
        var onboardingData, emailTextbox, email, codeMatch, code;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    onboardingData = getOnboardingData();
                    return [4 /*yield*/, page.goto('/signup')];
                case 1:
                    _c.sent();
                    emailTextbox = page.getByRole('textbox', { name: /email/i });
                    return [4 /*yield*/, emailTextbox.click()];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, emailTextbox.fill(onboardingData.email)];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, page.getByRole('button', { name: /submit/i }).click()];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByRole('button', { name: /submit/i, disabled: true })).toBeVisible()];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByText(/check your email/i)).toBeVisible()];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, (0, utils_ts_1.readEmail)(onboardingData.email)];
                case 7:
                    email = _c.sent();
                    (0, invariant_1.invariant)(email, 'Email not found');
                    (0, playwright_utils_ts_1.expect)(email.to).toBe(onboardingData.email.toLowerCase());
                    (0, playwright_utils_ts_1.expect)(email.from).toBe('hello@epicstack.dev');
                    (0, playwright_utils_ts_1.expect)(email.subject).toMatch(/welcome/i);
                    codeMatch = email.text.match(CODE_REGEX);
                    code = (_b = codeMatch === null || codeMatch === void 0 ? void 0 : codeMatch.groups) === null || _b === void 0 ? void 0 : _b.code;
                    (0, invariant_1.invariant)(code, 'Onboarding code not found');
                    return [4 /*yield*/, page.getByRole('textbox', { name: /code/i }).fill(code)];
                case 8:
                    _c.sent();
                    return [4 /*yield*/, page.getByRole('button', { name: /submit/i }).click()];
                case 9:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL("/onboarding")];
                case 10:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
});
test('completes onboarding after GitHub OAuth given valid user details', function (_a) {
    var page = _a.page, prepareGitHubUser = _a.prepareGitHubUser;
    return __awaiter(void 0, void 0, void 0, function () {
        var ghUser, _b, usernameInput, createAccountButton;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, prepareGitHubUser()
                    // let's verify we do not have user with that email in our system:
                ];
                case 1:
                    ghUser = _c.sent();
                    // let's verify we do not have user with that email in our system:
                    _b = playwright_utils_ts_1.expect;
                    return [4 /*yield*/, db_server_ts_1.prisma.user.findUnique({
                            where: { email: (0, provider_1.normalizeEmail)(ghUser.primaryEmail) }
                        })];
                case 2:
                    // let's verify we do not have user with that email in our system:
                    _b.apply(void 0, [_c.sent()]).toBeNull();
                    return [4 /*yield*/, page.goto('/signup')];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, page.getByRole('button', { name: /signup with github/i }).click()];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL(/\/onboarding\/github/)];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByText(new RegExp("welcome aboard ".concat(ghUser.primaryEmail), 'i'))).toBeVisible()
                        // fields are pre-populated for the user, so we only need to accept
                        // terms of service and hit the 'crete an account' button
                    ];
                case 6:
                    _c.sent();
                    usernameInput = page.getByRole('textbox', { name: /username/i });
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(usernameInput).toHaveValue((0, provider_1.normalizeUsername)(ghUser.profile.login))];
                case 7:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByRole('textbox', { name: /^name/i })).toHaveValue(ghUser.profile.name)];
                case 8:
                    _c.sent();
                    createAccountButton = page.getByRole('button', {
                        name: /create an account/i
                    });
                    return [4 /*yield*/, page
                            .getByLabel(/do you agree to our terms of service and privacy policy/i)
                            .check()];
                case 9:
                    _c.sent();
                    return [4 /*yield*/, createAccountButton.click()];
                case 10:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL(/signup/i)
                        // we are still on the 'signup' route since that
                        // was the referrer and no 'redirectTo' has been specified
                    ];
                case 11:
                    _c.sent();
                    // we are still on the 'signup' route since that
                    // was the referrer and no 'redirectTo' has been specified
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL('/signup')];
                case 12:
                    // we are still on the 'signup' route since that
                    // was the referrer and no 'redirectTo' has been specified
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByText(/thanks for signing up/i)).toBeVisible()
                        // internally, a user has been created:
                    ];
                case 13:
                    _c.sent();
                    // internally, a user has been created:
                    return [4 /*yield*/, db_server_ts_1.prisma.user.findUniqueOrThrow({
                            where: { email: (0, provider_1.normalizeEmail)(ghUser.primaryEmail) }
                        })];
                case 14:
                    // internally, a user has been created:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
});
test('logs user in after GitHub OAuth if they are already registered', function (_a) {
    var page = _a.page, prepareGitHubUser = _a.prepareGitHubUser;
    return __awaiter(void 0, void 0, void 0, function () {
        var ghUser, _b, name, user, connection;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, prepareGitHubUser()
                    // let's verify we do not have user with that email in our system ...
                ];
                case 1:
                    ghUser = _c.sent();
                    // let's verify we do not have user with that email in our system ...
                    _b = playwright_utils_ts_1.expect;
                    return [4 /*yield*/, db_server_ts_1.prisma.user.findUnique({
                            where: { email: (0, provider_1.normalizeEmail)(ghUser.primaryEmail) }
                        })];
                case 2:
                    // let's verify we do not have user with that email in our system ...
                    _b.apply(void 0, [_c.sent()]).toBeNull();
                    name = faker_1.faker.person.fullName();
                    return [4 /*yield*/, db_server_ts_1.prisma.user.create({
                            select: { id: true, name: true },
                            data: {
                                email: (0, provider_1.normalizeEmail)(ghUser.primaryEmail),
                                username: (0, provider_1.normalizeUsername)(ghUser.profile.login),
                                name: name
                            }
                        })
                        // let's verify there is no connection between the GitHub user
                        // and out app's user:
                    ];
                case 3:
                    user = _c.sent();
                    return [4 /*yield*/, db_server_ts_1.prisma.connection.findFirst({
                            where: { providerName: 'github', userId: user.id }
                        })];
                case 4:
                    connection = _c.sent();
                    (0, playwright_utils_ts_1.expect)(connection).toBeNull();
                    return [4 /*yield*/, page.goto('/signup')];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, page.getByRole('button', { name: /signup with github/i }).click()];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL("/")];
                case 7:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByText(new RegExp("your \"".concat(ghUser.profile.login, "\" github account has been connected"), 'i'))).toBeVisible()
                        // internally, a connection (rather than a new user) has been created:
                    ];
                case 8:
                    _c.sent();
                    // internally, a connection (rather than a new user) has been created:
                    return [4 /*yield*/, db_server_ts_1.prisma.connection.findFirstOrThrow({
                            where: { providerName: 'github', userId: user.id }
                        })];
                case 9:
                    // internally, a connection (rather than a new user) has been created:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
});
test('shows help texts on entering invalid details on onboarding page after GitHub OAuth', function (_a) {
    var page = _a.page, prepareGitHubUser = _a.prepareGitHubUser;
    return __awaiter(void 0, void 0, void 0, function () {
        var ghUser, usernameInput, createAccountButton, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, prepareGitHubUser()];
                case 1:
                    ghUser = _c.sent();
                    return [4 /*yield*/, page.goto('/signup')];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, page.getByRole('button', { name: /signup with github/i }).click()];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL(/\/onboarding\/github/)];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByText(new RegExp("welcome aboard ".concat(ghUser.primaryEmail), 'i'))).toBeVisible()];
                case 5:
                    _c.sent();
                    usernameInput = page.getByRole('textbox', { name: /username/i });
                    createAccountButton = page.getByRole('button', {
                        name: /create an account/i
                    });
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(createAccountButton.getByRole('status')).not.toBeVisible()];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(createAccountButton.getByText('error')).not.toBeAttached()
                        // invalid chars in username
                    ];
                case 7:
                    _c.sent();
                    // invalid chars in username
                    return [4 /*yield*/, usernameInput.fill('U$er_name')]; // $ is invalid char, see app/utils/user-validation.ts.
                case 8:
                    // invalid chars in username
                    _c.sent(); // $ is invalid char, see app/utils/user-validation.ts.
                    return [4 /*yield*/, createAccountButton.click()];
                case 9:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(createAccountButton.getByRole('status')).toBeVisible()];
                case 10:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(createAccountButton.getByText('error')).toBeAttached()];
                case 11:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByText(/username can only include letters, numbers, and underscores/i)).toBeVisible()
                        // but we also never checked that privacy consent box
                    ];
                case 12:
                    _c.sent();
                    // but we also never checked that privacy consent box
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByText(/you must agree to the terms of service and privacy policy/i)).toBeVisible()];
                case 13:
                    // but we also never checked that privacy consent box
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL(/\/onboarding\/github/)
                        // empty username
                    ];
                case 14:
                    _c.sent();
                    // empty username
                    return [4 /*yield*/, usernameInput.fill('')];
                case 15:
                    // empty username
                    _c.sent();
                    return [4 /*yield*/, createAccountButton.click()];
                case 16:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByText(/username is required/i)).toBeVisible()];
                case 17:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL(/\/onboarding\/github/)
                        // too short username
                    ];
                case 18:
                    _c.sent();
                    // too short username
                    return [4 /*yield*/, usernameInput.fill(faker_1.faker.string.alphanumeric({ length: user_validation_1.USERNAME_MIN_LENGTH - 1 }))];
                case 19:
                    // too short username
                    _c.sent();
                    return [4 /*yield*/, createAccountButton.click()];
                case 20:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByText(/username is too short/i)).toBeVisible()
                        // too long username
                    ];
                case 21:
                    _c.sent();
                    // too long username
                    return [4 /*yield*/, usernameInput.fill(faker_1.faker.string.alphanumeric({
                            length: user_validation_1.USERNAME_MAX_LENGTH + 1
                        }))
                        // we are truncating the user's input
                    ];
                case 22:
                    // too long username
                    _c.sent();
                    // we are truncating the user's input
                    _b = playwright_utils_ts_1.expect;
                    return [4 /*yield*/, usernameInput.inputValue()];
                case 23:
                    // we are truncating the user's input
                    _b.apply(void 0, [(_c.sent()).length]).toBe(user_validation_1.USERNAME_MAX_LENGTH);
                    return [4 /*yield*/, createAccountButton.click()];
                case 24:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByText(/username is too long/i)).not.toBeVisible()
                        // still unchecked 'terms of service' checkbox
                    ];
                case 25:
                    _c.sent();
                    // still unchecked 'terms of service' checkbox
                    return [4 /*yield*/, usernameInput.fill((0, provider_1.normalizeUsername)("U5er_name_0k_".concat(faker_1.faker.person.lastName())))];
                case 26:
                    // still unchecked 'terms of service' checkbox
                    _c.sent();
                    return [4 /*yield*/, createAccountButton.click()];
                case 27:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByText(/must agree to the terms of service and privacy policy/i)).toBeVisible()];
                case 28:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL(/\/onboarding\/github/)
                        // we are all set up and ...
                    ];
                case 29:
                    _c.sent();
                    // we are all set up and ...
                    return [4 /*yield*/, page
                            .getByLabel(/do you agree to our terms of service and privacy policy/i)
                            .check()];
                case 30:
                    // we are all set up and ...
                    _c.sent();
                    return [4 /*yield*/, createAccountButton.click()];
                case 31:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(createAccountButton.getByText('error')).not.toBeAttached()
                        // ... sign up is successful!
                    ];
                case 32:
                    _c.sent();
                    // ... sign up is successful!
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByText(/thanks for signing up/i)).toBeVisible()];
                case 33:
                    // ... sign up is successful!
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
});
test('login as existing user', function (_a) {
    var page = _a.page, insertNewUser = _a.insertNewUser;
    return __awaiter(void 0, void 0, void 0, function () {
        var password, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    password = faker_1.faker.internet.password();
                    return [4 /*yield*/, insertNewUser({ password: password })];
                case 1:
                    user = _b.sent();
                    (0, invariant_1.invariant)(user.name, 'User name not found');
                    return [4 /*yield*/, page.goto('/login')];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, page.getByRole('textbox', { name: /username/i }).fill(user.username)];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, page.getByLabel(/^password$/i).fill(password)];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, page.getByRole('button', { name: /log in/i }).click()];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL("/")];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByRole('link', { name: user.name })).toBeVisible()];
                case 7:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
test('reset password with a link', function (_a) {
    var page = _a.page, insertNewUser = _a.insertNewUser;
    return __awaiter(void 0, void 0, void 0, function () {
        var originalPassword, user, email, resetPasswordUrl, newPassword;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    originalPassword = faker_1.faker.internet.password();
                    return [4 /*yield*/, insertNewUser({ password: originalPassword })];
                case 1:
                    user = _b.sent();
                    (0, invariant_1.invariant)(user.name, 'User name not found');
                    return [4 /*yield*/, page.goto('/login')];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, page.getByRole('link', { name: /forgot password/i }).click()];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL('/forgot-password')];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByRole('heading', { name: /forgot password/i })).toBeVisible()];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, page.getByRole('textbox', { name: /username/i }).fill(user.username)];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, page.getByRole('button', { name: /recover password/i }).click()];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByRole('button', { name: /recover password/i, disabled: true })).toBeVisible()];
                case 8:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByText(/check your email/i)).toBeVisible()];
                case 9:
                    _b.sent();
                    return [4 /*yield*/, (0, utils_ts_1.readEmail)(user.email)];
                case 10:
                    email = _b.sent();
                    (0, invariant_1.invariant)(email, 'Email not found');
                    (0, playwright_utils_ts_1.expect)(email.subject).toMatch(/password reset/i);
                    (0, playwright_utils_ts_1.expect)(email.to).toBe(user.email.toLowerCase());
                    (0, playwright_utils_ts_1.expect)(email.from).toBe('hello@epicstack.dev');
                    resetPasswordUrl = extractUrl(email.text);
                    (0, invariant_1.invariant)(resetPasswordUrl, 'Reset password URL not found');
                    return [4 /*yield*/, page.goto(resetPasswordUrl)];
                case 11:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL(/\/verify/)];
                case 12:
                    _b.sent();
                    return [4 /*yield*/, page
                            .getByRole('main')
                            .getByRole('button', { name: /submit/i })
                            .click()];
                case 13:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL("/reset-password")];
                case 14:
                    _b.sent();
                    newPassword = faker_1.faker.internet.password();
                    return [4 /*yield*/, page.getByLabel(/^new password$/i).fill(newPassword)];
                case 15:
                    _b.sent();
                    return [4 /*yield*/, page.getByLabel(/^confirm password$/i).fill(newPassword)];
                case 16:
                    _b.sent();
                    return [4 /*yield*/, page.getByRole('button', { name: /reset password/i }).click()];
                case 17:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByRole('button', { name: /reset password/i, disabled: true })).toBeVisible()];
                case 18:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL('/login')];
                case 19:
                    _b.sent();
                    return [4 /*yield*/, page.getByRole('textbox', { name: /username/i }).fill(user.username)];
                case 20:
                    _b.sent();
                    return [4 /*yield*/, page.getByLabel(/^password$/i).fill(originalPassword)];
                case 21:
                    _b.sent();
                    return [4 /*yield*/, page.getByRole('button', { name: /log in/i }).click()];
                case 22:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByText(/invalid username or password/i)).toBeVisible()];
                case 23:
                    _b.sent();
                    return [4 /*yield*/, page.getByLabel(/^password$/i).fill(newPassword)];
                case 24:
                    _b.sent();
                    return [4 /*yield*/, page.getByRole('button', { name: /log in/i }).click()];
                case 25:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL("/")];
                case 26:
                    _b.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByRole('link', { name: user.name })).toBeVisible()];
                case 27:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
test('reset password with a short code', function (_a) {
    var page = _a.page, insertNewUser = _a.insertNewUser;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, email, codeMatch, code;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, insertNewUser()];
                case 1:
                    user = _c.sent();
                    return [4 /*yield*/, page.goto('/login')];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, page.getByRole('link', { name: /forgot password/i }).click()];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL('/forgot-password')];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByRole('heading', { name: /forgot password/i })).toBeVisible()];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, page.getByRole('textbox', { name: /username/i }).fill(user.username)];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, page.getByRole('button', { name: /recover password/i }).click()];
                case 7:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByRole('button', { name: /recover password/i, disabled: true })).toBeVisible()];
                case 8:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page.getByText(/check your email/i)).toBeVisible()];
                case 9:
                    _c.sent();
                    return [4 /*yield*/, (0, utils_ts_1.readEmail)(user.email)];
                case 10:
                    email = _c.sent();
                    (0, invariant_1.invariant)(email, 'Email not found');
                    (0, playwright_utils_ts_1.expect)(email.subject).toMatch(/password reset/i);
                    (0, playwright_utils_ts_1.expect)(email.to).toBe(user.email);
                    (0, playwright_utils_ts_1.expect)(email.from).toBe('hello@epicstack.dev');
                    codeMatch = email.text.match(CODE_REGEX);
                    code = (_b = codeMatch === null || codeMatch === void 0 ? void 0 : codeMatch.groups) === null || _b === void 0 ? void 0 : _b.code;
                    (0, invariant_1.invariant)(code, 'Reset Password code not found');
                    return [4 /*yield*/, page.getByRole('textbox', { name: /code/i }).fill(code)];
                case 11:
                    _c.sent();
                    return [4 /*yield*/, page.getByRole('button', { name: /submit/i }).click()];
                case 12:
                    _c.sent();
                    return [4 /*yield*/, (0, playwright_utils_ts_1.expect)(page).toHaveURL("/reset-password")];
                case 13:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
});
