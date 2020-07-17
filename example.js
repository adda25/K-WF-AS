'use strict'

let cliParser = require('./index')

console.log(cliParser(process.argv.slice(2)))

console.log(cliParser('--foo'))

console.log(cliParser('--foo bar'))

console.log(cliParser('--foo bar --foo bar'))

console.log(cliParser('--foo 2.2'))

console.log(cliParser('--foo 2'))

console.log(cliParser(['--foo', 'bar', '--pippo', '2', '--isFriday', 'yes', '--pippo', 'ciccio']))

console.log(cliParser(''))

console.log(cliParser('--'))

console.log(cliParser('ss --s'))