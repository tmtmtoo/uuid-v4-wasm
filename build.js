#!/usr/bin/env node

const promisify = require('util').promisify

const fs = require('fs')

const readFile = promisify(fs.readFile)

const writeFile = promisify(fs.writeFile)

const exec = promisify(require('child_process').exec)

const packageJson = require('./package.json')

const build = (packageName, dir) =>
    exec(`
        cargo +nightly build --release --target wasm32-unknown-unknown && \
        mkdir ${dir} && \
        wasm-bindgen --${dir} target/wasm32-unknown-unknown/release/${packageName}.wasm --out-dir ${dir}
    `)

const flowgen = (packageName, dir) =>
    exec(`./node_modules/.bin/flowgen ./${dir}/${packageName}.d.ts -o ./${dir}/${packageName}.js.flow`)

const injectFlowAnnotation = (packageName, dir) =>
    readFile(`./${dir}/${packageName}.js.flow`)
        .then(data => `// @flow \n\n${data.toString()}`)
        .then(data => writeFile(`./${dir}/${packageName}.js.flow`, data))

const hyphen2Underscore = str => str.replace(/-/g, '_')

const packageName = hyphen2Underscore(packageJson.name)

build(packageName, 'browser')
    .then(() => flowgen(packageName, 'browser'))
    .then(() => injectFlowAnnotation(packageName, 'browser'))

build(packageName, 'nodejs')
    .then(() => flowgen(packageName, 'nodejs'))
    .then(() => injectFlowAnnotation(packageName, 'nodejs'))
