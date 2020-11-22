import Debug from 'debug';

const debugBase = Debug('userscript-parse');

const debugInitialParse = debugBase.extend('initial-parse');
export const debugLine = debugBase.extend('line');
export const debugClass = debugBase.extend('class');

const debug = Object.assign(debugBase, {
    parse: debugInitialParse,
    line:  debugLine,
    class: debugClass
})

export default debug;