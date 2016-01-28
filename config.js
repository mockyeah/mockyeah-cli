'use strict';

const root = global.MOCK_YEAH_ROOT = process.cwd();
const path = require('path');
const config = require('mockyeah/config');

config.version = require('./package.json').version;
config.setsDir = path.resolve(root, config.setsDir);
config.fixturesDir = path.resolve(root, config.fixturesDir);

module.exports = config;