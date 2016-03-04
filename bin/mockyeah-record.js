#!/usr/bin/env node
'use strict';

/* eslint-disable no-console, no-process-exit, no-sync */

/**
 * `mockyeah record` development server api.
 */

const program = require('commander');
const boot = require('../lib/boot');
let name;

program
  .option('-v, --verbose', 'Verbose output')
  .parse(process.argv);

// Prepare options
global.MOCKYEAH_VERBOSE_OUTPUT = Boolean(program.verbose);
name = program.args[0];

if (!name) {
  console.log(chalk.red('Recording name required'));
  process.exit(1);
}

boot((env) => {
  require(env.modulePath).record(name);
});