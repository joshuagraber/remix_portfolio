"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var path = __importStar(require("node:path"));
var execa_1 = require("execa");
var fs_extra_1 = __importDefault(require("fs-extra"));
var glob_1 = require("glob");
var node_html_parser_1 = require("node-html-parser");
var cwd = process.cwd();
var inputDir = path.join(cwd, 'other', 'svg-icons');
var inputDirRelative = path.relative(cwd, inputDir);
var outputDir = path.join(cwd, 'app', 'components', 'ui', 'icons');
await fs_extra_1["default"].ensureDir(outputDir);
var files = glob_1.glob
    .sync('**/*.svg', {
    cwd: inputDir
})
    .sort(function (a, b) { return a.localeCompare(b); });
var shouldVerboseLog = process.argv.includes('--log=verbose');
var logVerbose = shouldVerboseLog ? console.log : function () { };
if (files.length === 0) {
    console.log("No SVG files found in ".concat(inputDirRelative));
}
else {
    await generateIconFiles();
}
function generateIconFiles() {
    return __awaiter(this, void 0, void 0, function () {
        var spriteFilepath, typeOutputFilepath, currentSprite, currentTypes, iconNames, spriteUpToDate, typesUpToDate, spriteChanged, _i, files_1, file, stringifiedIconNames, typeOutputContent, typesChanged, readmeChanged;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spriteFilepath = path.join(outputDir, 'sprite.svg');
                    typeOutputFilepath = path.join(outputDir, 'name.d.ts');
                    return [4 /*yield*/, fs_extra_1["default"]
                            .readFile(spriteFilepath, 'utf8')["catch"](function () { return ''; })];
                case 1:
                    currentSprite = _a.sent();
                    return [4 /*yield*/, fs_extra_1["default"]
                            .readFile(typeOutputFilepath, 'utf8')["catch"](function () { return ''; })];
                case 2:
                    currentTypes = _a.sent();
                    iconNames = files.map(function (file) { return iconName(file); });
                    spriteUpToDate = iconNames.every(function (name) {
                        return currentSprite.includes("id=".concat(name));
                    });
                    typesUpToDate = iconNames.every(function (name) {
                        return currentTypes.includes("\"".concat(name, "\""));
                    });
                    if (spriteUpToDate && typesUpToDate) {
                        logVerbose("Icons are up to date");
                        return [2 /*return*/];
                    }
                    logVerbose("Generating sprite for ".concat(inputDirRelative));
                    return [4 /*yield*/, generateSvgSprite({
                            files: files,
                            inputDir: inputDir,
                            outputPath: spriteFilepath
                        })];
                case 3:
                    spriteChanged = _a.sent();
                    for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
                        file = files_1[_i];
                        logVerbose('✅', file);
                    }
                    logVerbose("Saved to ".concat(path.relative(cwd, spriteFilepath)));
                    stringifiedIconNames = iconNames.map(function (name) { return JSON.stringify(name); });
                    typeOutputContent = "// This file is generated by npm run build:icons\n\nexport type IconName =\n\t| ".concat(stringifiedIconNames.join('\n\t| '), ";\n");
                    return [4 /*yield*/, writeIfChanged(typeOutputFilepath, typeOutputContent)];
                case 4:
                    typesChanged = _a.sent();
                    logVerbose("Manifest saved to ".concat(path.relative(cwd, typeOutputFilepath)));
                    return [4 /*yield*/, writeIfChanged(path.join(outputDir, 'README.md'), "# Icons\n\nThis directory contains SVG icons that are used by the app.\n\nEverything in this directory is generated by `npm run build:icons`.\n")];
                case 5:
                    readmeChanged = _a.sent();
                    if (spriteChanged || typesChanged || readmeChanged) {
                        console.log("Generated ".concat(files.length, " icons"));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function iconName(file) {
    return file.replace(/\.svg$/, '');
}
/**
 * Creates a single SVG file that contains all the icons
 */
function generateSvgSprite(_a) {
    var files = _a.files, inputDir = _a.inputDir, outputPath = _a.outputPath;
    return __awaiter(this, void 0, void 0, function () {
        var symbols, output;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all(files.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                        var input, root, svg;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, fs_extra_1["default"].readFile(path.join(inputDir, file), 'utf8')];
                                case 1:
                                    input = _a.sent();
                                    root = (0, node_html_parser_1.parse)(input);
                                    svg = root.querySelector('svg');
                                    if (!svg)
                                        throw new Error('No SVG element found');
                                    svg.tagName = 'symbol';
                                    svg.setAttribute('id', iconName(file));
                                    svg.removeAttribute('xmlns');
                                    svg.removeAttribute('xmlns:xlink');
                                    svg.removeAttribute('version');
                                    svg.removeAttribute('width');
                                    svg.removeAttribute('height');
                                    return [2 /*return*/, svg.toString().trim()];
                            }
                        });
                    }); }))];
                case 1:
                    symbols = _b.sent();
                    output = __spreadArray(__spreadArray([
                        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
                        "<!-- This file is generated by npm run build:icons -->",
                        "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"0\" height=\"0\">",
                        "<defs>"
                    ], symbols, true), [
                        "</defs>",
                        "</svg>",
                        '', // trailing newline
                    ], false).join('\n');
                    return [2 /*return*/, writeIfChanged(outputPath, output)];
            }
        });
    });
}
function writeIfChanged(filepath, newContent) {
    return __awaiter(this, void 0, void 0, function () {
        var currentContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1["default"]
                        .readFile(filepath, 'utf8')["catch"](function () { return ''; })];
                case 1:
                    currentContent = _a.sent();
                    if (currentContent === newContent)
                        return [2 /*return*/, false];
                    return [4 /*yield*/, fs_extra_1["default"].writeFile(filepath, newContent, 'utf8')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, execa_1.$)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["prettier --write ", " --ignore-unknown"], ["prettier --write ", " --ignore-unknown"])), filepath)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, true];
            }
        });
    });
}
var templateObject_1;
