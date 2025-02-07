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
exports.getRedirectCookieValue = exports.getRedirectCookieHeader = exports.destroyRedirectToHeader = void 0;
var cookie = __importStar(require("cookie"));
var key = 'redirectTo';
exports.destroyRedirectToHeader = cookie.serialize(key, '', { maxAge: -1 });
function getRedirectCookieHeader(redirectTo) {
    return redirectTo && redirectTo !== '/'
        ? cookie.serialize(key, redirectTo, { maxAge: 60 * 10 })
        : null;
}
exports.getRedirectCookieHeader = getRedirectCookieHeader;
function getRedirectCookieValue(request) {
    var rawCookie = request.headers.get('cookie');
    var parsedCookies = rawCookie ? cookie.parse(rawCookie) : {};
    var redirectTo = parsedCookies[key];
    return redirectTo || null;
}
exports.getRedirectCookieValue = getRedirectCookieValue;
