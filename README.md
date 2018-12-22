# `uuid-v4-wasm` [![CircleCI](https://circleci.com/gh/tmtmtoo/uuid-v4-wasm.svg?style=svg)](https://circleci.com/gh/tmtmtoo/uuid-v4-wasm)
An uuid(v4) generator library with WebAssembly.

- This library supports both typescript and flowtype.
- This library supports both node.js and browser.

# Install
```sh
$ npm install uuid-v4-wasm
```

# node.js
**Usage**

```js
const wasm = require('uuid-v4-wasm')
const uuid = wasm.uuid()
console.log(uuid)
```

# browser
**Requirements**
- webpack >=4

*Note: add .wasm extension to webpack config file*
```
  resolve: {
    extensions: ['.js', '.wasm'],
```

**Usage**
```js
import('uuid-v4-wasm')
    .then(wasm => wasm.uuid())
    .then(uuid => console.log(uuid))
```
