"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const tape = require("tape");
const __1 = __importDefault(require("../"));
const defaultReturnValue = undefined;
tape('export a parser function', function (test) {
    test.equal(typeof __1.default, 'function', 'require("userscript") should be a function');
    test.end();
});
tape('parse a valid userscript -> { meta, metablock, content }', function (test) {
    const userscript = fs_1.default.readFileSync('./test/valid-userscript.user.js', 'utf8');
    const result = __1.default(userscript);
    test.deepEqual(result === null || result === void 0 ? void 0 : result.meta, {
        description: ['This script even does the laundry!',],
        downloadURL: ['https://www.example.com/myscript.user.js'],
        name: ['Awesome Script'],
        homepageURL: ['https://github.com/gantt/downloadyoutube'],
        author: ['Gantt'],
        version: ['1.8.3'],
        date: ['2015-05-17'],
        include: ['https://www.youtube.com/*'],
        exclude: ['https://www.youtube.com/embed/*'],
        match: ['https://www.youtube.com/*'],
        grant: ['GM_xmlhttpRequest', 'GM_getValue', 'GM_setValue'],
        'run-at': ['document-end'],
        license: ['MIT License']
    });
    test.equal(result === null || result === void 0 ? void 0 : result.metablock.trim(), `// ==UserScript==
// @name        Awesome Script
// @description This script even does the laundry!
// @downloadURL https://www.example.com/myscript.user.js
// @homepageURL https://github.com/gantt/downloadyoutube
// @author      Gantt
// @version     1.8.3
// @date        2015-05-17
// @include     https://www.youtube.com/*
// @exclude     https://www.youtube.com/embed/*
// @match       https://www.youtube.com/*
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @noframes
// @run-at      document-end
// @license     MIT License
// ==/UserScript==`);
    test.equal(result === null || result === void 0 ? void 0 : result.content.trim(), 'var whoami = "USERSCRIPT"');
    test.end();
});
tape('parse an invalid userscript -> null', function (t) {
    t.equal(__1.default(''), defaultReturnValue);
    t.end();
});
