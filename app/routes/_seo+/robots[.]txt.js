"use strict";
exports.__esModule = true;
exports.loader = void 0;
var remix_seo_1 = require("@nasa-gcn/remix-seo");
var misc_tsx_1 = require("#app/utils/misc.tsx");
function loader(_a) {
    var request = _a.request;
    return (0, remix_seo_1.generateRobotsTxt)([
        { type: 'sitemap', value: "".concat((0, misc_tsx_1.getDomainUrl)(request), "/sitemap.xml") },
    ]);
}
exports.loader = loader;
