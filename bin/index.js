#!/usr/bin/env node
'use strict';

/**
 * mockyeah cli api "table of contents".
 * Root `mockyeah` command does not invoke behavior other than
 * providing user with a catalog of available actions.
 */

const program = require('commander');
const version = require('../version');

program
  .version(version)
  .command('ls', 'list captured service response recordings')
  .command('play [name]', 'playback captured service response recording')
  .command('record [name]', 'capture service response recording')
  .parse(process.argv);