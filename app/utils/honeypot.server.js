"use strict";
exports.__esModule = true;
exports.checkHoneypot = exports.honeypot = void 0;
var server_1 = require("remix-utils/honeypot/server");
exports.honeypot = new server_1.Honeypot({
    validFromFieldName: process.env.NODE_ENV === 'test' ? null : undefined,
    encryptionSeed: process.env.HONEYPOT_SECRET
});
function checkHoneypot(formData) {
    try {
        exports.honeypot.check(formData);
    }
    catch (error) {
        if (error instanceof server_1.SpamError) {
            throw new Response('Form not submitted properly', { status: 400 });
        }
        throw error;
    }
}
exports.checkHoneypot = checkHoneypot;
