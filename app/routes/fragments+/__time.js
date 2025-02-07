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
exports.__esModule = true;
exports.Time = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var date_fns_1 = require("date-fns");
function Time(_a) {
    var time = _a.time;
    return (0, jsx_runtime_1.jsx)("time", __assign({ dateTime: time }, { children: (0, date_fns_1.format)(new Date(time), 'd MMMM yyyy') }));
}
exports.Time = Time;
