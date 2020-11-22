"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is = exports.isNonZeroLength = exports.isRegExp = exports.isDate = exports.isNumber = exports.isString = exports.isFunction = exports.isArray = exports.isObject = void 0;
//#region Guards
//#region Guard toString Function
function assertToString(obj) {
    if (!(!!obj && typeof obj === 'function'))
        throw new Error(`Failed to resolve primordial toString function. Value passed to assert: ${String(obj)}`);
}
function getPrimativeToString() {
    return ((protoProps) => {
        var _a;
        for (const propName of protoProps)
            if (typeof ((_a = {}[propName]) === null || _a === void 0 ? void 0 : _a.toString) === 'function')
                return {}[propName].toString;
    })([`__proto__`, `prototype`]);
}
const toString = getPrimativeToString();
if (typeof toString === 'undefined')
    throw new Error();
//#endregion Guard toString Function
function isObject(obj) {
    return toString.call(obj) === "[object Object]";
}
exports.isObject = isObject;
exports.isArray = Array.isArray;
function isFunction(obj) {
    return toString.call(obj) === "[object Function]";
}
exports.isFunction = isFunction;
function isString(obj) {
    return toString.call(obj) === "[object String]";
}
exports.isString = isString;
function isNumber(obj) {
    return toString.call(obj) === "[object Number]";
}
exports.isNumber = isNumber;
function isDate(obj) {
    return toString.call(obj) === "[object Date]";
}
exports.isDate = isDate;
function isRegExp(obj) {
    return toString.call(obj) === "[object RegExp]";
}
exports.isRegExp = isRegExp;
//#region Extended
function isNonZeroLength(obj) {
    var _a;
    return !!obj && ((_a = obj.length) !== null && _a !== void 0 ? _a : 0) > 0;
}
exports.isNonZeroLength = isNonZeroLength;
//#endregion Extended
exports.is = {
    Function: isFunction,
    Object: isObject,
    String: isString,
    Number: isNumber,
    Date: isDate,
    RegExp: isRegExp,
    Array: exports.isArray,
    nonZeroLength: isNonZeroLength
};
exports.default = exports.is;
//#endregion Guards
