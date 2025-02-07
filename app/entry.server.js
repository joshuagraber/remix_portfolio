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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.handleError = exports.handleDataRequest = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var node_stream_1 = require("node:stream");
var node_1 = require("@remix-run/node");
var react_1 = require("@remix-run/react");
var Sentry = __importStar(require("@sentry/remix"));
var chalk_1 = __importDefault(require("chalk"));
var isbot_1 = require("isbot");
var server_1 = require("react-dom/server");
var env_server_ts_1 = require("./utils/env.server.ts");
var litefs_server_ts_1 = require("./utils/litefs.server.ts");
var nonce_provider_ts_1 = require("./utils/nonce-provider.ts");
var timing_server_ts_1 = require("./utils/timing.server.ts");
var ABORT_DELAY = 5000;
(0, env_server_ts_1.init)();
global.ENV = (0, env_server_ts_1.getEnv)();
function handleRequest() {
    var _a, _b, _c, _d;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var request, responseStatusCode, responseHeaders, remixContext, loadContext, _e, currentInstance, primaryInstance, callbackName, nonce;
        var _this = this;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    request = args[0], responseStatusCode = args[1], responseHeaders = args[2], remixContext = args[3], loadContext = args[4];
                    return [4 /*yield*/, (0, litefs_server_ts_1.getInstanceInfo)()];
                case 1:
                    _e = _f.sent(), currentInstance = _e.currentInstance, primaryInstance = _e.primaryInstance;
                    responseHeaders.set('fly-region', (_a = process.env.FLY_REGION) !== null && _a !== void 0 ? _a : 'unknown');
                    responseHeaders.set('fly-app', (_b = process.env.FLY_APP_NAME) !== null && _b !== void 0 ? _b : 'unknown');
                    responseHeaders.set('fly-primary-instance', primaryInstance);
                    responseHeaders.set('fly-instance', currentInstance);
                    if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
                        responseHeaders.append('Document-Policy', 'js-profiling');
                    }
                    callbackName = (0, isbot_1.isbot)(request.headers.get('user-agent'))
                        ? 'onAllReady'
                        : 'onShellReady';
                    nonce = (_d = (_c = loadContext.cspNonce) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '';
                    return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var didError, timings, _a, pipe, abort;
                            var _b;
                            return __generator(this, function (_c) {
                                didError = false;
                                timings = (0, timing_server_ts_1.makeTimings)('render', 'renderToPipeableStream');
                                _a = (0, server_1.renderToPipeableStream)((0, jsx_runtime_1.jsx)(nonce_provider_ts_1.NonceProvider, __assign({ value: nonce }, { children: (0, jsx_runtime_1.jsx)(react_1.RemixServer, { context: remixContext, url: request.url }) })), (_b = {},
                                    _b[callbackName] = function () {
                                        var body = new node_stream_1.PassThrough();
                                        responseHeaders.set('Content-Type', 'text/html');
                                        responseHeaders.append('Server-Timing', timings.toString());
                                        resolve(new Response((0, node_1.createReadableStreamFromReadable)(body), {
                                            headers: responseHeaders,
                                            status: didError ? 500 : responseStatusCode
                                        }));
                                        pipe(body);
                                    },
                                    _b.onShellError = function (err) {
                                        reject(err);
                                    },
                                    _b.onError = function () {
                                        didError = true;
                                    },
                                    _b.nonce = nonce,
                                    _b)), pipe = _a.pipe, abort = _a.abort;
                                setTimeout(abort, ABORT_DELAY);
                                return [2 /*return*/];
                            });
                        }); })];
            }
        });
    });
}
exports["default"] = handleRequest;
function handleDataRequest(response) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var _c, currentInstance, primaryInstance;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, (0, litefs_server_ts_1.getInstanceInfo)()];
                case 1:
                    _c = _d.sent(), currentInstance = _c.currentInstance, primaryInstance = _c.primaryInstance;
                    response.headers.set('fly-region', (_a = process.env.FLY_REGION) !== null && _a !== void 0 ? _a : 'unknown');
                    response.headers.set('fly-app', (_b = process.env.FLY_APP_NAME) !== null && _b !== void 0 ? _b : 'unknown');
                    response.headers.set('fly-primary-instance', primaryInstance);
                    response.headers.set('fly-instance', currentInstance);
                    return [2 /*return*/, response];
            }
        });
    });
}
exports.handleDataRequest = handleDataRequest;
function handleError(error, _a) {
    var request = _a.request;
    // Skip capturing if the request is aborted as Remix docs suggest
    // Ref: https://remix.run/docs/en/main/file-conventions/entry.server#handleerror
    if (request.signal.aborted) {
        return;
    }
    if (error instanceof Error) {
        console.error(chalk_1["default"].red(error.stack));
        void Sentry.captureRemixServerException(error, 'remix.server', request, true);
    }
    else {
        console.error(error);
        Sentry.captureException(error);
    }
}
exports.handleError = handleError;
