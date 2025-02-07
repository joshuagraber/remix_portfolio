"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var node_path_1 = __importDefault(require("node:path"));
var node_url_1 = require("node:url");
var esbuild_1 = __importDefault(require("esbuild"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var glob_1 = require("glob");
var pkg = fs_extra_1["default"].readJsonSync(node_path_1["default"].join(process.cwd(), 'package.json'));
var __dirname = node_path_1["default"].dirname((0, node_url_1.fileURLToPath)(import.meta.url));
var here = function () {
    var s = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        s[_i] = arguments[_i];
    }
    return node_path_1["default"].join.apply(node_path_1["default"], __spreadArray([__dirname], s, false));
};
var globsafe = function (s) { return s.replace(/\\/g, '/'); };
var allFiles = (0, glob_1.globSync)(globsafe(here('../server/**/*.*')), {
    ignore: [
        'server/dev-server.js',
        '**/tsconfig.json',
        '**/eslint*',
        '**/__tests__/**',
    ]
});
var entries = [];
for (var _i = 0, allFiles_1 = allFiles; _i < allFiles_1.length; _i++) {
    var file = allFiles_1[_i];
    if (/\.(ts|js|tsx|jsx)$/.test(file)) {
        entries.push(file);
    }
    else {
        var dest = file.replace(here('../server'), here('../server-build'));
        fs_extra_1["default"].ensureDirSync(node_path_1["default"].parse(dest).dir);
        fs_extra_1["default"].copySync(file, dest);
        console.log("copied: ".concat(file.replace("".concat(here('../server'), "/"), '')));
    }
}
console.log();
console.log('building...');
esbuild_1["default"]
    .build({
    entryPoints: entries,
    outdir: here('../server-build'),
    target: ["node".concat(pkg.engines.node)],
    platform: 'node',
    sourcemap: true,
    format: 'esm',
    logLevel: 'info'
})["catch"](function (error) {
    console.error(error);
    process.exit(1);
});
