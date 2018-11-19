# `uuid-v4-wasm`
An uuid(v4) generator library with WebAssembly.

# Requirements
- webpack >4

**add .wasm extension to webpack config file**
```
  resolve: {
    extensions: ['.js', '.wasm'],
```

# Install
```sh
$ npm install uuid-v4-wasm
```

# Usage
```js
import('uuid-v4-wasm')
    .then(wasm => wasm.uuid())
    .then(uuid => console.log(uuid))
```
