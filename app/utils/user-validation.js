"use strict";
exports.__esModule = true;
exports.PasswordAndConfirmPasswordSchema = exports.EmailSchema = exports.NameSchema = exports.PasswordSchema = exports.UsernameSchema = exports.USERNAME_MAX_LENGTH = exports.USERNAME_MIN_LENGTH = void 0;
var zod_1 = require("zod");
exports.USERNAME_MIN_LENGTH = 3;
exports.USERNAME_MAX_LENGTH = 20;
exports.UsernameSchema = zod_1.z
    .string({ required_error: 'Username is required' })
    .min(exports.USERNAME_MIN_LENGTH, { message: 'Username is too short' })
    .max(exports.USERNAME_MAX_LENGTH, { message: 'Username is too long' })
    .regex(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only include letters, numbers, and underscores'
})
    // users can type the username in any case, but we store it in lowercase
    .transform(function (value) { return value.toLowerCase(); });
exports.PasswordSchema = zod_1.z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password is too short' })
    .max(100, { message: 'Password is too long' });
exports.NameSchema = zod_1.z
    .string({ required_error: 'Name is required' })
    .min(3, { message: 'Name is too short' })
    .max(40, { message: 'Name is too long' });
exports.EmailSchema = zod_1.z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Email is invalid' })
    .min(3, { message: 'Email is too short' })
    .max(100, { message: 'Email is too long' })
    // users can type the email in any case, but we store it in lowercase
    .transform(function (value) { return value.toLowerCase(); });
exports.PasswordAndConfirmPasswordSchema = zod_1.z
    .object({ password: exports.PasswordSchema, confirmPassword: exports.PasswordSchema })
    .superRefine(function (_a, ctx) {
    var confirmPassword = _a.confirmPassword, password = _a.password;
    if (confirmPassword !== password) {
        ctx.addIssue({
            path: ['confirmPassword'],
            code: 'custom',
            message: 'The passwords must match'
        });
    }
});
