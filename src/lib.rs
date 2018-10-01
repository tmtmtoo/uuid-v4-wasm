extern crate rand;
extern crate regex;
extern crate wasm_bindgen;

mod uuid;

use wasm_bindgen::prelude::*;
use uuid::gen_uuid_with_xorshift;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = Math)]
    fn random() -> f64;
}

#[wasm_bindgen]
pub fn uuid() -> String {
    let seed = random();
    gen_uuid_with_xorshift(seed)
}
