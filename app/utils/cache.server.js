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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.cachified = exports.searchCacheKeys = exports.getAllCacheKeys = exports.cache = exports.lruCache = void 0;
var node_fs_1 = __importDefault(require("node:fs"));
var cachified_1 = require("@epic-web/cachified");
var remember_1 = require("@epic-web/remember");
var better_sqlite3_1 = __importDefault(require("better-sqlite3"));
var lru_cache_1 = require("lru-cache");
var zod_1 = require("zod");
var cache__sqlite_server_ts_1 = require("#app/routes/admin+/cache_.sqlite.server.ts");
var litefs_server_ts_1 = require("./litefs.server.ts");
var timing_server_ts_1 = require("./timing.server.ts");
var CACHE_DATABASE_PATH = process.env.CACHE_DATABASE_PATH;
var cacheDb = (0, remember_1.remember)('cacheDb', createDatabase);
function createDatabase(tryAgain) {
    if (tryAgain === void 0) { tryAgain = true; }
    var db = new better_sqlite3_1["default"](CACHE_DATABASE_PATH);
    var currentIsPrimary = (0, litefs_server_ts_1.getInstanceInfoSync)().currentIsPrimary;
    if (!currentIsPrimary)
        return db;
    try {
        // create cache table with metadata JSON column and value JSON column if it does not exist already
        db.exec("\n\t\t\tCREATE TABLE IF NOT EXISTS cache (\n\t\t\t\tkey TEXT PRIMARY KEY,\n\t\t\t\tmetadata TEXT,\n\t\t\t\tvalue TEXT\n\t\t\t)\n\t\t");
    }
    catch (error) {
        node_fs_1["default"].unlinkSync(CACHE_DATABASE_PATH);
        if (tryAgain) {
            console.error("Error creating cache database, deleting the file at \"".concat(CACHE_DATABASE_PATH, "\" and trying again..."));
            return createDatabase(false);
        }
        throw error;
    }
    return db;
}
var lru = (0, remember_1.remember)('lru-cache', function () { return new lru_cache_1.LRUCache({ max: 5000 }); });
exports.lruCache = {
    name: 'app-memory-cache',
    set: function (key, value) {
        var _a;
        var ttl = (0, cachified_1.totalTtl)(value === null || value === void 0 ? void 0 : value.metadata);
        lru.set(key, value, {
            ttl: ttl === Infinity ? undefined : ttl,
            start: (_a = value === null || value === void 0 ? void 0 : value.metadata) === null || _a === void 0 ? void 0 : _a.createdTime
        });
        return value;
    },
    get: function (key) { return lru.get(key); },
    "delete": function (key) { return lru["delete"](key); }
};
var cacheEntrySchema = zod_1.z.object({
    metadata: zod_1.z.object({
        createdTime: zod_1.z.number(),
        ttl: zod_1.z.number().nullable().optional(),
        swr: zod_1.z.number().nullable().optional()
    }),
    value: zod_1.z.unknown()
});
var cacheQueryResultSchema = zod_1.z.object({
    metadata: zod_1.z.string(),
    value: zod_1.z.string()
});
exports.cache = {
    name: 'SQLite cache',
    get: function (key) {
        var result = cacheDb
            .prepare('SELECT value, metadata FROM cache WHERE key = ?')
            .get(key);
        var parseResult = cacheQueryResultSchema.safeParse(result);
        if (!parseResult.success)
            return null;
        var parsedEntry = cacheEntrySchema.safeParse({
            metadata: JSON.parse(parseResult.data.metadata),
            value: JSON.parse(parseResult.data.value)
        });
        if (!parsedEntry.success)
            return null;
        var _a = parsedEntry.data, metadata = _a.metadata, value = _a.value;
        if (!value)
            return null;
        return { metadata: metadata, value: value };
    },
    set: function (key, entry) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, currentIsPrimary, primaryInstance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, litefs_server_ts_1.getInstanceInfo)()];
                    case 1:
                        _a = _b.sent(), currentIsPrimary = _a.currentIsPrimary, primaryInstance = _a.primaryInstance;
                        if (currentIsPrimary) {
                            cacheDb
                                .prepare('INSERT OR REPLACE INTO cache (key, value, metadata) VALUES (@key, @value, @metadata)')
                                .run({
                                key: key,
                                value: JSON.stringify(entry.value),
                                metadata: JSON.stringify(entry.metadata)
                            });
                        }
                        else {
                            // fire-and-forget cache update
                            void (0, cache__sqlite_server_ts_1.updatePrimaryCacheValue)({
                                key: key,
                                cacheValue: entry
                            }).then(function (response) {
                                if (!response.ok) {
                                    console.error("Error updating cache value for key \"".concat(key, "\" on primary instance (").concat(primaryInstance, "): ").concat(response.status, " ").concat(response.statusText), { entry: entry });
                                }
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    "delete": function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, currentIsPrimary, primaryInstance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, litefs_server_ts_1.getInstanceInfo)()];
                    case 1:
                        _a = _b.sent(), currentIsPrimary = _a.currentIsPrimary, primaryInstance = _a.primaryInstance;
                        if (currentIsPrimary) {
                            cacheDb.prepare('DELETE FROM cache WHERE key = ?').run(key);
                        }
                        else {
                            // fire-and-forget cache update
                            void (0, cache__sqlite_server_ts_1.updatePrimaryCacheValue)({
                                key: key,
                                cacheValue: undefined
                            }).then(function (response) {
                                if (!response.ok) {
                                    console.error("Error deleting cache value for key \"".concat(key, "\" on primary instance (").concat(primaryInstance, "): ").concat(response.status, " ").concat(response.statusText));
                                }
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
};
function getAllCacheKeys(limit) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, {
                    sqlite: cacheDb
                        .prepare('SELECT key FROM cache LIMIT ?')
                        .all(limit)
                        .map(function (row) { return row.key; }),
                    lru: __spreadArray([], lru.keys(), true)
                }];
        });
    });
}
exports.getAllCacheKeys = getAllCacheKeys;
function searchCacheKeys(search, limit) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, {
                    sqlite: cacheDb
                        .prepare('SELECT key FROM cache WHERE key LIKE ? LIMIT ?')
                        .all("%".concat(search, "%"), limit)
                        .map(function (row) { return row.key; }),
                    lru: __spreadArray([], lru.keys(), true).filter(function (key) { return key.includes(search); })
                }];
        });
    });
}
exports.searchCacheKeys = searchCacheKeys;
function cachified(_a, reporter) {
    var timings = _a.timings, options = __rest(_a, ["timings"]);
    if (reporter === void 0) { reporter = (0, cachified_1.verboseReporter)(); }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, (0, cachified_1.cachified)(options, (0, cachified_1.mergeReporters)((0, timing_server_ts_1.cachifiedTimingReporter)(timings), reporter))];
        });
    });
}
exports.cachified = cachified;
