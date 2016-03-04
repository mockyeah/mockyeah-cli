#!/usr/bin/env node
'use strict';

/* eslint-disable no-console, no-process-exit, no-sync */

/**
 * `mockyeah play` development server api.
 */

const fs = require('fs');
const path = require('path');
const program = require('commander');
const boot = require('../lib/boot');
const inquirer = require('inquirer');
const chalk = require('chalk');
const tildify = require('tildify');
let name;

program
  .option('-v, --verbose', 'Verbose output')
  .parse(process.argv);

// Prepare options
global.MOCKYEAH_VERBOSE_OUTPUT = Boolean(program.verbose);
name = program.args[0];

boot((env) => {
  const fixturesDir = env.config.fixturesDir;
  let fixtureNames;

  try {
    fixtureNames = fs.readdirSync(fixturesDir).filter((file) => {
      return fs.statSync(path.join(fixturesDir, file)).isDirectory();
    });
  } catch (err) {
    console.log(chalk.red('Fixture directory not found at ' + tildify(fixturesDir)));
    process.exit(1);
  }

  if (!fixtureNames.length) {
    console.log(chalk.red('No fixtures available to start'));
    console.log(chalk.red('Record one by running: mockyeah record [name]'));
    process.exit(0);
  }

  if (!name) {
    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: 'Choose a recording to play:',
        choices: fixtureNames
      }
    ], answers => {
      require(env.modulePath).play(answers.name);
    });
  }

  if (name) {
    require(env.modulePath).play(name);
  }
});