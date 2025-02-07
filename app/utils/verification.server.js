"use strict";
exports.__esModule = true;
exports.verifySessionStorage = void 0;
var node_1 = require("@remix-run/node");
exports.verifySessionStorage = (0, node_1.createCookieSessionStorage)({
    cookie: {
        name: 'en_verification',
        sameSite: 'lax',
        path: '/',
        httpOnly: true,
        maxAge: 60 * 10,
        secrets: process.env.SESSION_SECRET.split(','),
        secure: process.env.NODE_ENV === 'production'
    }
});
