# Kata WF - AS

## Before you start

You will need an Node.JS environment in
order to run this software.
The minimum tested Node version is v4.9.1.

## Run it

In order to test the function, run
the example.js file

```sh

node example.js 

node example.js --foo bar

```

To include the function on your own code:

```js

let cli = require('./index')

/**
* 	Parse and send to stdout the cli arguments
*/
console.log(cli(process.argv.slice(2)))

/**
* 	Parse and send to stdout with string input format
*/
console.log(cli('--foo bar'))

/**
* 	Parse and send to stdout with array input format
*/
console.log(cli(['--foo', 'bar']))

```

## Considerations

The source code is in *src/cli-parser.js*.
The function will parse the cli args in one loop.