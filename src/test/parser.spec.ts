import fs from 'fs'
import tape = require('tape');
import usp from '../';

const defaultReturnValue = undefined;

tape('export a parser function', 
function (test) 
{
    test.equal(typeof usp, 'function', 'require("userscript") should be a function')
    test.end()
})

tape('parse a valid userscript -> { meta, metablock, content }', 
function (test) 
{
    const userscript = fs.readFileSync('./test/valid-userscript.user.js', 'utf8')
    const result = usp(userscript)

    test.deepEqual(result?.meta, {
        description: [ 'This script even does the laundry!', ],
        downloadURL: [ 'https://www.example.com/myscript.user.js' ],
        name: [ 'Awesome Script' ],
        homepageURL: [ 'https://github.com/gantt/downloadyoutube' ],
        author: [ 'Gantt' ],
        version: [ '1.8.3' ],
        date: [ '2015-05-17' ],
        include: [ 'https://www.youtube.com/*' ],
        exclude: [ 'https://www.youtube.com/embed/*' ],
        match: [ 'https://www.youtube.com/*' ],
        grant: [ 'GM_xmlhttpRequest', 'GM_getValue', 'GM_setValue' ],
        'run-at': [ 'document-end' ],
        license: [ 'MIT License' ]
    })
    test.equal(result?.metablock.trim(), `// ==UserScript==
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
// @run-at      document-end
// @license     MIT License
// ==/UserScript==`);
    test.equal(result?.content.trim(), 'var whoami = "USERSCRIPT"')
    test.end()
});

tape('parse an invalid userscript -> null', 
function (t) 
{
    t.equal(usp(''), defaultReturnValue)
    t.end()
})
