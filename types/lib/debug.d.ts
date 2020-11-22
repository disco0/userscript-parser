import Debug from 'debug';
export declare const debugLine: Debug.Debugger;
export declare const debugClass: Debug.Debugger;
declare const debug: Debug.Debugger & {
    parse: Debug.Debugger;
    line: Debug.Debugger;
    class: Debug.Debugger;
};
export default debug;
