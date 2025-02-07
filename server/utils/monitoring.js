"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.init = void 0;
var profiling_node_1 = require("@sentry/profiling-node");
var remix_1 = __importDefault(require("@sentry/remix"));
function init() {
    remix_1["default"].init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV,
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 1 : 0,
        autoInstrumentRemix: true,
        denyUrls: [
            /\/resources\/healthcheck/,
            // TODO: be smarter about the public assets...
            /\/build\//,
            /\/favicons\//,
            /\/img\//,
            /\/fonts\//,
            /\/favicon.ico/,
            /\/site\.webmanifest/,
        ],
        integrations: [
            remix_1["default"].httpIntegration(),
            remix_1["default"].prismaIntegration(),
            (0, profiling_node_1.nodeProfilingIntegration)(),
        ],
        tracesSampler: function (samplingContext) {
            var _a, _b;
            // ignore healthcheck transactions by other services (consul, etc.)
            if ((_b = (_a = samplingContext.request) === null || _a === void 0 ? void 0 : _a.url) === null || _b === void 0 ? void 0 : _b.includes('/resources/healthcheck')) {
                return 0;
            }
            return 1;
        },
        beforeSendTransaction: function (event) {
            var _a, _b;
            // ignore all healthcheck related transactions
            //  note that name of header here is case-sensitive
            if (((_b = (_a = event.request) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b['x-healthcheck']) === 'true') {
                return null;
            }
            return event;
        }
    });
}
exports.init = init;
