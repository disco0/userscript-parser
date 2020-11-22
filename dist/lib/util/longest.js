"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.longest = exports.longestString = void 0;
function longestString(a, b) {
    return b.length - a.length;
}
exports.longestString = longestString;
exports.longest = {
    string: longestString
};
exports.default = exports.longest;
