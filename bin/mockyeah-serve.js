#!/usr/bin/env node
'use strict';

/* eslint-disable no-sync */

/**
 * `mockyeah serve` development server api.
 */

const fs = require('fs');
const program = require('commander');
const inquirer = require('inquirer');
const config = require('../config');

program
  .version(config.version)
  .option('-s, --set <set>', 'Mock Service Set to load')
  .parse(process.argv);


const sets = fs.readdirSync(config.setsDir)
  .map((fileName) => /\.js/.test(fileName) && fileName.replace(/\.js$/, ''));

if (!program.set) {
  inquirer.prompt([
    {
      type: 'list',
      name: 'set',
      message: 'Choose a Mock Service Set to load:',
      choices: sets
    }
  ], answers => {
    require('mockyeah').loadSet(answers.set);
  });
}

if (program.set) {
  require('mockyeah').loadSet(program.set);
}