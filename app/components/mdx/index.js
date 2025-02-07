"use strict";
exports.__esModule = true;
exports.mdxComponents = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var link_preview_1 = require("../link-preview");
var youtube_1 = require("./youtube");
exports.mdxComponents = {
    // Directive components must match the directive name exactly
    youtube: function (_a) {
        var id = _a.id;
        return (0, jsx_runtime_1.jsx)(youtube_1.YouTubeEmbed, { id: id });
    },
    preview: function (_a) {
        var url = _a.url;
        return (0, jsx_runtime_1.jsx)(link_preview_1.LinkPreview, { url: url });
    }
};
