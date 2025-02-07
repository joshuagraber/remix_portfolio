"use strict";
exports.__esModule = true;
exports.PostSchemaUpdate = exports.PostSchemaCreate = void 0;
var zod_1 = require("zod");
exports.PostSchemaCreate = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1).optional(),
    content: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(1).optional(),
    publishAt: zod_1.z.date().optional().optional()
});
exports.PostSchemaUpdate = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1).optional(),
    content: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(1),
    publishAt: zod_1.z.date().optional()
});
