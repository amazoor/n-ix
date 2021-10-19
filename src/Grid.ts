export const LIVE_CELL: number = 1;
export const DEAD_CELL: number = 0;
type Grid = number[][];

interface Item {
    row: number;
    col: number;
}

const randomBinary = (): number => Math.random() > .5 ? LIVE_CELL : DEAD_CELL;

const initialGrid = (size: number): Grid => {
    const result: Grid = [];

    for (let col = 0; col < size; col++) {
        result.push([]);
        for (let row = 0; row < size; row++) {
            result[col].push(randomBinary());
        }
    }

    return result;
};

const applyModifier = (grid:Grid):Grid => {
    const modifiedGrid = grid.map(arr => arr.slice());

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const aliveCellsAround = getAliveCellsAround({col, row}, grid);

            if (grid[row][col] === LIVE_CELL) {
                if (aliveCellsAround < 2) {
                    //die
                    modifiedGrid[row][col] = 0;
                } else if (aliveCellsAround === 2 || aliveCellsAround === 3) {
                    //the same result
                } else if (aliveCellsAround > 3) {
                    //die
                    modifiedGrid[row][col] = 0;
                }
            } else if (grid[row][col] === DEAD_CELL && aliveCellsAround === 3) {
                //live
                modifiedGrid[row][col] = 1;
            }
        }

    }


    return modifiedGrid;
};

const isDefined = (value: number[] | number) => value !== undefined;

const left = ({row, col}:Item, grid:Grid) => isDefined(grid[row][col - 1]) ? grid[row][col - 1] : 0;
const right = ({row, col}:Item, grid:Grid) => isDefined(grid[row][col + 1]) ? grid[row][col + 1] : 0;
const top = ({row, col}:Item, grid:Grid) => isDefined(grid[row - 1]) ? grid[row - 1][col] : 0;
const topRight = ({row, col}:Item, grid:Grid) => (isDefined(grid[row - 1]) && isDefined(grid[row - 1][col + 1])) ? grid[row - 1][col + 1] : 0;
const topLeft = ({row, col}:Item, grid:Grid) => (isDefined(grid[row - 1]) && isDefined(grid[row - 1][col - 1])) ? grid[row - 1][col - 1] : 0;
const bottom = ({row, col}:Item, grid:Grid) => isDefined(grid[row + 1]) ? grid[row + 1][col] : 0;
const bottomRight = ({row, col}:Item, grid:Grid) => (isDefined(grid[row + 1]) && isDefined(grid[row + 1][col + 1])) ? grid[row + 1][col + 1] : 0;
const bottomLeft = ({row, col}:Item, grid:Grid) => (isDefined(grid[row + 1]) && isDefined(grid[row + 1][col - 1])) ? grid[row + 1][col - 1] : 0;

const getCellsAround = ({row, col}: Item, grid: Grid): {
    top: number, topRight: number, topLeft: number, bottom: number, bottomLeft: number, bottomRight: number, left: number, right: number
} => {
    return {
        top: top({col, row}, grid),
        topRight: topRight({col, row}, grid),
        topLeft: topLeft({col, row}, grid),
        bottom: bottom({col, row}, grid),
        bottomLeft: bottomLeft({col, row}, grid),
        bottomRight: bottomRight({col, row}, grid),
        left: left({col, row}, grid),
        right: right({col, row}, grid),
    };
};

const getAliveCellsAround = ({row, col}:Item, grid:Grid): number => {
    let aliveCellsAmount = 0;
    const aroundCellsData = getCellsAround({col, row}, grid);
    Object.values(aroundCellsData).forEach(value => aliveCellsAmount += value)

    return aliveCellsAmount;
};

export {
    initialGrid,
    applyModifier,
    left,
    right,
    bottom,
    top,
    bottomLeft,
    bottomRight,
    topRight,
    topLeft,
    getAliveCellsAround
};
