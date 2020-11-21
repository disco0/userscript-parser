"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const UserscriptParser = require("../");
const testFilePath = path_1.default.resolve(__dirname, 'valid-userscript.user.js');
const testScriptContent = fs_1.default.readFileSync(testFilePath, 'utf-8');
const parsed = UserscriptParser(testScriptContent);
console.dir(parsed);
