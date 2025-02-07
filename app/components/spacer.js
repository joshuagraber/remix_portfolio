"use strict";
exports.__esModule = true;
exports.Spacer = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var misc_tsx_1 = require("#app/utils/misc.tsx");
function Spacer(_a) {
    var size = _a.size;
    var options = {
        '4xs': 'h-3 md:h-4',
        '3xs': 'h-6 md:h-8',
        '2xs': 'h-8 md:h-12',
        xs: 'h-12 md:h-16',
        sm: 'h-16 md:h-20',
        md: 'h-20 md:h-24',
        lg: 'h-24 md:h-28',
        xl: 'h-26 md:h-32',
        '2xl': 'h-28 md:h-36',
        '3xl': 'h-32 md:h-40',
        '4xl': 'h-38 md:h-44'
    };
    var className = options[size];
    return (0, jsx_runtime_1.jsx)("span", { className: (0, misc_tsx_1.cn)(className, 'block') });
}
exports.Spacer = Spacer;
