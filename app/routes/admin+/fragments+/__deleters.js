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
exports.__esModule = true;
exports.DeleteImage = exports.DeletePost = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@remix-run/react");
var react_2 = __importStar(require("react"));
var sonner_1 = require("sonner");
var button_tsx_1 = require("#app/components/ui/button.tsx");
var icon_tsx_1 = require("#app/components/ui/icon.tsx");
var status_button_tsx_1 = require("#app/components/ui/status-button.tsx");
function DeletePost(_a) {
    var postId = _a.postId;
    var _b = (0, react_2.useState)(false), showConfirmation = _b[0], setShowConfirmation = _b[1];
    var deleteFetcher = (0, react_1.useFetcher)();
    react_2["default"].useEffect(function () {
        if (deleteFetcher.data) {
            sonner_1.toast.success("Post \"".concat(deleteFetcher.data.title, "\" deleted successfully"));
        }
    }, [deleteFetcher]);
    return ((0, jsx_runtime_1.jsxs)(deleteFetcher.Form, __assign({ method: "POST", action: "/admin/fragments/delete" }, { children: [!showConfirmation && ((0, jsx_runtime_1.jsxs)(button_tsx_1.Button, __assign({ onClick: function () { return setShowConfirmation(true); }, variant: "destructive", type: "button" }, { children: [(0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "trash" }), " Delete"] }))), showConfirmation && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "flex flex-col items-end" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex gap-2" }, { children: [(0, jsx_runtime_1.jsxs)(status_button_tsx_1.StatusButton, __assign({ variant: "destructive", type: "submit", name: "postId", value: postId, status: deleteFetcher.state === 'submitting' ? 'pending' : 'idle' }, { children: [(0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "trash" }), "Confirm"] })), (0, jsx_runtime_1.jsx)(button_tsx_1.Button, __assign({ variant: "default", type: "button", onClick: function () { return setShowConfirmation(false); } }, { children: "No, cancel" }))] })) })))] })));
}
exports.DeletePost = DeletePost;
function DeleteImage(_a) {
    var imageId = _a.imageId;
    var _b = (0, react_2.useState)(false), showConfirmation = _b[0], setShowConfirmation = _b[1];
    var deleteFetcher = (0, react_1.useFetcher)();
    react_2["default"].useEffect(function () {
        if (deleteFetcher.data) {
            sonner_1.toast.success("Image with alt text \"".concat('altText' in deleteFetcher.data ? deleteFetcher.data.altText : '', "\" deleted successfully"));
        }
    }, [deleteFetcher]);
    return ((0, jsx_runtime_1.jsxs)(deleteFetcher.Form, __assign({ method: "POST", action: "/admin/fragments/images/delete" }, { children: [!showConfirmation && ((0, jsx_runtime_1.jsxs)(button_tsx_1.Button, __assign({ onClick: function () { return setShowConfirmation(true); }, variant: "destructive", type: "button", className: "w-full" }, { children: [(0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "trash" }), "Delete"] }))), showConfirmation && ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center gap-4 [&>*]:flex-1" }, { children: [(0, jsx_runtime_1.jsxs)(status_button_tsx_1.StatusButton, __assign({ type: "submit", size: "icon", variant: "destructive", name: "imageId", value: imageId, status: deleteFetcher.state !== 'idle' ? 'pending' : 'idle' }, { children: [(0, jsx_runtime_1.jsx)(icon_tsx_1.Icon, { name: "trash" }), " Confirm"] })), (0, jsx_runtime_1.jsx)(button_tsx_1.Button, __assign({ variant: "default", type: "button", onClick: function () { return setShowConfirmation(false); } }, { children: "No, cancel" }))] })))] })));
}
exports.DeleteImage = DeleteImage;
