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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.loader = exports.meta = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var node_1 = require("@remix-run/node");
var react_1 = require("@remix-run/react");
var react_router_dom_1 = require("react-router-dom");
var link_preview_1 = require("#app/components/link-preview");
var spacer_1 = require("#app/components/spacer");
var db_server_1 = require("#app/utils/db.server");
var __time_1 = require("./fragments+/__time");
var meta = function () { return [{ title: 'Joshua D. Graber' }]; };
exports.meta = meta;
function loader() {
    return __awaiter(this, void 0, void 0, function () {
        var recentFragments;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_server_1.prisma.post.findMany({
                        where: {
                            publishAt: {
                                not: null,
                                lte: new Date()
                            }
                        },
                        orderBy: {
                            publishAt: 'desc'
                        },
                        take: 3
                    })];
                case 1:
                    recentFragments = _a.sent();
                    return [2 /*return*/, (0, node_1.json)({ fragments: recentFragments })];
            }
        });
    });
}
exports.loader = loader;
function Index() {
    var data = (0, react_1.useLoaderData)();
    return ((0, jsx_runtime_1.jsxs)("main", __assign({ className: "container" }, { children: [(0, jsx_runtime_1.jsx)(spacer_1.Spacer, { size: "4xs" }), (0, jsx_runtime_1.jsx)("h1", { children: "Joshua D. Graber" }), (0, jsx_runtime_1.jsx)(spacer_1.Spacer, { size: "4xs" }), (0, jsx_runtime_1.jsxs)("p", { children: ["Hi \uD83D\uDC4B I'm Joshua. I currently work as a writer, editor, and computer scientist.", (0, jsx_runtime_1.jsx)(spacer_1.Spacer, { size: "4xs" }), "I have previously worked as an adjunct professor, graduate student worker, activist, tutor, bartender, landscaper, farmhand, dishwasher, and entrepreneur.", (0, jsx_runtime_1.jsx)(spacer_1.Spacer, { size: "4xs" }), "Learn more about my work in the sections below."] }), (0, jsx_runtime_1.jsx)(spacer_1.Spacer, { size: "2xs" }), (0, jsx_runtime_1.jsx)("h2", __assign({ id: "writing" }, { children: "Writing" })), (0, jsx_runtime_1.jsx)(spacer_1.Spacer, { size: "4xs" }), (0, jsx_runtime_1.jsxs)("p", { children: ["I am trained as a fiction writer (M.F.A University of Pittsburgh, 2018) and have published my fiction, poetry, essays, and genre-fluid work in literary journals and other publications, including ", (0, jsx_runtime_1.jsx)("em", { children: "Guernica" }), ",", ' ', (0, jsx_runtime_1.jsx)("em", { children: "diagram" }), ", ", (0, jsx_runtime_1.jsx)("em", { children: "Glimmer Train" }), ", ", (0, jsx_runtime_1.jsx)("em", { children: "The New Guard Review" }), "'s BANG!, the Pittsburgh ", (0, jsx_runtime_1.jsx)("em", { children: "Post Gazette" }), ", and", ' ', (0, jsx_runtime_1.jsx)("em", { children: "Art Review" }), "."] }), (0, jsx_runtime_1.jsx)(spacer_1.Spacer, { size: "4xs" }), (0, jsx_runtime_1.jsx)("h3", { children: "Recent fragments" }), (0, jsx_runtime_1.jsx)("ol", __assign({ className: "my-4 list-decimal space-y-2 pl-6" }, { children: data.fragments.map(function (_a) {
                    var title = _a.title, description = _a.description, slug = _a.slug, publishAt = _a.publishAt;
                    return ((0, jsx_runtime_1.jsxs)("li", __assign({ className: "display-list-item" }, { children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, __assign({ to: "/fragments/".concat(slug), className: "block" }, { children: [(0, jsx_runtime_1.jsx)("h4", { children: title }), description && ((0, jsx_runtime_1.jsx)("p", __assign({ className: "no-underline hover:underline" }, { children: description })))] })), publishAt && ((0, jsx_runtime_1.jsx)(__time_1.Time, { className: "no-underline hover:underline", time: publishAt }))] }), title + slug));
                }) })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "fragments" }, { children: "View all fragments" })), (0, jsx_runtime_1.jsx)(spacer_1.Spacer, { size: "4xs" }), (0, jsx_runtime_1.jsx)("h3", { children: "Some recent publications" }), (0, jsx_runtime_1.jsx)("ul", { children: (0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)(link_preview_1.LinkPreview, { className: "max-w-3xl", url: "https://www.post-gazette.com/ae/books/2025/02/02/review-dose-effect-optimize-dopamine-oxytocin-serotonin-endorphins-tj-power/stories/202502020045" }), (0, jsx_runtime_1.jsx)(link_preview_1.LinkPreview, { className: "max-w-3xl", url: "https://www.post-gazette.com/ae/books/2024/04/27/review-mara-van-der-lugt-begetting-what-does-it-mean-to-create-a-child/stories/202404280037" }), (0, jsx_runtime_1.jsx)(link_preview_1.LinkPreview, { className: "max-w-3xl", url: "https://artreview.com/genre-and-the-newer-newness-danielle-dutton-prairie-dresses-art-other-review/" }), (0, jsx_runtime_1.jsx)(link_preview_1.LinkPreview, { className: "max-w-3xl", url: "https://mrbullbull.com/newbull/fiction/metaphors-toward-__________________" })] }) }), (0, jsx_runtime_1.jsx)(spacer_1.Spacer, { size: "2xs" }), (0, jsx_runtime_1.jsx)("h2", __assign({ id: "software" }, { children: "Software" })), (0, jsx_runtime_1.jsx)(spacer_1.Spacer, { size: "4xs" }), (0, jsx_runtime_1.jsxs)("p", { children: ["I currently work as a software engineer for", ' ', (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://www.aura.com", rel: "noreferrer noopener", target: "blank" }, { children: "Aura" })), ", a consumer digital security company.", (0, jsx_runtime_1.jsx)(spacer_1.Spacer, { size: "4xs" }), "I also maintain the open-source client applications for the", ' ', (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://www.pdap.io", rel: "noreferrer noopener", target: "blank" }, { children: "Police Data Accessibility Project" })), ", a non-profit focused on making police data available to researchers, journalists, and anyone else who might be impacted by policing.", (0, jsx_runtime_1.jsx)(spacer_1.Spacer, { size: "4xs" }), "I am occasionally available for engineering projects on a freelance basis. Please", ' ', (0, jsx_runtime_1.jsx)("a", __assign({ href: "mailto:joshua.d.graber@gmail.com", rel: "noreferrer noopener", target: "blank" }, { children: "get in touch" })), ' ', "if you are interested in collaborating."] }), (0, jsx_runtime_1.jsx)(spacer_1.Spacer, { size: "2xs" }), (0, jsx_runtime_1.jsx)("h2", __assign({ id: "editing" }, { children: "Editing" })), (0, jsx_runtime_1.jsx)(spacer_1.Spacer, { size: "4xs" }), (0, jsx_runtime_1.jsxs)("p", { children: ["I have worked for nearly fifteen years as a literary editor of prose and poetry. My editorial career began as the founding executive editor of", (0, jsx_runtime_1.jsx)("em", { children: "The Quaker" }), ", a journal I started as an undergraduate with the help of my mentor John Estes.", (0, jsx_runtime_1.jsx)(spacer_1.Spacer, { size: "4xs" }), "In graduate school, I worked as the fiction editor of", ' ', (0, jsx_runtime_1.jsx)("em", { children: "Hot Metal Bridge" }), ". I am proud to have worked with some incredible contemporary writers. I also worked briefly as the managing editor of ", (0, jsx_runtime_1.jsx)("em", { children: "Aster(ix)" }), ", where I learned a great deal about building literary community through publishing.", (0, jsx_runtime_1.jsx)(spacer_1.Spacer, { size: "4xs" }), "After completing my graduate work, I became the founding fiction editor of", ' ', (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://www.wordwest.co", rel: "noreferrer noopener", target: "blank" }, { children: "Word West Press" })), ", where I worked on some wonderful books across styles and genres.", (0, jsx_runtime_1.jsx)(spacer_1.Spacer, { size: "4xs" }), "I am available for editorial work on a freelance basis. If you are interested, please", ' ', (0, jsx_runtime_1.jsx)("a", __assign({ href: "mailto:joshua.d.graber@gmail.com", rel: "noreferrer noopener", target: "blank" }, { children: "say hello" })), ' ', "or check out", ' ', (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://reedsy.com/joshua-graber", rel: "noreferrer noopener", target: "blank" }, { children: "my profile on Reedsy" })), "."] }), (0, jsx_runtime_1.jsx)(spacer_1.Spacer, { size: "2xs" }), (0, jsx_runtime_1.jsx)("h2", { children: "Teaching and speaking" }), (0, jsx_runtime_1.jsx)(spacer_1.Spacer, { size: "4xs" }), (0, jsx_runtime_1.jsxs)("p", { children: ["Every now and then, I put my professor hat back on and teach a writing workshop or programming course. If you\u2019re in need of an engaging and improvisational educator, please", ' ', (0, jsx_runtime_1.jsx)("a", __assign({ href: "mailto:joshua.d.graber@gmail.com", rel: "noreferrer noopener", target: "blank" }, { children: "say hello" })), ' '] }), (0, jsx_runtime_1.jsx)(spacer_1.Spacer, { size: "lg" })] })));
}
exports["default"] = Index;
