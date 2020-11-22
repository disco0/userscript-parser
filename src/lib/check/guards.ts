import { 
    NonZeroLength,
    NonZeroLengthString,
    WithLength
} from './StringLength'

//#region Guards

//#region Guard toString Function

function assertToString<T extends () => string>(obj: unknown): asserts obj is T
{
    if(!(!!obj && typeof obj === 'function'))
        throw new Error(`Failed to resolve primordial toString function. Value passed to assert: ${String(obj)}`);
}

function getPrimativeToString(): Maybe<() => string>
{
    return ((protoProps) => {
        for(const propName of protoProps)
            if(typeof ({} as Record<string, string>)[propName]?.toString === 'function') 
                return ({} as Record<string, string>)[propName].toString;  
    })([`__proto__`, `prototype`] as const);  
}
const toString = getPrimativeToString()!;

if(typeof toString === 'undefined')
    throw new Error();

//#endregion Guard toString Function

export function isObject(obj: unknown): obj is Object
{
    return toString.call(obj) === "[object Object]"
}

export const {isArray} = Array;

export function isFunction<T extends (...args: any[]) => any>(obj: unknown): obj is T
{
    return toString.call(obj) === "[object Function]"
}
export function isString(obj: unknown): obj is string 
{
    return toString.call(obj) === "[object String]"
}
export function isNumber(obj: unknown): obj is number 
{
    return toString.call(obj) === "[object Number]"
}
export function isDate(obj: unknown): obj is Date 
{
    return toString.call(obj) === "[object Date]"
}
export function isRegExp(obj: unknown): obj is RegExp 
{
    return toString.call(obj) === "[object RegExp]"
}

//#region Extended

export function isNonZeroLength<O extends WithLength>(obj: O): obj is O & {length: Exclude<number, 0> }
{
    return !!obj && (obj.length ?? 0) > 0
}

//#endregion Extended

export const is =
{
    Function: isFunction,
    Object:   isObject,
    String:   isString,
    Number:   isNumber,
    Date:     isDate,
    RegExp:   isRegExp,
    Array:    isArray,

    nonZeroLength: isNonZeroLength
}

export default is;

//#endregion Guards

