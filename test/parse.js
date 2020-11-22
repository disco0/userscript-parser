"use strict";
/**
 * Output reference, not actual tests (yet)
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// Check output is appropirate 
const inRepl = 
// In a node repl
('_' in globalThis) ? false :
    // Top level module
    !('parent' in module);
//#region Imports
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const __1 = __importDefault(require("../"));
const UserscriptMetaClass_1 = require("../lib/UserscriptMetaClass");
//#endregion Imports
//#region Logging
const { log: $log, error } = console;
const logMethod = $log;
const log = Object.assign($log, {
    section(msg) { logMethod(chalk_1.default.underline.hex("#00C").bold(msg.trim())); },
    object(obj, description = "") {
        if (description.length > 0)
            log.section(`${description}:`);
        logMethod('%o', obj);
    }
});
//#endregion Logging
// If testing breaks its probably this
const testFilePath = path_1.default.resolve(__dirname, 'valid-userscript.user.js');
const script = fs_1.default.readFileSync(testFilePath, 'utf-8');
// Save all results to inspect in repl
const results = {};
//#region Main Function
const parsed = __1.default(script);
log.object(parsed, "Function");
results.function = parsed;
//#endregion Main Function
//#region Class
const instance = new UserscriptMetaClass_1.UserscriptMeta(script);
log.object(instance, "Class");
results.class = instance;
module.exports = results;
