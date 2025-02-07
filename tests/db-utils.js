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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.img = exports.getUserImages = exports.createPassword = exports.createUser = void 0;
var node_fs_1 = __importDefault(require("node:fs"));
var faker_1 = require("@faker-js/faker");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var enforce_unique_1 = require("enforce-unique");
var uniqueUsernameEnforcer = new enforce_unique_1.UniqueEnforcer();
function createUser() {
    var firstName = faker_1.faker.person.firstName();
    var lastName = faker_1.faker.person.lastName();
    var username = uniqueUsernameEnforcer
        .enforce(function () {
        return (faker_1.faker.string.alphanumeric({ length: 2 }) +
            '_' +
            faker_1.faker.internet.userName({
                firstName: firstName.toLowerCase(),
                lastName: lastName.toLowerCase()
            }));
    })
        .slice(0, 20)
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, '_');
    return {
        username: username,
        name: "".concat(firstName, " ").concat(lastName),
        email: "".concat(username, "@example.com")
    };
}
exports.createUser = createUser;
function createPassword(password) {
    if (password === void 0) { password = faker_1.faker.internet.password(); }
    return {
        hash: bcryptjs_1["default"].hashSync(password, 10)
    };
}
exports.createPassword = createPassword;
// let noteImages: Array<Awaited<ReturnType<typeof img>>> | undefined
// export async function getNoteImages() {
// 	if (noteImages) return noteImages
// 	noteImages = await Promise.all([
// 		img({
// 			altText: 'a nice country house',
// 			filepath: './tests/fixtures/images/notes/0.png',
// 		}),
// 		img({
// 			altText: 'a city scape',
// 			filepath: './tests/fixtures/images/notes/1.png',
// 		}),
// 		img({
// 			altText: 'a sunrise',
// 			filepath: './tests/fixtures/images/notes/2.png',
// 		}),
// 		img({
// 			altText: 'a group of friends',
// 			filepath: './tests/fixtures/images/notes/3.png',
// 		}),
// 		img({
// 			altText: 'friends being inclusive of someone who looks lonely',
// 			filepath: './tests/fixtures/images/notes/4.png',
// 		}),
// 		img({
// 			altText: 'an illustration of a hot air balloon',
// 			filepath: './tests/fixtures/images/notes/5.png',
// 		}),
// 		img({
// 			altText:
// 				'an office full of laptops and other office equipment that look like it was abandoned in a rush out of the building in an emergency years ago.',
// 			filepath: './tests/fixtures/images/notes/6.png',
// 		}),
// 		img({
// 			altText: 'a rusty lock',
// 			filepath: './tests/fixtures/images/notes/7.png',
// 		}),
// 		img({
// 			altText: 'something very happy in nature',
// 			filepath: './tests/fixtures/images/notes/8.png',
// 		}),
// 		img({
// 			altText: `someone at the end of a cry session who's starting to feel a little better.`,
// 			filepath: './tests/fixtures/images/notes/9.png',
// 		}),
// 	])
// 	return noteImages
// }
var userImages;
function getUserImages() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (userImages)
                        return [2 /*return*/, userImages];
                    return [4 /*yield*/, Promise.all(Array.from({ length: 10 }, function (_, index) {
                            return img({ filepath: "./tests/fixtures/images/user/".concat(index, ".jpg") });
                        }))];
                case 1:
                    userImages = _a.sent();
                    return [2 /*return*/, userImages];
            }
        });
    });
}
exports.getUserImages = getUserImages;
function img(_a) {
    var altText = _a.altText, filepath = _a.filepath;
    return __awaiter(this, void 0, void 0, function () {
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = {
                        altText: altText,
                        contentType: filepath.endsWith('.png') ? 'image/png' : 'image/jpeg'
                    };
                    return [4 /*yield*/, node_fs_1["default"].promises.readFile(filepath)];
                case 1: return [2 /*return*/, (_b.blob = _c.sent(),
                        _b)];
            }
        });
    });
}
exports.img = img;
