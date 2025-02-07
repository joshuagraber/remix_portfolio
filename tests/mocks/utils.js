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
exports.requireHeader = exports.readEmail = exports.requireEmail = exports.writeEmail = exports.EmailSchema = exports.createFixture = exports.readFixture = void 0;
var node_path_1 = __importDefault(require("node:path"));
var node_url_1 = require("node:url");
var fs_extra_1 = __importDefault(require("fs-extra"));
var zod_1 = require("zod");
var __dirname = node_path_1["default"].dirname((0, node_url_1.fileURLToPath)(import.meta.url));
var fixturesDirPath = node_path_1["default"].join(__dirname, '..', 'fixtures');
function readFixture(subdir, name) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fs_extra_1["default"].readJSON(node_path_1["default"].join(fixturesDirPath, subdir, "".concat(name, ".json")))];
        });
    });
}
exports.readFixture = readFixture;
function createFixture(subdir, name, data) {
    return __awaiter(this, void 0, void 0, function () {
        var dir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dir = node_path_1["default"].join(fixturesDirPath, subdir);
                    return [4 /*yield*/, fs_extra_1["default"].ensureDir(dir)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, fs_extra_1["default"].writeJSON(node_path_1["default"].join(dir, "./".concat(name, ".json")), data)];
            }
        });
    });
}
exports.createFixture = createFixture;
exports.EmailSchema = zod_1.z.object({
    to: zod_1.z.string(),
    from: zod_1.z.string(),
    subject: zod_1.z.string(),
    text: zod_1.z.string(),
    html: zod_1.z.string()
});
function writeEmail(rawEmail) {
    return __awaiter(this, void 0, void 0, function () {
        var email;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = exports.EmailSchema.parse(rawEmail);
                    return [4 /*yield*/, createFixture('email', email.to, email)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, email];
            }
        });
    });
}
exports.writeEmail = writeEmail;
function requireEmail(recipient) {
    return __awaiter(this, void 0, void 0, function () {
        var email;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readEmail(recipient)];
                case 1:
                    email = _a.sent();
                    if (!email)
                        throw new Error("Email to ".concat(recipient, " not found"));
                    return [2 /*return*/, email];
            }
        });
    });
}
exports.requireEmail = requireEmail;
function readEmail(recipient) {
    return __awaiter(this, void 0, void 0, function () {
        var email, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, readFixture('email', recipient)];
                case 1:
                    email = _a.sent();
                    return [2 /*return*/, exports.EmailSchema.parse(email)];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error reading email", error_1);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.readEmail = readEmail;
function requireHeader(headers, header) {
    if (!headers.has(header)) {
        var headersString = JSON.stringify(Object.fromEntries(headers.entries()), null, 2);
        throw new Error("Header \"".concat(header, "\" required, but not found in ").concat(headersString));
    }
    return headers.get(header);
}
exports.requireHeader = requireHeader;
