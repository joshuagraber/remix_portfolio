"use strict";
exports.__esModule = true;
exports.consoleError = void 0;
require("dotenv/config");
require("./db-setup.ts");
require("#app/utils/env.server.ts");
// we need these to be imported first 👆
var react_1 = require("@testing-library/react");
var vitest_1 = require("vitest");
var index_ts_1 = require("#tests/mocks/index.ts");
require("./custom-matchers.ts");
(0, vitest_1.afterEach)(function () { return index_ts_1.server.resetHandlers(); });
(0, vitest_1.afterEach)(function () { return (0, react_1.cleanup)(); });
(0, vitest_1.beforeEach)(function () {
    var originalConsoleError = console.error;
    exports.consoleError = vitest_1.vi.spyOn(console, 'error');
    exports.consoleError.mockImplementation(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        originalConsoleError.apply(void 0, args);
        throw new Error('Console error was called. Call consoleError.mockImplementation(() => {}) if this is expected.');
    });
});
