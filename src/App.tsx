import {useEffect, useState} from "react";
import {applyModifier, initialGrid, LIVE_CELL} from "./Grid";
import {array, number} from "prop-types";

interface RowProps {
    data: Array<number>;
}

interface GridProps {
    data: number[][];
}

const GRID_SIZE = 50;
const TICK_INTERVAL_IN_MILLISECONDS = 400;

const Row = ({data}: RowProps) => {
    const empty = <div className={'item'}/>;
    const filled = <div className={'item filled'}/>;

    return (<div className={'row'}>{data.map((item, i) =><span key={`${item}:${i}`}>{item === LIVE_CELL ? filled : empty}</span>)}</div>)
}

const Grid = ({data}: GridProps): JSX.Element => (<>{data.map((col, index) => <Row key={`${col.join('')}:${index}`} data={col}/>)}</>);

export const App = (): JSX.Element => {
    const [grid, setGrid] = useState<number[][]>(initialGrid(GRID_SIZE));

    useEffect(() => {
        const intervalID = setInterval(() => {
            setGrid(prevGrid => applyModifier(prevGrid));
        }, TICK_INTERVAL_IN_MILLISECONDS);

        return function () {
            clearInterval(intervalID);
        }
    }, []);

    return (
        <div className="App">
            <Grid data={grid}/>
        </div>
    );
}
