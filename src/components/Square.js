const Square = ({value, extraClass, squareClick}) => {
    return (
        <button className={extraClass}  onClick = {()=> squareClick()}>{value}</button>
    )
}

export default Square;