"use strict";
///<reference path="./UserscriptNS.ts"/>
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserscriptMeta = void 0;
// FIXME: For the love of god fix naming of identical (if not just nearly identical)
//        classes/interfaces
const guards_1 = __importDefault(require("./check/guards"));
const longest_1 = __importDefault(require("./util/longest"));
const debug_1 = require("./debug");
const parseUserscriptMeta_1 = require("./parseUserscriptMeta");
//#endregion Userscript Namespace
class UserscriptMeta {
    //#endregion Members
    constructor(scriptSource) {
        this.metablock = "";
        this.content = "";
        const parsed = parseUserscriptMeta_1.parseUserscriptMeta(scriptSource);
        if (!parsed) {
            debug_1.debugClass("No userscript meta parsed from source.");
            throw new Error("No meta parsed from source file.");
        }
        this.content = parsed.content;
        this.meta = parsed.meta;
        this.metablock = parsed.metablock;
    }
    //#region Methods
    toString() {
        // Get longest meta prop length for formatting
        const longest = UserscriptMeta.LongestMetaKey(this).length;
        const metaSections = [];
        for (const [prop, values] of Object.entries(this.meta)) {
            metaSections.push(UserscriptMeta.FormatPropLines(prop, values, longest));
        }
        return metaSections.join('\n');
    }
    get keys() {
        return Object.keys(this.meta);
    }
    //#endregion Methods
    //#region Static
    //// FIXME(disk0): For commented out method definition
    //// Meta keys are being returned properly but cant access length property? 
    // static LongestMetaKey<M extends UserscriptMeta | UserscriptMeta['meta'], K extends keyof ResolveMeta<M>>(meta: M): K
    static LongestMetaKey(meta) {
        const resolved = (meta instanceof UserscriptMeta) ? meta.meta : meta;
        return Object.keys(resolved)
            .sort(longest_1.default.string)[0];
    }
    static FormatPropLines(prop, values, longest = 12) {
        const lines = [];
        for (const value of guards_1.default.Array(values) ? values : [values])
            // Conditional operator for no value case (e.g. `// @noframes`)
            lines.push((typeof value !== 'undefined')
                ? `// @${prop.padEnd(longest + 2, ' ')}${value}`
                : `// @${prop}`);
        return lines.join('\n');
    }
}
exports.UserscriptMeta = UserscriptMeta;
