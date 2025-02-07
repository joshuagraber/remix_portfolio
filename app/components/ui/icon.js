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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Icon = exports.href = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var sprite_svg_1 = __importDefault(require("./icons/sprite.svg"));
exports.href = sprite_svg_1["default"];
var sizeClassName = {
    font: 'w-[1em] h-[1em]',
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
};
var childrenSizeClassName = {
    font: 'gap-1.5',
    xs: 'gap-1.5',
    sm: 'gap-1.5',
    md: 'gap-2',
    lg: 'gap-2',
    xl: 'gap-3'
};
/**
 * Renders an SVG icon. The icon defaults to the size of the font. To make it
 * align vertically with neighboring text, you can pass the text as a child of
 * the icon and it will be automatically aligned.
 * Alternatively, if you're not ok with the icon being to the left of the text,
 * you need to wrap the icon and text in a common parent and set the parent to
 * display "flex" (or "inline-flex") with "items-center" and a reasonable gap.
 *
 * Pass `title` prop to the `Icon` component to get `<title>` element rendered
 * in the SVG container, providing this way for accessibility.
 */
function Icon(_a) {
    var name = _a.name, _b = _a.size, size = _b === void 0 ? 'font' : _b, className = _a.className, title = _a.title, children = _a.children, props = __rest(_a, ["name", "size", "className", "title", "children"]);
    if (children) {
        return ((0, jsx_runtime_1.jsxs)("span", __assign({ className: "inline-flex items-center ".concat(childrenSizeClassName[size]) }, { children: [(0, jsx_runtime_1.jsx)(Icon, __assign({ name: name, size: size, className: className, title: title }, props)), children] })));
    }
    return ((0, jsx_runtime_1.jsxs)("svg", __assign({}, props, { className: (0, misc_tsx_1.cn)(sizeClassName[size], 'inline self-center', className) }, { children: [title ? (0, jsx_runtime_1.jsx)("title", { children: title }) : null, (0, jsx_runtime_1.jsx)("use", { href: "".concat(sprite_svg_1["default"], "#").concat(name) })] })));
}
exports.Icon = Icon;
