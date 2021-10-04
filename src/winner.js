export function calculateWinner(squares, size, picked) {
    let row = Math.floor(picked / size);
    let col = picked % size;


    let result = [];
    result.push(picked);
    let k = picked + 1;



    // Check row
    while (k < row * size + size && squares[k] === squares[picked]) {
        result.push(k);
        k++
    }
    k = picked - 1;
    while (k >= row * size && squares[k] === squares[picked]) {
        result.push(k);
        k--;
    }
    
    if (result.length > 4){
        return{
            player: squares[picked],
            index:result,
        };
    }

    // Check col
    result = []; 
    result.push(picked);
    let h = picked + size;
    while (k < size * size && squares[h] === squares[picked]) {
        result.push(h);
        h = h + size;
    }
    h = picked - size;
    while (h >= 0 && squares[h] === squares[picked]) {
        result.push(h);
        h = h - size;
    }
    
    if (result.length > 4){
        return{
            player: squares[picked],
            index:result,
        };
    }
    
    // Check diagonal left
    result = [];  
    result.push(picked);
    h = row + 1;
    k = col + 1;
    while (h < size && k < size && squares[h * size + k] === squares[picked]) {
        result.push(h * size + k);
        h++;
        k++;
    }
    h = row - 1;
    h = col - 1;
    while (h >= 0 && k >= 0 && squares[h * size + k] === squares[picked]) {
        result.push(h * size + k);
        h--;
        k--;
    }
    
    if (result.length > 4){
        return{
            player: squares[picked],
            index:result,
        };
    }


    // Check diagonal right 
    result = [];
    result.push(picked);
    h = row + 1;
    k = col - 1;
    while (h < size && k >= 0 && squares[h * size + k] === squares[picked]) {
        result.push(h * size + k);
        h++;
        k--;
    }
    h = row - 1;
    k = col + 1;
    while (h >= 0 && k < size && squares[h * size + k] === squares[picked]) {
        result.push(h * size + k);
        h--;
        k++;
    }
    
    if (result.length > 4){
        return{
            player: squares[picked],
            index:result,
        };
    }
   return null;
    
};