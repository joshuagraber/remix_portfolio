"use strict";
exports.__esModule = true;
var faker_1 = require("@faker-js/faker");
var vitest_1 = require("vitest");
var setup_test_env_ts_1 = require("#tests/setup/setup-test-env.ts");
var misc_tsx_1 = require("./misc.tsx");
(0, vitest_1.test)('Error object returns message', function () {
    var message = faker_1.faker.lorem.words(2);
    (0, vitest_1.expect)((0, misc_tsx_1.getErrorMessage)(new Error(message))).toBe(message);
});
(0, vitest_1.test)('String returns itself', function () {
    var message = faker_1.faker.lorem.words(2);
    (0, vitest_1.expect)((0, misc_tsx_1.getErrorMessage)(message)).toBe(message);
});
(0, vitest_1.test)('undefined falls back to Unknown', function () {
    setup_test_env_ts_1.consoleError.mockImplementation(function () { });
    (0, vitest_1.expect)((0, misc_tsx_1.getErrorMessage)(undefined)).toBe('Unknown Error');
    (0, vitest_1.expect)(setup_test_env_ts_1.consoleError).toHaveBeenCalledWith('Unable to get error message for error', undefined);
    (0, vitest_1.expect)(setup_test_env_ts_1.consoleError).toHaveBeenCalledTimes(1);
});
