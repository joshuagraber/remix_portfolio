"use strict";
exports.__esModule = true;
exports.formatContentForEditor = exports.makePostSlug = exports.stripFrontmatter = exports.formatDateStringForPostDefault = void 0;
function formatDateStringForPostDefault(dateString) {
    if (!dateString)
        return dateString;
    return dateString.split('T')[0];
}
exports.formatDateStringForPostDefault = formatDateStringForPostDefault;
function stripFrontmatter(content) {
    // Match frontmatter pattern: starts with ---, contains any characters (non-greedy), ends with ---
    var frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
    // Return the content with frontmatter removed, or the original content if no frontmatter exists
    return content.replace(frontmatterRegex, '').trim();
}
exports.stripFrontmatter = stripFrontmatter;
function makePostSlug(title, slug) {
    if (slug)
        return slug;
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}
exports.makePostSlug = makePostSlug;
/**
 * Use this to integrate form fields with controlled MD editor and keep the front matter in sync.
 */
function formatContentForEditor(_a) {
    var title = _a.title, slug = _a.slug, description = _a.description, publishAt = _a.publishAt, content = _a.content;
    var frontmatterFields = [];
    var existingFrontmatter = content.match(/^---\n([\s\S]*?)\n---\n/);
    // If there's existing frontmatter, preserve fields we don't manage
    if (existingFrontmatter === null || existingFrontmatter === void 0 ? void 0 : existingFrontmatter[1]) {
        var existingLines = existingFrontmatter[1].split('\n');
        for (var _i = 0, existingLines_1 = existingLines; _i < existingLines_1.length; _i++) {
            var line = existingLines_1[_i];
            var field = line.split(':')[0];
            var fieldName = field === null || field === void 0 ? void 0 : field.trim();
            if (fieldName &&
                !['title', 'slug', 'description', 'published'].includes(fieldName)) {
                frontmatterFields.push(line);
            }
        }
    }
    // Add or update managed fields
    frontmatterFields.push("title: ".concat(title));
    if (slug) {
        frontmatterFields.push("slug: ".concat(makePostSlug(title, slug)));
    }
    if (description) {
        frontmatterFields.push("description: ".concat(description));
    }
    if (publishAt) {
        frontmatterFields.push("published: ".concat(publishAt));
    }
    var frontmatter = frontmatterFields.join('\n');
    return "---\n".concat(frontmatter, "\n---\n\n").concat(stripFrontmatter(content));
}
exports.formatContentForEditor = formatContentForEditor;
