"use strict";
exports.__esModule = true;
exports.init = void 0;
var react_1 = require("@remix-run/react");
var remix_1 = require("@sentry/remix");
var react_2 = require("react");
function init() {
    (0, remix_1.init)({
        dsn: ENV.SENTRY_DSN,
        environment: ENV.MODE,
        beforeSend: function (event) {
            var _a;
            if ((_a = event.request) === null || _a === void 0 ? void 0 : _a.url) {
                var url = new URL(event.request.url);
                if (url.protocol === 'chrome-extension:' ||
                    url.protocol === 'moz-extension:') {
                    // This error is from a browser extension, ignore it
                    return null;
                }
            }
            return event;
        },
        integrations: [
            (0, remix_1.browserTracingIntegration)({
                useEffect: react_2.useEffect,
                useLocation: react_1.useLocation,
                useMatches: react_1.useMatches
            }),
            (0, remix_1.replayIntegration)(),
            (0, remix_1.browserProfilingIntegration)(),
        ],
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
        // Capture Replay for 10% of all sessions,
        // plus for 100% of sessions with an error
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0
    });
}
exports.init = init;
