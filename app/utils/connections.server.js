"use strict";
exports.__esModule = true;
exports.resolveConnectionData = exports.handleMockAction = exports.providers = exports.connectionSessionStorage = void 0;
var node_1 = require("@remix-run/node");
var github_server_ts_1 = require("./providers/github.server.ts");
exports.connectionSessionStorage = (0, node_1.createCookieSessionStorage)({
    cookie: {
        name: 'en_connection',
        sameSite: 'lax',
        path: '/',
        httpOnly: true,
        maxAge: 60 * 10,
        secrets: process.env.SESSION_SECRET.split(','),
        secure: process.env.NODE_ENV === 'production'
    }
});
exports.providers = {
    github: new github_server_ts_1.GitHubProvider()
};
function handleMockAction(providerName, request) {
    return exports.providers[providerName].handleMockAction(request);
}
exports.handleMockAction = handleMockAction;
function resolveConnectionData(providerName, providerId, options) {
    return exports.providers[providerName].resolveConnectionData(providerId, options);
}
exports.resolveConnectionData = resolveConnectionData;
