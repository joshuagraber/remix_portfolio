"use strict";
exports.__esModule = true;
exports.getEnv = exports.init = void 0;
var zod_1 = require("zod");
var schema = zod_1.z.object({
    NODE_ENV: zod_1.z["enum"](['production', 'development', 'test']),
    DATABASE_PATH: zod_1.z.string(),
    DATABASE_URL: zod_1.z.string(),
    SESSION_SECRET: zod_1.z.string(),
    INTERNAL_COMMAND_TOKEN: zod_1.z.string(),
    HONEYPOT_SECRET: zod_1.z.string(),
    CACHE_DATABASE_PATH: zod_1.z.string(),
    // If you plan on using Sentry, uncomment this line
    // SENTRY_DSN: z.string(),
    // If you plan to use Resend, uncomment this line
    // RESEND_API_KEY: z.string(),
    // If you plan to use GitHub auth, remove the default:
    GITHUB_CLIENT_ID: zod_1.z.string()["default"]('MOCK_GITHUB_CLIENT_ID'),
    GITHUB_CLIENT_SECRET: zod_1.z.string()["default"]('MOCK_GITHUB_CLIENT_SECRET'),
    GITHUB_TOKEN: zod_1.z.string()["default"]('MOCK_GITHUB_TOKEN'),
    ALLOW_INDEXING: zod_1.z["enum"](['true', 'false']).optional()
});
function init() {
    var parsed = schema.safeParse(process.env);
    if (parsed.success === false) {
        console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
        throw new Error('Invalid environment variables');
    }
}
exports.init = init;
/**
 * This is used in both `entry.server.ts` and `root.tsx` to ensure that
 * the environment variables are set and globally available before the app is
 * started.
 *
 * NOTE: Do *not* add any environment variables in here that you do not wish to
 * be included in the client.
 * @returns all public ENV variables
 */
function getEnv() {
    return {
        MODE: process.env.NODE_ENV,
        SENTRY_DSN: process.env.SENTRY_DSN,
        ALLOW_INDEXING: process.env.ALLOW_INDEXING
    };
}
exports.getEnv = getEnv;
