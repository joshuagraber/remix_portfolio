"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var tailwindcss_animate_1 = __importDefault(require("tailwindcss-animate"));
var tailwindcss_radix_1 = __importDefault(require("tailwindcss-radix"));
var extended_theme_ts_1 = require("./app/utils/extended-theme.ts");
exports["default"] = {
    content: ['./app/**/*.{ts,tsx,jsx,js}'],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: extended_theme_ts_1.extendedTheme
    },
    plugins: [tailwindcss_animate_1["default"], tailwindcss_radix_1["default"]]
};
