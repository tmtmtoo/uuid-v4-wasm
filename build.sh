#!/bin/sh

function build() {
    cargo +nightly build --release --target wasm32-unknown-unknown
    wasm-bindgen target/wasm32-unknown-unknown/release/uuid_v4_wasm.wasm --out-dir lib
}

function gen_flow_file() {
    ./node_modules/.bin/flowgen ./lib/uuid_v4_wasm.d.ts -o ./lib/uuid_v4_wasm.js.flow

    LF=$(printf '\\\012_')
    LF=${LF%_}
    sed -i "" "1s/^/\/\/ @flow${LF}${LF}/" ./lib/uuid_v4_wasm.js.flow
}

function handle_error() {
    echo "could not build wasm"
}

if [ `uname` != "Darwin" ];
then
    handle_error
    exit 1
fi

if type ping > /dev/null 2>&1 && type wasm-bindgen > /dev/null 2>&1
then
    build
    gen_flow_file
else
    handle_error
fi
