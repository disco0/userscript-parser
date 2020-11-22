import UserscriptMeta      = Userscript.Meta;
import UserscriptMetaBlock = Userscript.MetaBlock;
import UserscriptMetaKey   = Userscript.MetaKey;

//#region Logging

import c     from 'chalk';
import debug from './debug'

const maxCodePreviewLength = 150;

//#endregion Logging

const userscriptMetaBlockRegex
    = /\B(?<metablock>\/\/ ==UserScript==\r?\n(?<metas>[\S\s]*?)\r?\n\/\/ ==\/UserScript==)(?<code>[\S\s]*)/;

export const DefaultReturnValue = undefined;
export type  DefaultReturn      = typeof DefaultReturnValue;

/**
 * Parses [userscript meta comment block](http://wiki.greasespot.net/Metadata_Block) in
 * JavaScript/TypeScript source file and returns a JSON object.
 */
export function parseUserscriptMeta(userscriptText: string): UserscriptMeta | DefaultReturn
{
    try
    {
        const blocks = userscriptText.match(userscriptMetaBlockRegex);
        debug.extend("initial-parse")('Matched: %o', blocks ?? c.red`[Failure]`)

        if(!blocks)
        {
            debug('Failed to match userscript meta block, returning default value [%o]', DefaultReturnValue)
            return DefaultReturnValue
        }

        const {
            code,
            metablock, 
            metas, 
        } = blocks.groups!;
        
        //#region Debug
        
        debug(c.magenta`metablock:` + `\n%s`, metablock);
        debug(c.magenta`metas:`     + `\n%s`, metas);
        debug(c.magenta`code:`      + `\n%s`, code.padStart(maxCodePreviewLength, ''));
        
        //#endregion Debug

        const meta      = {} as UserscriptMetaBlock;
        const metaArray = metas.split(/\n/);

        for(const metaItem of metaArray)
        {
            const parts = metaItem.match(/@([\w-]+)\s+(.+?)\s*$/) as [string, UserscriptMetaKey, ...string[]];
            if(parts)
            {
                meta[parts[1]] = meta[parts[1]] || [];
                meta[parts[1]]!.push(parts[2])
            }
            else
                debug.line(c.red`Failed to parse meta from line: ${c.bold.red(metaItem)}`)

        }
        return {
            meta,
            metablock,
            content: code
        }
    } catch(e)
    {
        if(console) 
            console.error(e);

        return DefaultReturnValue;
    }
}