/// <reference path="UserscriptNS.d.ts" />
import UserscriptMetaInterface = Userscript.Meta;
import MetaBlock = Userscript.MetaBlock;
import MetaKey = Userscript.MetaKey;
declare type MetaValue = MetaBlock[MetaKey];
export declare class UserscriptMeta implements UserscriptMetaInterface {
    meta: MetaBlock;
    metablock: string;
    content: string;
    constructor(scriptSource: string);
    toString(): string;
    get keys(): MetaKey[];
    static LongestMetaKey<M extends UserscriptMeta | UserscriptMeta['meta']>(meta: M): MetaKey;
    static FormatPropLines(prop: MetaKey, values: MetaValue | string, longest?: number): string;
}
export {};
