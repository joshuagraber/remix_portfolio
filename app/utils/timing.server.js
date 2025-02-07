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
exports.cachifiedTimingReporter = exports.combineServerTimings = exports.getServerTimeHeader = exports.time = exports.makeTimings = void 0;
function makeTimings(type, desc) {
    var _a;
    var timings = (_a = {},
        _a[type] = [{ desc: desc, start: performance.now() }],
        _a);
    Object.defineProperty(timings, 'toString', {
        value: function () {
            return getServerTimeHeader(timings);
        },
        enumerable: false
    });
    return timings;
}
exports.makeTimings = makeTimings;
function createTimer(type, desc) {
    var start = performance.now();
    return {
        end: function (timings) {
            var timingType = timings[type];
            if (!timingType) {
                timingType = timings[type] = [];
            }
            timingType.push({ desc: desc, time: performance.now() - start });
        }
    };
}
function time(fn, _a) {
    var type = _a.type, desc = _a.desc, timings = _a.timings;
    return __awaiter(this, void 0, void 0, function () {
        var timer, promise, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    timer = createTimer(type, desc);
                    promise = typeof fn === 'function' ? fn() : fn;
                    if (!timings)
                        return [2 /*return*/, promise];
                    return [4 /*yield*/, promise];
                case 1:
                    result = _b.sent();
                    timer.end(timings);
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.time = time;
function getServerTimeHeader(timings) {
    if (!timings)
        return '';
    return Object.entries(timings)
        .map(function (_a) {
        var key = _a[0], timingInfos = _a[1];
        var dur = timingInfos
            .reduce(function (acc, timingInfo) {
            var _a;
            var time = (_a = timingInfo.time) !== null && _a !== void 0 ? _a : performance.now() - timingInfo.start;
            return acc + time;
        }, 0)
            .toFixed(1);
        var desc = timingInfos
            .map(function (t) { return t.desc; })
            .filter(Boolean)
            .join(' & ');
        return [
            key.replaceAll(/(:| |@|=|;|,|\/|\\)/g, '_'),
            desc ? "desc=".concat(JSON.stringify(desc)) : null,
            "dur=".concat(dur),
        ]
            .filter(Boolean)
            .join(';');
    })
        .join(',');
}
exports.getServerTimeHeader = getServerTimeHeader;
function combineServerTimings(headers1, headers2) {
    var _a, _b;
    var newHeaders = new Headers(headers1);
    newHeaders.append('Server-Timing', (_a = headers2.get('Server-Timing')) !== null && _a !== void 0 ? _a : '');
    return (_b = newHeaders.get('Server-Timing')) !== null && _b !== void 0 ? _b : '';
}
exports.combineServerTimings = combineServerTimings;
function cachifiedTimingReporter(timings) {
    if (!timings)
        return;
    return function (_a) {
        var key = _a.key;
        var cacheRetrievalTimer = createTimer("cache:".concat(key), "".concat(key, " cache retrieval"));
        var getFreshValueTimer;
        return function (event) {
            switch (event.name) {
                case 'getFreshValueStart':
                    getFreshValueTimer = createTimer("getFreshValue:".concat(key), "request forced to wait for a fresh ".concat(key, " value"));
                    break;
                case 'getFreshValueSuccess':
                    getFreshValueTimer === null || getFreshValueTimer === void 0 ? void 0 : getFreshValueTimer.end(timings);
                    break;
                case 'done':
                    cacheRetrievalTimer.end(timings);
                    break;
            }
        };
    };
}
exports.cachifiedTimingReporter = cachifiedTimingReporter;
