#!/usr/bin/env node

const promisify = require('util').promisify

const fs = require('fs')

const readFile = promisify(fs.readFile)

const writeFile = promisify(fs.writeFile)

const exec = promisify(require('child_process').exec)

const packageJson = require('./package.json')

const build = packageName =>
    exec(`
        cargo +nightly build --release --target wasm32-unknown-unknown && \
        mkdir node browser && \
        wasm-bindgen --browser target/wasm32-unknown-unknown/release/${packageName}.wasm --out-dir browser && \
        wasm-bindgen --nodejs target/wasm32-unknown-unknown/release/${packageName}.wasm --out-dir node
    `)

const flowgen = (packageName, dir) =>
    exec(`./node_modules/.bin/flowgen ./${dir}/${packageName}.d.ts -o ./${dir}/${packageName}.js.flow`)

const injectFlowAnnotation = (packageName, dir) =>
    readFile(`./${dir}/${packageName}.js.flow`)
        .then(data => `// @flow \n\n${data.toString()}`)
        .then(data => writeFile(`./${dir}/${packageName}.js.flow`, data))

const hyphen2Underscore = str => str.replace(/-/g, '_')

/**
 * Main
 */
Promise.resolve(hyphen2Underscore(packageJson.name))
    .then(packageName =>
        build(packageName)
            .then(() => flowgen(packageName, 'browser'))
            .then(() => injectFlowAnnotation(packageName, 'browser'))
            .then(() => flowgen(packageName, 'node'))
            .then(() => injectFlowAnnotation(packageName, 'node'))
    )