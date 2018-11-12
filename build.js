#!/usr/bin/env node

const promisify = require('util').promisify

const fs = require('fs')

const readFile = promisify(fs.readFile)

const writeFile = promisify(fs.writeFile)

const exec = promisify(require('child_process').exec)

const packageJson = require('./package.json')

const build = packageName =>
    exec(`
        cargo +nightly build --release --target wasm32-unknown-unknown &&
        wasm-bindgen target/wasm32-unknown-unknown/release/${packageName}.wasm --out-dir lib
    `)

const flowgen = packageName =>
    exec(`./node_modules/.bin/flowgen ./lib/${packageName}.d.ts -o ./lib/${packageName}.js.flow`)

const injectFlowAnnotation = packageName =>
    readFile(`./lib/${packageName}.js.flow`)
        .then(data => `// @flow \n\n${data.toString()}`)
        .then(data => writeFile(`./lib/${packageName}.js.flow`, data))

const hyphen2Underscore = str => str.replace(/-/g, '_')

const printError = e => console.log(`Failed to build:\n${e}`)

/**
 * Main
 */
Promise.resolve(hyphen2Underscore(packageJson.name))
    .then(packageName =>
        build(packageName)
            .then(() => flowgen(packageName))
            .then(() => injectFlowAnnotation(packageName))
    )
.catch(e => printError(e))