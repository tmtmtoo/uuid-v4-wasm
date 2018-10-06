# `uuid-v4-wasm`
An uuid(v4) generator library with WebAssembly.

# Requirements
- webpack >4

# Install
```sh
$ npm install git+https://github.com/tmtmtoo/uuid-v4-wasm
```

# Usage
```js
import('uuid-v4-wasm')
    .then(wasm => wasm.uuid())
    .then(uuid => console.log(uuid))
```

--- 

# Build Requirements
- osx
- rust nightly toolchain
    - wasm32-unknown-unknown
- wasm-bindgen-cli
- node.js