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
exports.compileMDX = void 0;
var mdx_bundler_1 = require("mdx-bundler");
var remark_directive_1 = __importDefault(require("remark-directive"));
var remark_gfm_1 = __importDefault(require("remark-gfm"));
var unist_util_visit_1 = require("unist-util-visit");
function compileMDX(source) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!source)
                        throw new Error('Source is required');
                    return [4 /*yield*/, (0, mdx_bundler_1.bundleMDX)({
                            source: source,
                            mdxOptions: function (options) {
                                var _a, _b;
                                options.rehypePlugins = __spreadArray([], ((_a = options.rehypePlugins) !== null && _a !== void 0 ? _a : []), true);
                                options.remarkPlugins = __spreadArray(__spreadArray([], ((_b = options.remarkPlugins) !== null && _b !== void 0 ? _b : []), true), [
                                    remark_gfm_1["default"],
                                    remark_directive_1["default"],
                                    remarkYoutube,
                                    remarkPreview,
                                ], false);
                                return options;
                            }
                        })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.compileMDX = compileMDX;
var remarkYoutube = function () {
    return function (tree) {
        (0, unist_util_visit_1.visit)(tree, function (node) {
            var _a, _b;
            if (isDirectiveNode(node) && node.name === 'youtube') {
                // Extract the ID from either the # syntax or id= syntax
                var id = ((_a = node.attributes) === null || _a === void 0 ? void 0 : _a.id) ||
                    (((_b = node.attributes) === null || _b === void 0 ? void 0 : _b['#']) ? node.attributes['#'] : null);
                if (!id)
                    return;
                var youtubeNode = node;
                youtubeNode.type = 'mdxJsxFlowElement';
                youtubeNode.name = 'youtube';
                youtubeNode.attributes = [
                    {
                        type: 'mdxJsxAttribute',
                        name: 'id',
                        value: id
                    },
                ];
            }
        });
    };
};
var remarkPreview = function () {
    return function (tree) {
        (0, unist_util_visit_1.visit)(tree, function (node) {
            var _a, _b;
            if (isDirectiveNode(node) && node.name === 'preview') {
                var url = ((_a = node.attributes) === null || _a === void 0 ? void 0 : _a.url) || ((_b = node.attributes) === null || _b === void 0 ? void 0 : _b['#']);
                if (!url)
                    return;
                var previewNode = node;
                previewNode.type = 'mdxJsxFlowElement';
                previewNode.name = 'preview';
                previewNode.attributes = [
                    {
                        type: 'mdxJsxAttribute',
                        name: 'url',
                        value: url
                    },
                ];
            }
        });
    };
};
function isDirectiveNode(node) {
    return (node.type === 'leafDirective' &&
        'name' in node &&
        typeof node.name === 'string');
}
