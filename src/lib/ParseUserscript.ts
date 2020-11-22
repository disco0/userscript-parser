// Barrel for module entry

import debug from './debug'

import { UserscriptMeta } from './UserscriptMeta';
import { DefaultReturnValue, DefaultReturn} from './parseUserscriptMeta';

function ParseUserscript(userscript: string): UserscriptMeta | DefaultReturn
{
    try
    {
        return new UserscriptMeta(userscript);
    }
    catch(error)
    {
        debug("Error parsing userscript, returning default value.")
        return DefaultReturnValue;
    }
}

//#region Overload Module Entry Object

/*
 * FIXME: Error when importing this module and declaring the namespace overload in the 
 *        entry file `./src/index.ts` TypeScript throws an error. If possible figure out
 *        how to actually do this
 */

namespace ParseUserscript
{
    export import UserscriptMeta      = Userscript.Meta;
    export import UserscriptMetaBlock = Userscript.MetaBlock;
    export import UserscriptMetaKey   = Userscript.MetaKey;
}

//#endregion Overload Module Entry Object

export = ParseUserscript;