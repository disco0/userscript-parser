"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUserscriptMeta = exports.DefaultReturnValue = void 0;
//#region Logging
const chalk_1 = __importDefault(require("chalk"));
const debug_1 = __importDefault(require("./debug"));
const maxCodePreviewLength = 150;
//#endregion Logging
const userscriptMetaBlockRegex = /\B(?<metablock>\/\/ ==UserScript==\r?\n(?<metas>[\S\s]*?)\r?\n\/\/ ==\/UserScript==)(?<code>[\S\s]*)/;
exports.DefaultReturnValue = undefined;
/**
 * Parses [userscript meta comment block](http://wiki.greasespot.net/Metadata_Block) in
 * JavaScript/TypeScript source file and returns a JSON object.
 */
function parseUserscriptMeta(userscriptText) {
    try {
        const blocks = userscriptText.match(userscriptMetaBlockRegex);
        debug_1.default.extend("initial-parse")('Matched: %o', blocks !== null && blocks !== void 0 ? blocks : chalk_1.default.red `[Failure]`);
        if (!blocks) {
            debug_1.default('Failed to match userscript meta block, returning default value [%o]', exports.DefaultReturnValue);
            return exports.DefaultReturnValue;
        }
        const { code, metablock, metas, } = blocks.groups;
        //#region Debug
        debug_1.default(chalk_1.default.magenta `metablock:` + `\n%s`, metablock);
        debug_1.default(chalk_1.default.magenta `metas:` + `\n%s`, metas);
        debug_1.default(chalk_1.default.magenta `code:` + `\n%s`, code.padStart(maxCodePreviewLength, ''));
        //#endregion Debug
        const meta = {};
        const metaArray = metas.split(/\n/);
        for (const metaItem of metaArray) {
            const parts = metaItem.match(/@([\w-]+)\s+(.+?)\s*$/);
            if (parts) {
                meta[parts[1]] = meta[parts[1]] || [];
                meta[parts[1]].push(parts[2]);
            }
            else
                debug_1.default.line(chalk_1.default.red `Failed to parse meta from line: ${chalk_1.default.bold.red(metaItem)}`);
        }
        return {
            meta,
            metablock,
            content: code
        };
    }
    catch (e) {
        if (console)
            console.error(e);
        return exports.DefaultReturnValue;
    }
}
exports.parseUserscriptMeta = parseUserscriptMeta;
