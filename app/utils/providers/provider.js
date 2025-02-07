"use strict";
exports.__esModule = true;
exports.normalizeUsername = exports.normalizeEmail = void 0;
var normalizeEmail = function (s) { return s.toLowerCase(); };
exports.normalizeEmail = normalizeEmail;
var normalizeUsername = function (s) {
    return s.replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
};
exports.normalizeUsername = normalizeUsername;
