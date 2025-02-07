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
exports.downloadFile = exports.useDebounce = exports.useDoubleCheck = exports.useDelayedIsPending = exports.useIsPending = exports.combineResponseInits = exports.combineHeaders = exports.mergeHeaders = exports.getReferrerRoute = exports.getDomainUrl = exports.cn = exports.getErrorMessage = exports.getPostImageSource = exports.getUserImgSrc = void 0;
var react_1 = require("@remix-run/react");
var clsx_1 = require("clsx");
var react_2 = require("react");
var spin_delay_1 = require("spin-delay");
var tailwind_merge_1 = require("tailwind-merge");
var extended_theme_ts_1 = require("./extended-theme.ts");
function getUserImgSrc(imageId) {
    return imageId ? "/resources/user-images/".concat(imageId) : '/img/user.png';
}
exports.getUserImgSrc = getUserImgSrc;
function getPostImageSource(imageId) {
    return "/resources/post-images/".concat(imageId);
}
exports.getPostImageSource = getPostImageSource;
function getErrorMessage(error) {
    if (typeof error === 'string')
        return error;
    if (error &&
        typeof error === 'object' &&
        'message' in error &&
        typeof error.message === 'string') {
        return error.message;
    }
    console.error('Unable to get error message for error', error);
    return 'Unknown Error';
}
exports.getErrorMessage = getErrorMessage;
function formatColors() {
    var _a;
    var colors = [];
    for (var _i = 0, _b = Object.entries(extended_theme_ts_1.extendedTheme.colors); _i < _b.length; _i++) {
        var _c = _b[_i], key = _c[0], color = _c[1];
        if (typeof color === 'string') {
            colors.push(key);
        }
        else {
            var colorGroup = Object.keys(color).map(function (subKey) {
                return subKey === 'DEFAULT' ? '' : subKey;
            });
            colors.push((_a = {}, _a[key] = colorGroup, _a));
        }
    }
    return colors;
}
var customTwMerge = (0, tailwind_merge_1.extendTailwindMerge)({
    extend: {
        theme: {
            colors: formatColors(),
            borderRadius: Object.keys(extended_theme_ts_1.extendedTheme.borderRadius)
        },
        classGroups: {
            'font-size': [
                {
                    text: Object.keys(extended_theme_ts_1.extendedTheme.fontSize)
                },
            ]
        }
    }
});
function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return customTwMerge((0, clsx_1.clsx)(inputs));
}
exports.cn = cn;
function getDomainUrl(request) {
    var _a, _b, _c;
    var host = (_b = (_a = request.headers.get('X-Forwarded-Host')) !== null && _a !== void 0 ? _a : request.headers.get('host')) !== null && _b !== void 0 ? _b : new URL(request.url).host;
    var protocol = (_c = request.headers.get('X-Forwarded-Proto')) !== null && _c !== void 0 ? _c : 'http';
    return "".concat(protocol, "://").concat(host);
}
exports.getDomainUrl = getDomainUrl;
function getReferrerRoute(request) {
    var _a, _b;
    // spelling errors and whatever makes this annoyingly inconsistent
    // in my own testing, `referer` returned the right value, but 🤷‍♂️
    var referrer = (_b = (_a = request.headers.get('referer')) !== null && _a !== void 0 ? _a : request.headers.get('referrer')) !== null && _b !== void 0 ? _b : request.referrer;
    var domain = getDomainUrl(request);
    if (referrer === null || referrer === void 0 ? void 0 : referrer.startsWith(domain)) {
        return referrer.slice(domain.length);
    }
    else {
        return '/';
    }
}
exports.getReferrerRoute = getReferrerRoute;
/**
 * Merge multiple headers objects into one (uses set so headers are overridden)
 */
function mergeHeaders() {
    var headers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        headers[_i] = arguments[_i];
    }
    var merged = new Headers();
    for (var _a = 0, headers_1 = headers; _a < headers_1.length; _a++) {
        var header = headers_1[_a];
        if (!header)
            continue;
        for (var _b = 0, _c = new Headers(header).entries(); _b < _c.length; _b++) {
            var _d = _c[_b], key = _d[0], value = _d[1];
            merged.set(key, value);
        }
    }
    return merged;
}
exports.mergeHeaders = mergeHeaders;
/**
 * Combine multiple header objects into one (uses append so headers are not overridden)
 */
function combineHeaders() {
    var headers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        headers[_i] = arguments[_i];
    }
    var combined = new Headers();
    for (var _a = 0, headers_2 = headers; _a < headers_2.length; _a++) {
        var header = headers_2[_a];
        if (!header)
            continue;
        for (var _b = 0, _c = new Headers(header).entries(); _b < _c.length; _b++) {
            var _d = _c[_b], key = _d[0], value = _d[1];
            combined.append(key, value);
        }
    }
    return combined;
}
exports.combineHeaders = combineHeaders;
/**
 * Combine multiple response init objects into one (uses combineHeaders)
 */
