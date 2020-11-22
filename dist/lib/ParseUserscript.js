"use strict";
// Barrel for module entry
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const debug_1 = __importDefault(require("./debug"));
const UserscriptMetaClass_1 = require("./UserscriptMetaClass");
const parseUserscriptMeta_1 = require("./parseUserscriptMeta");
function ParseUserscript(userscript) {
    try {
        return new UserscriptMetaClass_1.UserscriptMeta(userscript);
    }
    catch (error) {
        debug_1.default("Error parsing userscript, returning default value.");
        return parseUserscriptMeta_1.DefaultReturnValue;
    }
}
//#region Overload Module Entry Object
/*
 * FIXME: Error when importing this module and declaring the namespace overload in the
 *        entry file `./src/index.ts` TypeScript throws an error. If possible figure out
 *        how to actually do this
 */
(function (ParseUserscript) {
})(ParseUserscript || (ParseUserscript = {}));
module.exports = ParseUserscript;
