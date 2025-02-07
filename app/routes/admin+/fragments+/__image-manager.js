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
exports.__esModule = true;
exports.PostImageManager = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@remix-run/react");
var react_2 = __importStar(require("react"));
var sonner_1 = require("sonner");
var forms_tsx_1 = require("#app/components/forms.tsx");
var button_1 = require("#app/components/ui/button");
var icon_tsx_1 = require("#app/components/ui/icon.tsx");
var status_button_tsx_1 = require("#app/components/ui/status-button.tsx");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var __deleters_1 = require("./__deleters");
function PostImageManager(_a) {
    var _this = this;
    var images = _a.images;
    var _b = (0, react_2.useState)(null), copiedId = _b[0], setCopiedId = _b[1];
    var imageCreateFetcher = (0, react_1.useFetcher)();
    var handleCopyMarkdown = function (image) { return __awaiter(_this, void 0, void 0, function () {
        var path, markdown, textArea;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    path = (0, misc_tsx_1.getPostImageSource)(image.id);
                    markdown = "![".concat(image.altText, "](").concat(path).concat(image.title ? " \"".concat(image.title, "\"") : '', ")");
                    // Safari mobile fallback using execCommand
                    if (navigator.clipboard === undefined) {
                        textArea = document.createElement('textarea');
                        textArea.value = markdown;
                        document.body.appendChild(textArea);
                        textArea.select();
                        try {
                            document.execCommand('copy');
                            setCopiedId(image.id);
                            setTimeout(function () { return setCopiedId(null); }, 2500);
                        }
                        catch (err) {
                            console.error('Failed to copy text: ', err);
                        }
                        document.body.removeChild(textArea);
                        return [2 /*return*/];
                    }
                    // Modern browsers
                    return [4 /*yield*/, navigator.clipboard.writeText(markdown)];
                case 1:
                    // Modern browsers
                    _a.sent();
                    setCopiedId(image.id);
                    setTimeout(function () { return setCopiedId(null); }, 2500);
                    return [2 /*return*/];
            }
        });
    }); };
    react_2["default"].useEffect(function () {
        if (imageCreateFetcher.data) {
            if (typeof imageCreateFetcher.data === 'object' &&
                'error' in imageCreateFetcher.data) {
                sonner_1.toast.error(imageCreateFetcher.data.error);
            }
            if (typeof imageCreateFetcher.data === 'string') {
                sonner_1.toast.success('Image uploaded successfully!');
            }
        }
    }, [imageCreateFetcher.data]);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "max-h-[700px] overflow-y-scroll" }, { children: [(0, jsx_runtime_1.jsx)("h4", { children: "Upload new image" }), (0, jsx_runtime_1.jsxs)(imageCreateFetcher.Form, __assign({ method: "POST", action: "/admin/fragments/images/create", encType: "multipart/form-data", className: "mb-12 space-y-6" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col gap-4" }, { children: [(0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { labelProps: {
                                    children: 'Image'
                                }, inputProps: {
                                    type: 'file',
                                    name: 'file',
                                    accept: 'image/*',
                                    className: 'flex w-full h-auto rounded-md border border-input bg-background px-3 py-2 text-sm text-slate-500 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-primary-foreground file:bg-primary hover:file:cursor-pointer'
                                } }), (0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { labelProps: { children: 'Alt Text' }, inputProps: {
                                    type: 'text',
                                    name: 'altText',
                                    placeholder: 'Descriptive alt text for the image'
                                } }), (0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { labelProps: { children: 'Title' }, inputProps: {
                                    type: 'text',
                                    name: 'title',
                                    placeholder: 'Image title'
                                } })] })), (0, jsx_runtime_1.jsx)(button_1.Button, __assign({ type: "submit" }, { children: imageCreateFetcher.state === 'submitting'
                            ? 'Uploading...'
                            : 'Upload Image' }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" }, { children: [(0, jsx_runtime_1.jsx)("h4", __assign({ className: "col-span-1 sm:col-span-2 lg:col-span-3" }, { children: "Update current images" })), images.map(function (image) {
                        var _a;
                        return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "space-y-4 rounded-lg border p-4" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "relative aspect-video" }, { children: (0, jsx_runtime_1.jsx)("img", { src: (0, misc_tsx_1.getPostImageSource)(image.id), alt: (_a = image.altText) !== null && _a !== void 0 ? _a : '', className: "h-full w-full rounded-md object-cover" }) })), (0, jsx_runtime_1.jsx)(ImageMetadataForm, { image: image }), (0, jsx_runtime_1.jsx)(__deleters_1.DeleteImage, { imageId: image.id }), (0, jsx_runtime_1.jsx)(button_1.Button, __assign({ onClick: function () { return handleCopyMarkdown(image); }, variant: "outline", className: "w-full" }, { children: copiedId === image.id ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "check" }), " Copied!"] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "copy" }), "Copy markdown"] })) }))] }), image.id));
                    })] }))] })));
}
exports.PostImageManager = PostImageManager;
function ImageMetadataForm(_a) {
    var _b, _c;
    var image = _a.image;
    var fetcher = (0, react_1.useFetcher)();
    return ((0, jsx_runtime_1.jsxs)(fetcher.Form, __assign({ method: "POST", action: "/admin/fragments/images/edit" }, { children: [(0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { labelProps: { children: 'Alt text' }, inputProps: {
                    name: 'altText',
                    defaultValue: (_b = image.altText) !== null && _b !== void 0 ? _b : '',
                    type: 'text'
                } }), (0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { labelProps: { children: 'Title' }, inputProps: {
                    name: 'title',
                    defaultValue: (_c = image.title) !== null && _c !== void 0 ? _c : '',
                    type: 'text'
                } }), (0, jsx_runtime_1.jsx)(forms_tsx_1.Field, { className: "hidden", labelProps: { children: 'Image ID' }, inputProps: {
                    name: 'imageId',
                    defaultValue: image.id,
                    type: 'text'
                } }), (0, jsx_runtime_1.jsx)(status_button_tsx_1.StatusButton, __assign({ type: "submit", className: "w-full", status: fetcher.state !== 'idle'
                    ? 'pending'
                    : fetcher.data && fetcher.state === 'idle'
                        ? 'success'
                        : 'idle' }, { children: "Update metadata" }))] })));
}
