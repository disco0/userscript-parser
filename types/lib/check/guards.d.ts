import { WithLength } from './StringLength';
export declare function isObject(obj: unknown): obj is Object;
export declare const isArray: <T>(arg: {} | T) => arg is T extends readonly any[] ? unknown extends T ? never : readonly any[] : any[];
export declare function isFunction<T extends (...args: any[]) => any>(obj: unknown): obj is T;
export declare function isString(obj: unknown): obj is string;
export declare function isNumber(obj: unknown): obj is number;
export declare function isDate(obj: unknown): obj is Date;
export declare function isRegExp(obj: unknown): obj is RegExp;
export declare function isNonZeroLength<O extends WithLength>(obj: O): obj is O & {
    length: Exclude<number, 0>;
};
export declare const is: {
    Function: typeof isFunction;
    Object: typeof isObject;
    String: typeof isString;
    Number: typeof isNumber;
    Date: typeof isDate;
    RegExp: typeof isRegExp;
    Array: <T>(arg: {} | T) => arg is T extends readonly any[] ? unknown extends T ? never : readonly any[] : any[];
    nonZeroLength: typeof isNonZeroLength;
};
export default is;
