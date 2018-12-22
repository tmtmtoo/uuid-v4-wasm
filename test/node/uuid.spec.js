const wasm = require("../../nodejs/uuid_v4_wasm")

describe(__filename, () => {
    it("uuid format", () => {
        const uuid = wasm.uuid()
        const rgx = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$/
        expect(uuid).toMatch(rgx)
    })

    it("uuid not duplicate", () => {
        const a = wasm.uuid()
        const b = wasm.uuid()
        expect(a).not.toEqual(b)
    })
})
