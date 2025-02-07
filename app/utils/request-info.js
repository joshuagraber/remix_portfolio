"use strict";
exports.__esModule = true;
exports.useOptionalRequestInfo = exports.useRequestInfo = void 0;
var invariant_1 = require("@epic-web/invariant");
var react_1 = require("@remix-run/react");
/**
 * @returns the request info from the root loader (throws an error if it does not exist)
 */
function useRequestInfo() {
    var maybeRequestInfo = useOptionalRequestInfo();
    (0, invariant_1.invariant)(maybeRequestInfo, 'No requestInfo found in root loader');
    return maybeRequestInfo;
}
exports.useRequestInfo = useRequestInfo;
function useOptionalRequestInfo() {
    var data = (0, react_1.useRouteLoaderData)('root');
    return data === null || data === void 0 ? void 0 : data.requestInfo;
}
exports.useOptionalRequestInfo = useOptionalRequestInfo;
