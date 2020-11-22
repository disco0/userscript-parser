namespace Userscript
{
    export interface MetaBlock
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
    };

    export interface Meta
    {
        meta:      MetaBlock;
        metablock: string;
        content:   string;
    };
    
    export type MetaKey = keyof MetaBlock;
}