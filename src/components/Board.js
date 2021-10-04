import Square from "./Square";

const Board = ({ square, winnerCell, boardClick, size }) => {
    const renderSquare = (i) => {
        let extraClassName = 'square';
        if (winnerCell && winnerCell.indexOf(i) > -1)
            extraClassName = 'square highlight'

        return <Square key={i} value={square[i]}
            extraClass={extraClassName}
            squareClick={() => boardClick(i)} />
    }

    let count = 0;
    return (
        <div className="board">
            {[...Array(size)].map((_el, i) => (
                <div className="board-row">{
                    [...Array(size)].map((_el) => {
                        count++;
                        return renderSquare(count - 1);
                    })}
                </div>
            )

            )}
        </div>
    )
//   let arrSquare=[];
//     for (let i=0; i<size; i++){
//         let rowSquare=[];
//         for (let j=0; j<size; j++){
//             rowSquare.push(renderSquare[i*size+j]);
//         }

//         arrSquare.push(<div className="board-row">{
//            rowSquare}
//         </div>)
//     }
//     console.log(arrSquare);
//  return(
//     <div>{arrSquare}</div>
//     /*<div>
//         <div className="board-row">{arrSquare}</div>
//     </div>*/
//     );
}

export default Board;