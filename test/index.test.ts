/* eslint-disable spaced-comment */
/// <reference path="../index.d.ts" />
import "../src/index";

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeTrue(): CustomMatcherResult
            toBeFalse(): CustomMatcherResult
        }
    }
}

expect.extend({
    toBeTrue(received: boolean): jest.CustomMatcherResult {
        const pass = received === true;
        // eslint-disable-next-line func-style
        const message: () => string = () => (pass ? "" : `Received boolean (${received}) !== true`);
        return {
            message,
            pass
        };
    },
    toBeFalse(received: boolean): jest.CustomMatcherResult {
        const pass = received === false;
        // eslint-disable-next-line func-style
        const message: () => string = () => (pass ? "" : `Received boolean (${received}) !== false`);
        return {
            message,
            pass
        };
    }
});

test("String.isEmpty", () => {
    expect("".isEmpty()).toBeTrue();
    expect(" ".isEmpty()).toBeFalse();
});

test("Array.flatMap", () => {
    expect([ 1, 2, 3, 4, 5 ].flatMap((x) => [ x, x * x ]))
        .toStrictEqual([ 1, 1, 2, 4, 3, 9, 4, 16, 5, 25 ]);
});

test("Array.first", () => {
    expect([ 1, 2, 3 ].first()).toStrictEqual(1);
    expect([ 1 ].first()).toStrictEqual(1);
    expect([].first()).toStrictEqual(undefined);
});

test("Array.last", () => {
    expect([ 1, 2, 3 ].last()).toStrictEqual(3);
    expect([ 1 ].last()).toStrictEqual(1);
    expect([].last()).toStrictEqual(undefined);
});

test("Array.includesAny", () => {
    expect([ 1, 2, 3, 4, 5 ].includesAny([ 0, 4, 6, 8 ])).toBeTrue();
    expect([ 1, 2, 3, 4, 5 ].includesAny([ 0, 6, 8 ])).toBeFalse();
    expect(([ ] as number[]).includesAny([ 0, 6, 8 ])).toBeFalse();
    expect([ 1, 2, 3, 4, 5 ].includesAny([ ])).toBeFalse();
    expect(([ ] as number[]).includesAny([ ])).toBeFalse();
});

test("Array.filterNotNone", () => {
    expect([ 1, 2, null, 3, undefined, 4, 5, undefined, null ]
        .filterNotNone())
        .toStrictEqual([ 1, 2, 3, 4, 5 ]);
    expect([ 1, 2, 3, 4, 5 ]
        .filterNotNone())
        .toStrictEqual([ 1, 2, 3, 4, 5 ]);
    expect([ ]
        .filterNotNone())
        .toStrictEqual([ ]);
    expect([ null, undefined, null, undefined ]
        .filterNotNone())
        .toStrictEqual([ ]);
    expect([ {}, undefined, 2, undefined, "", false, null ]
        .filterNotNone())
        .toStrictEqual([ {}, 2, "", false ]);
});

test("Array.at", () => {
    expect([ 1, 2, 3 ].at(0)).toStrictEqual(1);
    expect([ 1, 2, 3 ].at(1)).toStrictEqual(2);
    expect([ 1, 2, 3 ].at(2)).toStrictEqual(3);
    expect([ 1 ].at(0)).toStrictEqual(1);
    expect([ 1 ].at(1)).toStrictEqual(undefined);
    expect([].at(0)).toStrictEqual(undefined);
    expect([].at(1)).toStrictEqual(undefined);
    expect([].at(-1)).toStrictEqual(undefined);
});

test("String.isEmpty", () => {
    expect("Hello, world".isEmpty()).toBeFalse();
    expect(" ".isEmpty()).toBeFalse();
    expect("".isEmpty()).toBeTrue();
});

test("String.includesAny", () => {
    expect("Hello, world".includesAny([ "Abba", "world", "Beta" ])).toBeTrue();
    expect("Hello, world".includesAny([ "Abba", "World", "Beta" ])).toBeFalse();
    expect("Hello, world".includesAny([ "Abba", "Beta" ])).toBeFalse();
    expect("".includesAny([ "Hello", ",", " " ])).toBeFalse();
    expect("".includesAny([ "Hello", ",", "", " " ])).toBeTrue();
});

test("String.splitOnceLast", () => {
    expect("Hello, world".splitOnceLast(",")).toStrictEqual([ "Hello", " world" ]);
    expect("Hello, world, how are you?".splitOnceLast(",")).toStrictEqual([ "Hello, world", " how are you?" ]);
    expect("Hello world".splitOnceLast(",")).toStrictEqual([ "Hello world", "" ]);
    expect("Hello, world,".splitOnceLast(",")).toStrictEqual([ "Hello, world", "" ]);
    expect("Hello".splitOnceLast(",")).toStrictEqual([ "Hello", "" ]);
    expect(",".splitOnceLast(",")).toStrictEqual([ "", "" ]);
    expect(" ".splitOnceLast(",")).toStrictEqual([ " ", "" ]);
    expect("".splitOnceLast(",")).toStrictEqual([ "", "" ]);
});
