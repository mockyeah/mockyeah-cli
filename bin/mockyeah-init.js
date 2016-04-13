#!/usr/bin/env node

'use strict';

/* eslint-disable no-console, no-sync */

/**
 * `mockyeah init` initializes mockyeah configuration.
 */

const fs = require('fs');
const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const print = require('pretty-print');

program
  .parse(process.argv);

const currentDirectory = process.cwd();
const initialize = () => {
  inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: 'Choose a name for the mockyeah server:'
  }, {
    type: 'input',
    name: 'host',
    message: 'Choose a host for mockyeah to run on:'
  }, {
    type: 'input',
    name: 'port',
    message: 'Choose a port for mockyeah to run on:'
  }, {
    type: 'input',
    name: 'fixturesDir',
    message: 'Choose a directory for mockyeah to locate fixtures:'
  }], answers => {
    const data = {
      name: answers.name || 'mockyeah',
      host: answers.host || 'localhost',
      port: parseInt(answers.port, 10) || 4001,
      fixturesDir: answers.fixturesDir || './mockyeah/fixtures'
    };

    fs.writeFile('.mockyeah', JSON.stringify(data), err => {
      if (err) console.log(chalk.red(err));

      console.log(`.mockyeah written at ${currentDirectory}`);
      print(data);
    });
  });
};

try {
  fs.accessSync(currentDirectory + '/.mockyeah', fs.F_OK);
  inquirer.prompt([{
    type: 'confirm',
    name: 'overwrite',
    message: '.mockyeah file already exists; Overwrite?'
  }], answer => {
    if (answer.overwrite) initialize();
  });
} catch (err) {
  initialize();
}
