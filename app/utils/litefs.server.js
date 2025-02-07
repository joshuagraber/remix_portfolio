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
exports.__esModule = true;
exports.ensureInstance = exports.ensurePrimary = exports.getInstanceInfoSync = exports.getInternalInstanceDomain = exports.getAllInstances = exports.getInstanceInfo = void 0;
// litefs-js should be used server-side only. It imports `fs` which results in Remix
// including a big polyfill. So we put the import in a `.server.ts` file to avoid that
// polyfill from being included. https://github.com/epicweb-dev/epic-stack/pull/331
var litefs_js_1 = require("litefs-js");
__createBinding(exports, litefs_js_1, "getInstanceInfo");
__createBinding(exports, litefs_js_1, "getAllInstances");
__createBinding(exports, litefs_js_1, "getInternalInstanceDomain");
__createBinding(exports, litefs_js_1, "getInstanceInfoSync");
var remix_js_1 = require("litefs-js/remix.js");
__createBinding(exports, remix_js_1, "ensurePrimary");
__createBinding(exports, remix_js_1, "ensureInstance");
