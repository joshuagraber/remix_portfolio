"use strict";
exports.__esModule = true;
exports.setSearchParamsString = void 0;
function setSearchParamsString(searchParams, changes) {
    var newSearchParams = new URLSearchParams(searchParams);
    for (var _i = 0, _a = Object.entries(changes); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (value === undefined) {
            newSearchParams["delete"](key);
            continue;
        }
        newSearchParams.set(key, String(value));
    }
    return newSearchParams.toString();
}
exports.setSearchParamsString = setSearchParamsString;
