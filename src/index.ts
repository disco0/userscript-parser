import c from 'chalk';

interface UserscriptMetaBlock
{
    name:         string[];
    description:  string[];
    author:       string[];
    version?:     string[];
    match?:       string[];
    license?:     string[];
    grant?:       string[];
    date?:        string[];
    include?:     string[];
    exclude?:     string[];
    'run-at'?:    string[];
    downloadURL?:  string[];
    homepageURL?:  string[];
}

type UserscriptMetaKey = keyof UserscriptMetaBlock;

interface UserscriptMeta
{
    meta:      UserscriptMetaBlock;
    metablock: string;
    content:   string;
}

const userscriptMetaBlockRegex
    = /\B(?<metablock>\/\/ ==UserScript==\r?\n(?<metas>[\S\s]*?)\r?\n\/\/ ==\/UserScript==)(?<code>[\S\s]*)/;

const defaultReturnValue = undefined;

/**
 * Userscript format:
 * http://wiki.greasespot.net/Metadata_Block
 */

function extractMetablock(userscriptText: string): UserscriptMeta | typeof defaultReturnValue
{
    try
    {
        const blocks = userscriptText.match(userscriptMetaBlockRegex);
        console.dir(blocks)

        if(!blocks)
        {
            return defaultReturnValue
        }

        const { metablock, metas, code} = blocks.groups!;
        
        //#region Debug
        
        console.log(c.magenta`metablock`)
        console.dir(metablock)
        
        console.log(c.magenta`metas`)
        console.dir(metas)

        console.log(c.magenta`code`)
        console.dir(code)
        
        //#endregion Debug

        const meta      = {} as UserscriptMetaBlock;
        const metaArray = metas.split(/\n/);

        for(const metaItem of metaArray)
        {
            const parts = metaItem.match(/@([\w-]+)\s+(.+?)\s*$/) as [string, UserscriptMetaKey, ...string[]];
            if(parts)
            {
                // if(!(parts[1] in meta))
                //     meta[parts[1]] = [] as string[];
                
                meta[parts[1]] = meta[parts[1]] || [];
                meta[parts[1]]!.push(parts[2])
            }
            else
            {
                console.error(c.red`Failed to parse meta from line: ${c.bold.red(metaItem)}`)
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
        }
    } catch(e)
    {
        if(console) console.error(e)
        return defaultReturnValue;
    }
}

export = extractMetablock;