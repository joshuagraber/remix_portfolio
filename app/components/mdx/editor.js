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
exports.__esModule = true;
exports.MDXEditorComponent = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var editor_1 = require("@mdxeditor/editor");
var react_1 = require("react");
var theme_switch_tsx_1 = require("#app/routes/resources+/theme-switch.tsx");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var Toolbar = function () { return ((0, jsx_runtime_1.jsx)(editor_1.DiffSourceToggleWrapper, { children: (0, jsx_runtime_1.jsx)(editor_1.ConditionalContents, { options: [
            {
                when: function (editor) { return (editor === null || editor === void 0 ? void 0 : editor.editorType) === 'codeblock'; },
                contents: function () { return (0, jsx_runtime_1.jsx)(editor_1.ChangeCodeMirrorLanguage, {}); }
            },
            {
                fallback: function () { return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(editor_1.UndoRedo, {}), (0, jsx_runtime_1.jsx)(editor_1.Separator, {}), (0, jsx_runtime_1.jsx)(editor_1.BoldItalicUnderlineToggles, {}), (0, jsx_runtime_1.jsx)(editor_1.CodeToggle, {}), (0, jsx_runtime_1.jsx)(editor_1.Separator, {}), (0, jsx_runtime_1.jsx)(editor_1.InsertCodeBlock, {}), (0, jsx_runtime_1.jsx)(editor_1.Separator, {}), (0, jsx_runtime_1.jsx)(editor_1.StrikeThroughSupSubToggles, {}), (0, jsx_runtime_1.jsx)(editor_1.Separator, {}), (0, jsx_runtime_1.jsx)(editor_1.ListsToggle, {}), (0, jsx_runtime_1.jsx)(editor_1.Separator, {}), (0, jsx_runtime_1.jsx)(editor_1.BlockTypeSelect, {}), (0, jsx_runtime_1.jsx)(editor_1.Separator, {}), (0, jsx_runtime_1.jsx)(editor_1.CreateLink, {}), (0, jsx_runtime_1.jsx)(editor_1.InsertImage, {}), (0, jsx_runtime_1.jsx)(YouTubeButton, {}), (0, jsx_runtime_1.jsx)(editor_1.Separator, {}), (0, jsx_runtime_1.jsx)(editor_1.InsertTable, {}), (0, jsx_runtime_1.jsx)(editor_1.InsertThematicBreak, {}), (0, jsx_runtime_1.jsx)(editor_1.Separator, {})] })); }
            },
        ] }) })); };
function MDXEditorComponent(_a) {
    var markdown = _a.markdown, onChange = _a.onChange, className = _a.className, diffSource = _a.diffSource, _b = _a.images, images = _b === void 0 ? [] : _b, imageUploadHandler = _a.imageUploadHandler;
    var editorRef = (0, react_1.useRef)(null);
    var theme = (0, theme_switch_tsx_1.useTheme)();
    return ((0, jsx_runtime_1.jsx)(editor_1.MDXEditor, { className: (0, misc_tsx_1.cn)(
        // TODO: Remove the typography plugin (https://github.com/tailwindlabs/tailwindcss-typography) when global typography styles updated
        'jdg_typography min-h-[400px] w-full', className, theme === 'dark' && 'dark-theme dark-editor'), ref: editorRef, markdown: markdown, onChange: onChange, plugins: [
            (0, editor_1.toolbarPlugin)({
                toolbarContents: function () { return (0, jsx_runtime_1.jsx)(Toolbar, {}); }
            }),
            (0, editor_1.listsPlugin)(),
            (0, editor_1.quotePlugin)(),
            (0, editor_1.headingsPlugin)({ allowedHeadingLevels: [2, 3, 4, 5, 6] }),
            (0, editor_1.linkPlugin)(),
            (0, editor_1.linkDialogPlugin)(),
            (0, editor_1.imagePlugin)({
                imageAutocompleteSuggestions: images,
                imageUploadHandler: imageUploadHandler
            }),
            (0, editor_1.tablePlugin)(),
            (0, editor_1.thematicBreakPlugin)(),
            (0, editor_1.frontmatterPlugin)(),
            (0, editor_1.codeBlockPlugin)({ defaultCodeBlockLanguage: '' }),
            (0, editor_1.codeMirrorPlugin)({
                codeBlockLanguages: {
                    js: 'JavaScript',
                    css: 'CSS',
                    txt: 'Plain Text',
                    tsx: 'TypeScript',
                    '': 'Unspecified'
                }
            }),
            (0, editor_1.directivesPlugin)({
                directiveDescriptors: [
                    YoutubeDirectiveDescriptor,
                    editor_1.AdmonitionDirectiveDescriptor,
                ]
            }),
            (0, editor_1.diffSourcePlugin)({ viewMode: 'source', diffMarkdown: diffSource }),
            (0, editor_1.markdownShortcutPlugin)(),
        ] }));
}
exports.MDXEditorComponent = MDXEditorComponent;
var YouTubeButton = function () {
    // grab the insertDirective action (a.k.a. publisher) from the
    // state management system of the directivesPlugin
    var insertDirective = (0, editor_1.usePublisher)(editor_1.insertDirective$);
    return ((0, jsx_runtime_1.jsx)(editor_1.DialogButton, { tooltipTitle: "Insert Youtube video", submitButtonTitle: "Insert video", dialogInputPlaceholder: "Paste the youtube video URL", buttonContent: "YT", onSubmit: function (url) {
            var videoId = new URL(url).searchParams.get('v');
            if (videoId) {
                insertDirective({
                    name: 'youtube',
                    type: 'leafDirective',
                    attributes: { id: videoId },
                    children: []
                });
            }
            else {
                alert('Invalid YouTube URL');
            }
        } }));
};
var YoutubeDirectiveDescriptor = {
    name: 'youtube',
    type: 'leafDirective',
    testNode: function (node) {
        return node.name === 'youtube';
    },
    attributes: ['id'],
    hasChildren: false,
    Editor: function (_a) {
        var mdastNode = _a.mdastNode, lexicalNode = _a.lexicalNode, parentEditor = _a.parentEditor;
        return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
            } }, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ onClick: function () {
                        parentEditor.update(function () {
                            lexicalNode.selectNext();
                            lexicalNode.remove();
                        });
                    } }, { children: "delete" })), (0, jsx_runtime_1.jsx)("iframe", { width: "560", height: "315", src: "https://www.youtube.com/embed/".concat(mdastNode.attributes.id), title: "YouTube video player", frameBorder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" })] })));
    }
};
