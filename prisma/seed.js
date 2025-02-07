"use strict";
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
// import { faker } from '@faker-js/faker'
var promise_1 = require("remix-utils/promise");
var db_server_ts_1 = require("#app/utils/db.server.ts");
var constants_1 = require("#app/utils/providers/constants");
var db_utils_ts_1 = require("#tests/db-utils.ts");
var github_ts_1 = require("#tests/mocks/github.ts");
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var kodyImages, githubUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🌱 Seeding...');
                    console.time("\uD83C\uDF31 Database has been seeded");
                    // First create the roles
                    console.time('👑 Creating roles...');
                    return [4 /*yield*/, db_server_ts_1.prisma.role.createMany({
                            data: [{ name: 'admin' }, { name: 'user' }]
                        })];
                case 1:
                    _a.sent();
                    console.timeEnd('👑 Creating roles...');
                    // No need to seed users at the moment, but if it becomes necessary later on, leaving commented out in case.
                    // const totalUsers = 5
                    // console.time(`👤 Created ${totalUsers} users...`)
                    // const noteImages = await getNoteImages()
                    // const userImages = await getUserImages()
                    // for (let index = 0; index < totalUsers; index++) {
                    // 	const userData = createUser()
                    // 	await prisma.user
                    // 		.create({
                    // 			select: { id: true },
                    // 			data: {
                    // 				...userData,
                    // 				password: { create: createPassword(userData.username) },
                    // 				image: { create: userImages[index % userImages.length] },
                    // 				roles: { connect: { name: 'user' } },
                    // 				notes: {
                    // 					create: Array.from({
                    // 						length: faker.number.int({ min: 1, max: 3 }),
                    // 					}).map(() => ({
                    // 						title: faker.lorem.sentence(),
                    // 						content: faker.lorem.paragraphs(),
                    // 						images: {
                    // 							create: Array.from({
                    // 								length: faker.number.int({ min: 1, max: 3 }),
                    // 							}).map(() => {
                    // 								const imgNumber = faker.number.int({ min: 0, max: 9 })
                    // 								const img = noteImages[imgNumber]
                    // 								if (!img) {
                    // 									throw new Error(`Could not find image #${imgNumber}`)
                    // 								}
                    // 								return img
                    // 							}),
                    // 						},
                    // 					})),
                    // 				},
                    // 			},
                    // 		})
                    // 		.catch((e) => {
                    // 			console.error('Error creating a user:', e)
                    // 			return null
                    // 		})
                    // }
                    // console.timeEnd(`👤 Created ${totalUsers} users...`)
                    console.time("\uD83D\uDC28 Created admin user \"kody\"");
                    return [4 /*yield*/, (0, promise_1.promiseHash)({
                            kodyUser: (0, db_utils_ts_1.img)({ filepath: './tests/fixtures/images/user/kody.png' })
                        })];
                case 2:
                    kodyImages = _a.sent();
                    return [4 /*yield*/, (0, github_ts_1.insertGitHubUser)(constants_1.MOCK_CODE_GITHUB)];
                case 3:
                    githubUser = _a.sent();
                    return [4 /*yield*/, db_server_ts_1.prisma.user.create({
                            select: { id: true },
                            data: {
                                email: 'kody@example.com',
                                username: 'kody',
                                name: 'Kody',
                                image: { create: kodyImages.kodyUser },
                                password: { create: (0, db_utils_ts_1.createPassword)('kodylovesyou') },
                                connections: {
                                    create: { providerName: 'github', providerId: githubUser.profile.id }
                                },
                                roles: { connect: [{ name: 'admin' }, { name: 'user' }] }
                            }
                        })];
                case 4:
                    _a.sent();
                    console.timeEnd("\uD83D\uDC28 Created admin user \"kody\"");
                    console.timeEnd("\uD83C\uDF31 Database has been seeded");
                    return [2 /*return*/];
            }
        });
    });
}
seed()["catch"](function (e) {
    console.error(e);
    process.exit(1);
})["finally"](function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_server_ts_1.prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// we're ok to import from the test directory in this file
/*
eslint
    no-restricted-imports: "off",
*/
