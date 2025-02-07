"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.server = void 0;
var close_with_grace_1 = __importDefault(require("close-with-grace"));
var node_1 = require("msw/node");
var github_ts_1 = require("./github.ts");
var resend_ts_1 = require("./resend.ts");
exports.server = node_1.setupServer.apply(void 0, __spreadArray(__spreadArray([], resend_ts_1.handlers, false), github_ts_1.handlers, false));
exports.server.listen({
    onUnhandledRequest: function (request, print) {
        // Do not print warnings on unhandled requests to https://<:userId>.ingest.us.sentry.io/api/
        // Note: a request handler with passthrough is not suited with this type of url
        //       until there is a more permissible url catching system
        //       like requested at https://github.com/mswjs/msw/issues/1804
        if (request.url.includes('.sentry.io')) {
            return;
        }
        // Print the regular MSW unhandled request warning otherwise.
        print.warning();
    }
});
if (process.env.NODE_ENV !== 'test') {
    console.info('🔶 Mock server installed');
    (0, close_with_grace_1["default"])(function () {
        exports.server.close();
    });
}
