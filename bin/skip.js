#!/usr/bin/env node
const config = require('../package.json');
const program = require('commander');
const server = require('../server').default;

program
    .version(config.version);

program
    .command('start')
    .action(function(){
        server(process.cwd());
    });

program
    .parse(process.argv);