function combineResponseInits() {
    var responseInits = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        responseInits[_i] = arguments[_i];
    }
    var combined = {};
    for (var _a = 0, responseInits_1 = responseInits; _a < responseInits_1.length; _a++) {
        var responseInit = responseInits_1[_a];
        combined = __assign(__assign({}, responseInit), { headers: combineHeaders(combined.headers, responseInit === null || responseInit === void 0 ? void 0 : responseInit.headers) });
    }
    return combined;
}
exports.combineResponseInits = combineResponseInits;
/**
 * Returns true if the current navigation is submitting the current route's
 * form. Defaults to the current route's form action and method POST.
 *
 * Defaults state to 'non-idle'
 *
 * NOTE: the default formAction will include query params, but the
 * navigation.formAction will not, so don't use the default formAction if you
 * want to know if a form is submitting without specific query params.
 */
function useIsPending(_a) {
    var _b = _a === void 0 ? {} : _a, formAction = _b.formAction, _c = _b.formMethod, formMethod = _c === void 0 ? 'POST' : _c, _d = _b.state, state = _d === void 0 ? 'non-idle' : _d;
    var contextualFormAction = (0, react_1.useFormAction)();
    var navigation = (0, react_1.useNavigation)();
    var isPendingState = state === 'non-idle'
        ? navigation.state !== 'idle'
        : navigation.state === state;
    return (isPendingState &&
        navigation.formAction === (formAction !== null && formAction !== void 0 ? formAction : contextualFormAction) &&
        navigation.formMethod === formMethod);
}
exports.useIsPending = useIsPending;
/**
 * This combines useSpinDelay (from https://npm.im/spin-delay) and useIsPending
 * from our own utilities to give you a nice way to show a loading spinner for
 * a minimum amount of time, even if the request finishes right after the delay.
 *
 * This avoids a flash of loading state regardless of how fast or slow the
 * request is.
 */
function useDelayedIsPending(_a) {
    var _b = _a === void 0 ? {} : _a, formAction = _b.formAction, formMethod = _b.formMethod, _c = _b.delay, delay = _c === void 0 ? 400 : _c, _d = _b.minDuration, minDuration = _d === void 0 ? 300 : _d;
    var isPending = useIsPending({ formAction: formAction, formMethod: formMethod });
    var delayedIsPending = (0, spin_delay_1.useSpinDelay)(isPending, {
        delay: delay,
        minDuration: minDuration
    });
    return delayedIsPending;
}
exports.useDelayedIsPending = useDelayedIsPending;
function callAll() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return fns.forEach(function (fn) { return fn === null || fn === void 0 ? void 0 : fn.apply(void 0, args); });
    };
}
/**
 * Use this hook with a button and it will make it so the first click sets a
 * `doubleCheck` state to true, and the second click will actually trigger the
 * `onClick` handler. This allows you to have a button that can be like a
 * "are you sure?" experience for the user before doing destructive operations.
 */
function useDoubleCheck() {
    var _a = (0, react_2.useState)(false), doubleCheck = _a[0], setDoubleCheck = _a[1];
    function getButtonProps(props) {
        var onBlur = function () { return setDoubleCheck(false); };
        var onClick = doubleCheck
            ? undefined
            : function (e) {
                e.preventDefault();
                setDoubleCheck(true);
            };
        var onKeyUp = function (e) {
            if (e.key === 'Escape') {
                setDoubleCheck(false);
            }
        };
        return __assign(__assign({}, props), { onBlur: callAll(onBlur, props === null || props === void 0 ? void 0 : props.onBlur), onClick: callAll(onClick, props === null || props === void 0 ? void 0 : props.onClick), onKeyUp: callAll(onKeyUp, props === null || props === void 0 ? void 0 : props.onKeyUp) });
    }
    return { doubleCheck: doubleCheck, getButtonProps: getButtonProps };
}
exports.useDoubleCheck = useDoubleCheck;
/**
 * Simple debounce implementation
 */
function debounce(fn, delay) {
    var timer = null;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(void 0, args);
        }, delay);
    };
}
/**
 * Debounce a callback function
 */
function useDebounce(callback, delay) {
    var callbackRef = (0, react_2.useRef)(callback);
    (0, react_2.useEffect)(function () {
        callbackRef.current = callback;
    });
    return (0, react_2.useMemo)(function () {
        return debounce(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return callbackRef.current.apply(callbackRef, args);
        }, delay);
    }, [delay]);
}
exports.useDebounce = useDebounce;
function downloadFile(url, retries) {
    var _a;
    if (retries === void 0) { retries = 0; }
    return __awaiter(this, void 0, void 0, function () {
        var MAX_RETRIES, response, contentType, blob, _b, _c, e_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    MAX_RETRIES = 3;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _d.sent();
                    if (!response.ok) {
                        throw new Error("Failed to fetch image with status ".concat(response.status));
                    }
                    contentType = (_a = response.headers.get('content-type')) !== null && _a !== void 0 ? _a : 'image/jpg';
                    _c = (_b = Buffer).from;
                    return [4 /*yield*/, response.arrayBuffer()];
                case 3:
                    blob = _c.apply(_b, [_d.sent()]);
                    return [2 /*return*/, { contentType: contentType, blob: blob }];
                case 4:
                    e_1 = _d.sent();
                    if (retries > MAX_RETRIES)
                        throw e_1;
                    return [2 /*return*/, downloadFile(url, retries + 1)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.downloadFile = downloadFile;
