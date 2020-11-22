import { UserscriptMeta } from './UserscriptMeta';
import { DefaultReturn } from './parseUserscriptMeta';
declare function ParseUserscript(userscript: string): UserscriptMeta | DefaultReturn;
declare namespace ParseUserscript {
    export import UserscriptMeta = Userscript.Meta;
    export import UserscriptMetaBlock = Userscript.MetaBlock;
    export import UserscriptMetaKey = Userscript.MetaKey;
}
export = ParseUserscript;
