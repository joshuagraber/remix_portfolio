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
exports.action = exports.loader = exports.handle = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@conform-to/react");
var zod_1 = require("@conform-to/zod");
var invariant_1 = require("@epic-web/invariant");
var node_1 = require("@remix-run/node");
var react_2 = require("@remix-run/react");
var react_3 = require("react");
var forms_1 = require("#app/components/forms");
var editor_tsx_1 = require("#app/components/mdx/editor.tsx");
var status_button_1 = require("#app/components/ui/status-button");
var auth_server_1 = require("#app/utils/auth.server");
var db_server_1 = require("#app/utils/db.server");
var mdx_ts_1 = require("#app/utils/mdx.ts");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var toast_server_ts_1 = require("#app/utils/toast.server.ts");
var __image_manager_1 = require("./__image-manager");
var __types_1 = require("./__types");
var __useImageUploader_1 = require("./__useImageUploader");
exports.handle = {
    getSitemapEntries: function () { return null; }
};
function loader() {
    return __awaiter(this, void 0, void 0, function () {
        var images;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_server_1.prisma.postImage.findMany({
                        select: {
                            id: true,
                            altText: true,
                            title: true
                        },
                        orderBy: { createdAt: 'desc' }
                    })];
                case 1:
                    images = _a.sent();
                    (0, invariant_1.invariantResponse)(images, 'Error fetching images', { status: 404 });
                    return [2 /*return*/, (0, node_1.json)({ images: images })];
            }
        });
    });
}
exports.loader = loader;
function action(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var authorId, formData, submission, _b, title, content, description, publishAt, slug, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, (0, auth_server_1.requireUserId)(request)];
                case 1:
                    authorId = _d.sent();
                    return [4 /*yield*/, request.formData()];
                case 2:
                    formData = _d.sent();
                    return [4 /*yield*/, (0, zod_1.parseWithZod)(formData, {
                            schema: __types_1.PostSchemaCreate,
                            async: true
                        })];
                case 3:
                    submission = _d.sent();
                    if (submission.status !== 'success') {
                        return [2 /*return*/, (0, node_1.json)({ result: submission.reply() }, { status: submission.status === 'error' ? 400 : 200 })];
                    }
                    _b = submission.value, title = _b.title, content = _b.content, description = _b.description, publishAt = _b.publishAt, slug = _b.slug;
                    _d.label = 4;
                case 4:
                    _d.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, db_server_1.prisma.post.create({
                            data: {
                                title: title,
                                content: content,
                                description: description,
                                slug: (0, mdx_ts_1.makePostSlug)(title, slug),
                                publishAt: publishAt,
                                authorId: authorId
                            }
                        })];
                case 5:
                    _d.sent();
                    return [2 /*return*/, (0, toast_server_ts_1.redirectWithToast)('/admin/fragments', {
                            title: 'Post created',
                            description: "Post \"".concat(title, "\" created successfully.")
                        })];
                case 6:
                    _c = _d.sent();
                    return [2 /*return*/, (0, node_1.json)({ result: submission.reply({ formErrors: ['Failed to create post'] }) }, { status: 500 })];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.action = action;
