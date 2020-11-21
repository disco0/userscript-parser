import fs from 'fs'
import path from 'path'

import UserscriptParser = require('../');

const testFilePath = path.resolve(__dirname, 'valid-userscript.user.js');

const testScriptContent = fs.readFileSync(testFilePath, 'utf-8');

const parsed = UserscriptParser(testScriptContent)

console.dir(parsed);