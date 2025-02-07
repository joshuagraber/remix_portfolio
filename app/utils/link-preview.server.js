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
exports.getOpenGraphData = void 0;
var node_html_parser_1 = require("node-html-parser");
var zod_1 = require("zod");
var ogSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    image: zod_1.z.string().url().optional(),
    site_name: zod_1.z.string().optional()
});
function getOpenGraphData(url) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function () {
        var response, html, root, ogData_1, e_1;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _h.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(url, {
                            headers: {
                                'User-Agent': 'bot'
                            }
                        })];
                case 1:
                    response = _h.sent();
                    if (!response.ok) {
                        console.error("Failed to fetch ".concat(url, ": ").concat(response.status));
                        return [2 /*return*/, {}];
                    }
                    return [4 /*yield*/, response.text()];
                case 2:
                    html = _h.sent();
                    root = (0, node_html_parser_1.parse)(html);
                    ogData_1 = {};
                    try {
                        // First try OG tags
                        root.querySelectorAll('meta[property^="og:"]').forEach(function (meta) {
                            var _a;
                            try {
                                var property = (_a = meta.getAttribute('property')) === null || _a === void 0 ? void 0 : _a.replace('og:', '');
                                var content = meta.getAttribute('content');
                                if (property && content) {
                                    ogData_1[property] = content;
                                }
                            }
                            catch (e) {
                                console.error('Error processing meta tag:', e);
                            }
                        });
                        // Safely try to get each fallback
                        try {
                            if (!ogData_1.title) {
                                ogData_1.title =
                                    ((_a = root.querySelector('meta[name="title"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('content')) ||
                                        ((_b = root.querySelector('title')) === null || _b === void 0 ? void 0 : _b.textContent) ||
                                        '';
                            }
                        }
                        catch (e) {
                            console.error('Error getting title:', e);
                        }
                        try {
                            if (!ogData_1.description) {
                                ogData_1.description =
                                    ((_c = root
                                        .querySelector('meta[name="description"]')) === null || _c === void 0 ? void 0 : _c.getAttribute('content')) || '';
                            }
                        }
                        catch (e) {
                            console.error('Error getting description:', e);
                        }
                        try {
                            if (!ogData_1.image) {
                                ogData_1.image =
                                    ((_d = root
                                        .querySelector('meta[name="twitter:image"]')) === null || _d === void 0 ? void 0 : _d.getAttribute('content')) ||
                                        ((_e = root.querySelector('img[src^="http"]')) === null || _e === void 0 ? void 0 : _e.getAttribute('src')) ||
                                        '';
                            }
                        }
                        catch (e) {
                            console.error('Error getting image:', e);
                        }
                        try {
                            if (!ogData_1.site_name) {
                                ogData_1.site_name =
                                    ((_f = root
                                        .querySelector('meta[name="application-name"]')) === null || _f === void 0 ? void 0 : _f.getAttribute('content')) ||
                                        ((_g = root
                                            .querySelector('meta[name="site_name"]')) === null || _g === void 0 ? void 0 : _g.getAttribute('content')) ||
                                        new URL(url).hostname;
                            }
                        }
                        catch (e) {
                            console.error('Error getting site name:', e);
                        }
                    }
                    catch (e) {
                        console.error('Error processing HTML:', e);
                    }
                    return [2 /*return*/, ogSchema.parse(ogData_1)];
                case 3:
                    e_1 = _h.sent();
                    console.error('Error in getOpenGraphData:', e_1);
                    return [2 /*return*/, {}];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getOpenGraphData = getOpenGraphData;
