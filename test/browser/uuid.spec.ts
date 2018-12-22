it('uuid format', () =>
    import('../../browser/uuid_v4_wasm')
        .then(wasm => wasm.uuid())
        .then(uuid => {
            const rgx = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$/
            expect(uuid).toMatch(rgx)
        })
)

it('uuid not duplicate', () =>
    import('../../browser/uuid_v4_wasm')
        .then(wasm => [wasm.uuid(), wasm.uuid()])
        .then(([a, b]) => expect(a).not.toEqual(b))
)