/**
 * Output reference, not actual tests (yet)
 */

// Check output is appropirate 
const inRepl =
    // In a node repl
    ('_' in globalThis) ? false : 
    // Top level module
    !('parent' in module)


//#region Imports

import fs from 'fs'
import path from 'path'

import c from 'chalk'

import parseUserscriptMeta from '../'
import { UserscriptMeta } from '../lib/UserscriptMetaClass';

//#endregion Imports

//#region Logging

const { log: $log, error } = console;
const logMethod = $log;

const log = Object.assign($log, 
{
    section(msg: string){ logMethod(c.underline.hex("#00C").bold(msg.trim())) },
    object(obj: any, description: string = "")
    { 
        if(description.length > 0) 
            log.section(`${description}:`);
        logMethod('%o', obj);
    }
})

//#endregion Logging

// If testing breaks its probably this
const testFilePath = path.resolve(__dirname, 'valid-userscript.user.js');
const script = fs.readFileSync(testFilePath, 'utf-8');

// Save all results to inspect in repl
const results: Record<string, any> = 
{

}

//#region Main Function

const parsed = parseUserscriptMeta(script)
log.object(parsed, "Function");
results.function = parsed;

//#endregion Main Function

//#region Class

const instance = new UserscriptMeta(script);
log.object(instance, "Class");
results.class = instance;

//#endregion Class

export = results;