"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseUserscript = exports.UserscriptMeta = void 0;
const ParseUserscript_1 = __importDefault(require("./lib/ParseUserscript"));
var UserscriptMeta_1 = require("./UserscriptMeta");
Object.defineProperty(exports, "UserscriptMeta", { enumerable: true, get: function () { return UserscriptMeta_1.UserscriptMeta; } });
exports.ParseUserscript = ParseUserscript_1.default;
exports.default = exports.ParseUserscript;
