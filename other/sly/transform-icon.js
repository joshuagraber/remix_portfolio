"use strict";
exports.__esModule = true;
/**
 * @type {import('@sly-cli/sly/dist').Transformer}
 */
function transformIcon(input, meta) {
    input = prependLicenseInfo(input, meta);
    return input;
}
exports["default"] = transformIcon;
function prependLicenseInfo(input, meta) {
    return [
        "<!-- Downloaded from ".concat(meta.name, " -->"),
        "<!-- License ".concat(meta.license, " -->"),
        "<!-- ".concat(meta.source, " -->"),
        input,
    ].join('\n');
}
