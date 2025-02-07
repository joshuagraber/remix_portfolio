"use strict";
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
exports.setTheme = exports.getTheme = void 0;
var cookie = __importStar(require("cookie"));
var cookieName = 'en_theme';
function getTheme(request) {
    var cookieHeader = request.headers.get('cookie');
    var parsed = cookieHeader ? cookie.parse(cookieHeader)[cookieName] : 'light';
    if (parsed === 'light' || parsed === 'dark')
        return parsed;
    return null;
}
exports.getTheme = getTheme;
function setTheme(theme) {
    if (theme === 'system') {
        return cookie.serialize(cookieName, '', { path: '/', maxAge: -1 });
    }
    else {
        return cookie.serialize(cookieName, theme, { path: '/', maxAge: 31536000 });
    }
}
exports.setTheme = setTheme;
