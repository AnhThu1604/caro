import Board from "./Board";
import { useState } from "react";
import { calculateWinner } from "../winner"

const Game = () => {
    const [size, setSize] = useState(5);
    const [history, setHistory] = useState([{ squares: Array(size * size).fill(null), picked: null, }]);
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNo, setStepNo] = useState(0);
    const [sort, setSort] = useState(true);


    const winner = calculateWinner(history[stepNo].squares, size, history[stepNo].picked);
    let winnerCell;



    const handleClick = (i) => {
        const passMoves = history.slice(0, stepNo + 1);
        const current = [...passMoves[stepNo].squares];
        if (winner || current[i]) {
            return;
        }
        current[i] = xIsNext ? "X" : "O";
        setHistory([...passMoves, { squares: current, picked: i }])
        setXIsNext((prev) => !prev);
        setStepNo(passMoves.length);
    };

    let moves = history.map((step, move) => {

        const desc = move ? 'Go to move #' + move + ' : (' +
            (step.picked % size + 1) + ',' + (Math.floor(step.picked / size) + 1) + ')'
            : 'Go to game start';
        const formatClass = (move === stepNo ? 'bold' : '');
        return (
            <li>
                <button className={formatClass} onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        setSize(Number(event.target[0].value));
        setHistory([{ squares: Array(size * size).fill(null), picked: null, }])

    }


    let form = <form onSubmit={handleSubmit}>
        <label>
            Size:
            <input type="number" name="size" />
        </label>
        <input type="submit" value="Submit" />
    </form>

    const oppOrder = sort ? 'Descending' : 'Ascending';
    let toggleButton = <div>
        Toggle moves order to:
        <button className="order" onClick={() => toggleOrder()}>{oppOrder}</button>
    </div>

    if(winner){
        winnerCell = winner.index;
    }
    

    const toggleOrder = () => {
        setSort(!sort);
    }
    const jumpTo = (step) => {
        setStepNo(step);
        setXIsNext(step % 2 === 0);
    };


    const evaluateStatus = () => {
        let status;

        if (winner) {
            status = 'Winner: ' + winner.player;
        }
        else {
            if (history.length === (size * size + 1)) {
                status = 'Match resulted in a draw'
            }
            else{
                status = `Next player: ${xIsNext ? "X" : "O"}`;
            }
        }
        return status;
    };




    return (
        <div className="game">
            <div className="game-board">
                <Board square={history[stepNo].squares}
                    winnerCell={winnerCell}
                    boardClick={(i) => handleClick(i)}
                    size={size} />
            </div>
            <div className="game-info">
                <p className="status">{evaluateStatus()}</p>
                <p className="">{form}</p>
                <p className="order">{toggleButton} </p>
                <p className="history-moves">History moves</p>
                <ol className="history">{sort ? moves : moves.reverse()}</ol>
            </div>
        </div>
    )
};

export default Game;