"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugClass = exports.debugLine = void 0;
const debug_1 = __importDefault(require("debug"));
const debugBase = debug_1.default('userscript-parse');
const debugInitialParse = debugBase.extend('initial-parse');
exports.debugLine = debugBase.extend('line');
exports.debugClass = debugBase.extend('class');
const debug = Object.assign(debugBase, {
    parse: debugInitialParse,
    line: exports.debugLine,
    class: exports.debugClass
});
exports.default = debug;
