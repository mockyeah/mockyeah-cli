#!/usr/bin/env node
'use strict';

/**
 * mockyeah cli api "table of contents".
 * Root `mockyeah` command does not invoke behavior other than
 * providing user with a catalog of available actions.
 */

const program = require('commander');
const config = require('../config');

program
  .version(config.version)
  .command('serve [options]', 'development server api')
  .parse(process.argv);