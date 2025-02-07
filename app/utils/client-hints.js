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
exports.ClientHintCheck = exports.useOptionalHints = exports.useHints = exports.getHints = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
/**
 * This file contains utilities for using client hints for user preference which
 * are needed by the server, but are only known by the browser.
 */
var client_hints_1 = require("@epic-web/client-hints");
var color_scheme_1 = require("@epic-web/client-hints/color-scheme");
var time_zone_1 = require("@epic-web/client-hints/time-zone");
var react_1 = require("@remix-run/react");
var React = __importStar(require("react"));
var request_info_ts_1 = require("./request-info.ts");
var hintsUtils = (0, client_hints_1.getHintUtils)({
    theme: color_scheme_1.clientHint,
    timeZone: time_zone_1.clientHint
});
exports.getHints = hintsUtils.getHints;
/**
 * @returns an object with the client hints and their values
 */
function useHints() {
    var requestInfo = (0, request_info_ts_1.useRequestInfo)();
    return requestInfo.hints;
}
exports.useHints = useHints;
function useOptionalHints() {
    var requestInfo = (0, request_info_ts_1.useOptionalRequestInfo)();
    return requestInfo === null || requestInfo === void 0 ? void 0 : requestInfo.hints;
}
exports.useOptionalHints = useOptionalHints;
/**
 * @returns inline script element that checks for client hints and sets cookies
 * if they are not set then reloads the page if any cookie was set to an
 * inaccurate value.
 */
function ClientHintCheck(_a) {
    var nonce = _a.nonce;
    var revalidate = (0, react_1.useRevalidator)().revalidate;
    React.useEffect(function () { return (0, color_scheme_1.subscribeToSchemeChange)(function () { return revalidate(); }); }, [revalidate]);
    return ((0, jsx_runtime_1.jsx)("script", { nonce: nonce, dangerouslySetInnerHTML: {
            __html: hintsUtils.getClientHintCheckScript()
        } }));
}
exports.ClientHintCheck = ClientHintCheck;
