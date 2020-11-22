import UserscriptMeta = Userscript.Meta;
export declare const DefaultReturnValue: undefined;
export declare type DefaultReturn = typeof DefaultReturnValue;
/**
 * Parses [userscript meta comment block](http://wiki.greasespot.net/Metadata_Block) in
 * JavaScript/TypeScript source file and returns a JSON object.
 */
export declare function parseUserscriptMeta(userscriptText: string): UserscriptMeta | DefaultReturn;
