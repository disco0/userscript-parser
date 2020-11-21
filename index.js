"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const chalk_1 = __importDefault(require("chalk"));
const userscriptMetaBlockRegex = /\B(?<metablock>\/\/ ==UserScript==\r?\n(?<metas>[\S\s]*?)\r?\n\/\/ ==\/UserScript==)(?<code>[\S\s]*)/;
const defaultReturnValue = undefined;
/**
 * Userscript format:
 * http://wiki.greasespot.net/Metadata_Block
 */
function extractMetablock(userscriptText) {
    try {
        const blocks = userscriptText.match(userscriptMetaBlockRegex);
        console.dir(blocks);
        if (!blocks) {
            return defaultReturnValue;
        }
        const { metablock, metas, code } = blocks.groups;
        //#region Debug
        console.log(chalk_1.default.magenta `metablock`);
        console.dir(metablock);
        console.log(chalk_1.default.magenta `metas`);
        console.dir(metas);
        console.log(chalk_1.default.magenta `code`);
        console.dir(code);
        //#endregion Debug
        const meta = {};
        const metaArray = metas.split(/\n/);
        for (const metaItem of metaArray) {
            const parts = metaItem.match(/@([\w-]+)\s+(.+?)\s*$/);
            if (parts) {
                // if(!(parts[1] in meta))
                //     meta[parts[1]] = [] as string[];
                meta[parts[1]] = meta[parts[1]] || [];
                meta[parts[1]].push(parts[2]);
            }
            else {
                console.error(chalk_1.default.red `Failed to parse meta from line: ${chalk_1.default.bold.red(metaItem)}`);
            }
        }
        // metaArray.forEach(function(m)
        // {
        //     var parts = m.match(/@([\w-]+)\s+(.+)/)
        //     if(parts)
        //     {
        //         meta[parts[1]] = meta[parts[1]] || []
        //         meta[parts[1]].push(parts[2])
        //     }
        // })
        return {
            meta,
            metablock,
            content: code
        };
    }
    catch (e) {
        if (console)
            console.error(e);
        return defaultReturnValue;
    }
}
module.exports = extractMetablock;
