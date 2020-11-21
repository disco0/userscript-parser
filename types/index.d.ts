interface UserscriptMetaBlock {
    name: string[];
    description: string[];
    author: string[];
    version?: string[];
    match?: string[];
    license?: string[];
    grant?: string[];
    date?: string[];
    include?: string[];
    exclude?: string[];
    'run-at'?: string[];
    downloadURL?: string[];
    homepageURL?: string[];
}
interface UserscriptMeta {
    meta: UserscriptMetaBlock;
    metablock: string;
    content: string;
}
declare const defaultReturnValue: undefined;
/**
 * Userscript format:
 * http://wiki.greasespot.net/Metadata_Block
 */
declare function extractMetablock(userscriptText: string): UserscriptMeta | typeof defaultReturnValue;
export = extractMetablock;