function NewPost() {
    var _a;
    var actionData = (0, react_2.useActionData)();
    var navigation = (0, react_2.useNavigation)();
    var isPending = navigation.state === 'submitting';
    var images = (0, react_2.useLoaderData)().images;
    var handleImageUpload = (0, __useImageUploader_1.useImageUploader)();
    var _b = (0, react_1.useForm)({
        id: 'new-post-form',
        constraint: (0, zod_1.getZodConstraint)(__types_1.PostSchemaCreate),
        lastResult: actionData === null || actionData === void 0 ? void 0 : actionData.result,
        onValidate: function (_a) {
            var formData = _a.formData;
            return (0, zod_1.parseWithZod)(formData, { schema: __types_1.PostSchemaCreate });
        },
        shouldRevalidate: 'onBlur'
    }), form = _b[0], fields = _b[1];
    var _c = (0, react_3.useState)(''), content = _c[0], setContent = _c[1];
    var _d = (0, react_3.useState)('begin'), key = _d[0], setKey = _d[1];
    var contentRef = (0, react_3.useRef)(null);
    // Sync MDEditor value with the hidden textarea
    (0, react_3.useEffect)(function () {
        if (contentRef.current) {
            contentRef.current.value = content;
            contentRef.current.dispatchEvent(new Event('change'));
        }
    }, [content]);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "p-8" }, { children: [(0, jsx_runtime_1.jsx)("h1", __assign({ className: "mb-6 text-2xl font-bold" }, { children: "New Post" })), (0, jsx_runtime_1.jsxs)(react_2.Form, __assign({ method: "post" }, (0, react_1.getFormProps)(form), { className: "mb-12 space-y-6", onChange: function (event) {
                    if (['description', 'title', 'publishAt', 'slug'].includes(
                    // @ts-expect-error
                    event.target.name)) {
                        var data = new FormData(event.target.form);
                        setContent((0, mdx_ts_1.formatContentForEditor)(Object.fromEntries(data.entries())));
                        setKey(Math.random().toString());
                    }
                } }, { children: [(0, jsx_runtime_1.jsx)(forms_1.Field, { labelProps: {
                            htmlFor: fields.title.id,
                            children: 'Title'
                        }, inputProps: __assign({}, (0, react_1.getInputProps)(fields.title, { type: 'text' })), errors: fields.title.errors }), (0, jsx_runtime_1.jsx)(forms_1.Field, { labelProps: {
                            htmlFor: fields.description.id,
                            children: 'Description'
                        }, inputProps: __assign({}, (0, react_1.getInputProps)(fields.description, { type: 'text' })), errors: fields.description.errors }), (0, jsx_runtime_1.jsx)(forms_1.Field, { labelProps: {
                            htmlFor: fields.slug.id,
                            children: 'Slug (optional - defaults to kebab-cased title)'
                        }, inputProps: __assign({}, (0, react_1.getInputProps)(fields.slug, { type: 'text' })), errors: fields.slug.errors }), (0, jsx_runtime_1.jsx)(forms_1.Field, { labelProps: {
                            htmlFor: fields.publishAt.id,
                            children: 'When should this post be published? (optional - defaults to now)'
                        }, inputProps: __assign({}, (0, react_1.getInputProps)(fields.publishAt, { type: 'date' })), errors: fields.publishAt.errors }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", __assign({ className: "mb-1 block text-sm font-medium" }, { children: "Content" })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "rounded-md border" }, { children: (0, jsx_runtime_1.jsx)(editor_tsx_1.MDXEditorComponent, { images: images.map(function (image) { return (0, misc_tsx_1.getPostImageSource)(image.id); }), imageUploadHandler: handleImageUpload, markdown: content, onChange: setContent, className: "min-h-[400px]" }, key) })), (0, jsx_runtime_1.jsx)("textarea", __assign({ ref: contentRef }, (0, react_1.getTextareaProps)(fields.content), { className: "hidden" })), fields.content.errors ? ((0, jsx_runtime_1.jsx)("div", __assign({ className: "text-sm text-destructive" }, { children: fields.content.errors }))) : null] }), (0, jsx_runtime_1.jsx)(forms_1.ErrorList, { errors: form.errors, id: form.errorId }), (0, jsx_runtime_1.jsx)(status_button_1.StatusButton, __assign({ type: "submit", status: isPending ? 'pending' : ((_a = form.status) !== null && _a !== void 0 ? _a : 'idle'), disabled: isPending, className: "w-full" }, { children: "Create Post" }))] })), (0, jsx_runtime_1.jsx)("h2", { children: "Manage post images" }), (0, jsx_runtime_1.jsx)(__image_manager_1.PostImageManager, { images: images })] })));
}
exports["default"] = NewPost;
