import {
    applyModifier,
    bottom,
    left,
    top,
    right,
    getAliveCellsAround,
    bottomLeft,
    bottomRight, topRight, topLeft
} from "./Grid";

describe("Cells test", () => {
    const grid = [
        [1, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 1, 1],
    ];

    test("left cell", () => {
        expect(left({row: 0, col:0}, grid)).toBe(0);
        expect(left({row: 0, col:4}, grid)).toBe(1);
        expect(left({row: 4, col:0}, grid)).toBe(0);
        expect(left({row: 4, col:1}, grid)).toBe(1);
    });

    test("right cell", () => {
        expect(right({row: 0, col:0}, grid)).toBe(1);
        expect(right({row: 0, col:4}, grid)).toBe(0);
        expect(right({row: 1, col:3}, grid)).toBe(1);
        expect(right({row: 4, col:2}, grid)).toBe(1);
        expect(right({row: 4, col:3}, grid)).toBe(1);
    });

    test("top cell", () => {
        expect(top({row: 0, col:0}, grid)).toBe(0);
        expect(top({row: 0, col:4}, grid)).toBe(0);
        expect(top({row: 1, col:3}, grid)).toBe(1);
        expect(top({row: 4, col:2}, grid)).toBe(0);
        expect(top({row: 4, col:3}, grid)).toBe(0);
    });

    test("bottom cell", () => {
        expect(bottom({row: 0, col:0}, grid)).toBe(1);
        expect(bottom({row: 0, col:4}, grid)).toBe(1);
        expect(bottom({row: 1, col:3}, grid)).toBe(0);
        expect(bottom({row: 4, col:2}, grid)).toBe(0);
        expect(bottom({row: 4, col:3}, grid)).toBe(0);
        expect(bottom({row: 1, col:2}, grid)).toBe(1);
    });

    test("bottom left cell", () => {
        expect(bottomLeft({row: 0, col:1}, grid)).toBe(1);
        expect(bottomLeft({row: 4, col:0}, grid)).toBe(0);
        expect(bottomLeft({row: 3, col:4}, grid)).toBe(1);
    });

    test("bottom right cell", () => {
        expect(bottomRight({row: 0, col:1}, grid)).toBe(0);
        expect(bottomRight({row: 4, col:0}, grid)).toBe(0);
        expect(bottomRight({row: 3, col:4}, grid)).toBe(0);
        expect(bottomRight({row: 1, col:1}, grid)).toBe(1);
    });

    test("top right cell", () => {
        expect(topRight({row: 0, col:1}, grid)).toBe(0);
        expect(topRight({row: 4, col:0}, grid)).toBe(0);
        expect(topRight({row: 3, col:4}, grid)).toBe(0);
        expect(topRight({row: 1, col:1}, grid)).toBe(0);
        expect(topRight({row: 1, col:2}, grid)).toBe(1);
    });

    test("top left cell", () => {
        expect(topLeft({row: 0, col:1}, grid)).toBe(0);
        expect(topLeft({row: 4, col:0}, grid)).toBe(0);
        expect(topLeft({row: 3, col:4}, grid)).toBe(0);
        expect(topLeft({row: 1, col:1}, grid)).toBe(1);
        expect(topLeft({row: 1, col:2}, grid)).toBe(1);
    });

    test("alive cells around", () => {
        expect(getAliveCellsAround({row: 0, col:0}, grid)).toBe(2);
        expect(getAliveCellsAround({row: 4, col:4}, grid)).toBe(1);
        expect(getAliveCellsAround({row: 2, col:2}, grid)).toBe(0);
        expect(getAliveCellsAround({row: 4, col:0}, grid)).toBe(0);
        expect(getAliveCellsAround({row: 3, col:4}, grid)).toBe(2);

        expect(getAliveCellsAround({row: 2, col:3}, [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0],
        ])).toBe(2);
    });


    test("grid modifier", () => {
        expect(applyModifier([
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 0, 0],
        ])).toStrictEqual([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ]);

        expect(applyModifier([
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ])).toStrictEqual([
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
        ]);
    });
});