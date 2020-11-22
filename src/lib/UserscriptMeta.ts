///<reference path="./UserscriptNS.ts"/>

// FIXME: For the love of god fix naming of identical (if not just nearly identical)
//        classes/interfaces

import is        from './check/guards';
import longest   from './util/longest';

import { 
    debugClass as debug 
}  from './debug';

import { 
    parseUserscriptMeta 
} from './parseUserscriptMeta';


//#region Userscript Namespace

import UserscriptMetaInterface = Userscript.Meta;

import MetaBlock = Userscript.MetaBlock;
import MetaKey   = Userscript.MetaKey;

// In preparation for when I break everything - also not sure atm if/how parser handles
// meta lines with no value (e.g. `// @noframes`)
type MetaValue      = MetaBlock[MetaKey];
// For iteration
type MetaValueTuple = [MetaKey, MetaValue]
type MetaEntries    = readonly MetaValueTuple[];

//#endregion Userscript Namespace

/**
 * @public
 */
export class UserscriptMeta implements UserscriptMetaInterface
{
    //#region Members
    
    meta:      MetaBlock;
    metablock: string = "";
    content:   string = "";

    //#endregion Members

    constructor(scriptSource: string)
    {
        const parsed = parseUserscriptMeta(scriptSource);
        if(!parsed)
        {
            debug("No userscript meta parsed from source.")
            throw new Error("No meta parsed from source file.");
        }

        this.content   = parsed.content;
        this.meta      = parsed.meta;
        this.metablock = parsed.metablock;
    }

    //#region Methods

    toString()
    {
        // Get longest meta prop length for formatting
        const longest: number = (UserscriptMeta.LongestMetaKey(this) as string).length;

        const metaSections: string[] = [];

        for(const [prop, values] of Object.entries(this.meta) as MetaEntries)
        {
            metaSections.push(UserscriptMeta.FormatPropLines(prop, values, longest))
        }
        
        return metaSections.join('\n');
    }

    get keys(): MetaKey[]
    {
        return Object.keys(this.meta) as MetaKey[];
    }
    
    //#endregion Methods

    //#region Static

    //// FIXME(disk0): For commented out method definition
    //// Meta keys are being returned properly but cant access length property? 
    // static LongestMetaKey<M extends UserscriptMeta | UserscriptMeta['meta'], K extends keyof ResolveMeta<M>>(meta: M): K

    static LongestMetaKey<M extends UserscriptMeta | UserscriptMeta['meta']>(meta: M): MetaKey
    {
        const resolved = (meta instanceof UserscriptMeta) ? meta.meta : meta;
        return Object.keys(resolved)
                     .sort(longest.string)[0] as MetaKey;
    }

    static FormatPropLines(prop: MetaKey, values: MetaValue | string, longest: number = 12): string
    {
        const lines = [];

        for(const value of is.Array(values) ? values : [values])
            // Conditional operator for no value case (e.g. `// @noframes`)
            lines.push(
                (typeof value !== 'undefined')
                    ? `// @${prop.padEnd(longest + 2, ' ')}${value}`
                    : `// @${prop}`
            )

        return lines.join('\n');
    }

    //#endregion Static
}

type ResolveMeta<T extends UserscriptMeta | MetaBlock> = 
    T extends MetaBlock      ? T         : 
    T extends UserscriptMeta ? T['meta'] : Partial<{ [key in MetaKey]: MetaValue }>
