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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.ErrorBoundary = exports.meta = exports.SignupEmail = exports.action = exports.handle = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@conform-to/react");
var zod_1 = require("@conform-to/zod");
var E = __importStar(require("@react-email/components"));
var node_1 = require("@remix-run/node");
var react_2 = require("@remix-run/react");
var zod_2 = require("zod");
var error_boundary_tsx_1 = require("#app/components/error-boundary.tsx");
var db_server_ts_1 = require("#app/utils/db.server.ts");
var email_server_ts_1 = require("#app/utils/email.server.ts");
var honeypot_server_ts_1 = require("#app/utils/honeypot.server.ts");
var misc_tsx_1 = require("#app/utils/misc.tsx");
var user_validation_ts_1 = require("#app/utils/user-validation.ts");
var verify_server_ts_1 = require("./verify.server.ts");
exports.handle = {
    getSitemapEntries: function () { return null; }
};
var SignupSchema = zod_2.z.object({
    email: user_validation_ts_1.EmailSchema
});
function action(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var formData, submission, email, _b, verifyUrl, redirectTo, otp, response;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, request.formData()];
                case 1:
                    formData = _c.sent();
                    (0, honeypot_server_ts_1.checkHoneypot)(formData);
                    return [4 /*yield*/, (0, zod_1.parseWithZod)(formData, {
                            schema: SignupSchema.superRefine(function (data, ctx) { return __awaiter(_this, void 0, void 0, function () {
                                var existingUser;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, db_server_ts_1.prisma.user.findUnique({
                                                where: { email: data.email },
                                                select: { id: true }
                                            })];
                                        case 1:
                                            existingUser = _a.sent();
                                            if (existingUser) {
                                                ctx.addIssue({
                                                    path: ['email'],
                                                    code: zod_2.z.ZodIssueCode.custom,
                                                    message: 'A user already exists with this email'
                                                });
                                                return [2 /*return*/];
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }),
                            async: true
                        })];
                case 2:
                    submission = _c.sent();
                    if (submission.status !== 'success') {
                        return [2 /*return*/, (0, node_1.json)({ result: submission.reply() }, { status: submission.status === 'error' ? 400 : 200 })];
                    }
                    email = submission.value.email;
                    return [4 /*yield*/, (0, verify_server_ts_1.prepareVerification)({
                            period: 10 * 60,
                            request: request,
                            type: 'onboarding',
                            target: email
                        })];
                case 3:
                    _b = _c.sent(), verifyUrl = _b.verifyUrl, redirectTo = _b.redirectTo, otp = _b.otp;
                    return [4 /*yield*/, (0, email_server_ts_1.sendEmail)({
                            to: email,
                            subject: "Welcome to JDG!",
                            react: (0, jsx_runtime_1.jsx)(SignupEmail, { onboardingUrl: verifyUrl.toString(), otp: otp })
                        })];
                case 4:
                    response = _c.sent();
                    if (response.status === 'success') {
                        return [2 /*return*/, (0, node_1.redirect)(redirectTo.toString())];
                    }
                    else {
                        return [2 /*return*/, (0, node_1.json)({
                                result: submission.reply({ formErrors: [response.error.message] })
                            }, {
                                status: 500
                            })];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.action = action;
function SignupEmail(_a) {
    var onboardingUrl = _a.onboardingUrl, otp = _a.otp;
    return ((0, jsx_runtime_1.jsx)(E.Html, __assign({ lang: "en", dir: "ltr" }, { children: (0, jsx_runtime_1.jsxs)(E.Container, { children: [(0, jsx_runtime_1.jsx)("h1", { children: (0, jsx_runtime_1.jsx)(E.Text, { children: "Welcome to JDG!" }) }), (0, jsx_runtime_1.jsx)("p", { children: (0, jsx_runtime_1.jsxs)(E.Text, { children: ["Here's your verification code: ", (0, jsx_runtime_1.jsx)("strong", { children: otp })] }) }), (0, jsx_runtime_1.jsx)("p", { children: (0, jsx_runtime_1.jsx)(E.Text, { children: "Or click the link to get started:" }) }), (0, jsx_runtime_1.jsx)(E.Link, __assign({ href: onboardingUrl }, { children: onboardingUrl }))] }) })));
}
exports.SignupEmail = SignupEmail;
var meta = function () {
    return [{ title: 'Sign Up | JDG' }];
};
exports.meta = meta;
function SignupRoute() {
    var actionData = (0, react_2.useActionData)();
    var isPending = (0, misc_tsx_1.useIsPending)();
    var searchParams = (0, react_2.useSearchParams)()[0];
    var redirectTo = searchParams.get('redirectTo');
    var _a = (0, react_1.useForm)({
        id: 'signup-form',
        constraint: (0, zod_1.getZodConstraint)(SignupSchema),
        lastResult: actionData === null || actionData === void 0 ? void 0 : actionData.result,
        onValidate: function (_a) {
            var formData = _a.formData;
            var result = (0, zod_1.parseWithZod)(formData, { schema: SignupSchema });
            return result;
        },
        shouldRevalidate: 'onBlur'
    }), form = _a[0], fields = _a[1];
    // For now don't allow this route. We'll implement later.
    return (0, jsx_runtime_1.jsx)(react_2.Navigate, { to: "/" });
    // return (
    // 	<div className="container flex flex-col justify-center pb-32 pt-20">
    // 		<div className="text-center">
    // 			<h1 className="text-h1">Let's start your journey!</h1>
    // 			<p className="mt-3 text-body-md text-muted-foreground">
    // 				Please enter your email.
    // 			</p>
    // 		</div>
    // 		<div className="mx-auto mt-16 min-w-full max-w-sm sm:min-w-[368px]">
    // 			<Form method="POST" {...getFormProps(form)}>
    // 				<HoneypotInputs />
    // 				<Field
    // 					labelProps={{
    // 						htmlFor: fields.email.id,
    // 						children: 'Email',
    // 					}}
    // 					inputProps={{
    // 						...getInputProps(fields.email, { type: 'email' }),
    // 						autoFocus: true,
    // 						autoComplete: 'email',
    // 					}}
    // 					errors={fields.email.errors}
    // 				/>
    // 				<ErrorList errors={form.errors} id={form.errorId} />
    // 				<StatusButton
    // 					className="w-full"
    // 					status={isPending ? 'pending' : (form.status ?? 'idle')}
    // 					type="submit"
    // 					disabled={isPending}
    // 				>
    // 					Submit
    // 				</StatusButton>
    // 			</Form>
    // 			<ul className="mt-5 flex flex-col gap-5 border-b-2 border-t-2 border-border py-3">
    // 				{providerNames.map((providerName) => (
    // 					<li key={providerName}>
    // 						<ProviderConnectionForm
    // 							type="Signup"
    // 							providerName={providerName}
    // 							redirectTo={redirectTo}
    // 						/>
    // 					</li>
    // 				))}
    // 			</ul>
    // 		</div>
    // 	</div>
    // )
}
exports["default"] = SignupRoute;
function ErrorBoundary() {
    return (0, jsx_runtime_1.jsx)(error_boundary_tsx_1.GeneralErrorBoundary, {});
}
exports.ErrorBoundary = ErrorBoundary;
