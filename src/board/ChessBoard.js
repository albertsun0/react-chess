import React, {useState, useEffect} from 'react'
import Tile from './Tile';
import ChessIcon from './ChessIcon';

function ChessBoard() {
    const [board, setBoard] = useState([]);
    const [turn, setTurn] = useState(true); //true is white false is black
    const [select, changeSelection] = useState([-1,-1]);
    const [validMoves, setValidMoves] = useState([]);
    const [pastMoves, setPastMoves] = useState([]);
    const [caputred, setCaptured] = useState([]);
    const row1 = [2,3,4,5,6,4,3,2];
    const rowE = [0,0,0,0,0,0,0,0];
    const row2 = [1,1,1,1,1,1,1,1];
    const tW = 100;
    const knight = [[1,2],[-1,2],[2,1],[2,-1],[-1,-2],[1,-2],[-2,1],[-2,-1]];
    const horoArray = [[0,1],[0,-1],[-1,0],[1,0]];
    const diagArray = [[1,1],[1,-1],[-1,-1],[-1,1]];
    const kingArray = [...horoArray,...diagArray];
    const initBoard = () =>{
        setBoard([]);
        let temp = [];
        temp.push(row1);
        temp.push(row2);
        for(var i = 0; i< 4; i++){
            temp.push(rowE.map(p => p*0));
        }
        
        // temp.push(row2.map(p => p.toLowerCase()));
        // temp.push(row1.map(p => p.toLowerCase()));
        temp.push(row2.map(p => 0-p));
        temp.push(row1.map(p => 0-p));
        //white are negative
        setBoard(temp);
        console.log(board);
        // let save = [[2, 0, 0, 5, 6, 0, 0, 2],
        // [1, 1, 0, 0, 0, 1, 1, 1],
        // [0, 0, 1, 0, 1, 3, 0, 0],
        // [0, 0, 0, 1, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, -1, 0, 0],
        // [-1, 0, -1, -4, 3, -1, 0, -1],
        // [0, 0, -1, 0, 0, 0, -1, 0],
        // [-2, 0, -4, -5, 0, -6, 0, -2]];
        // setBoard(save);
    }

    //white pieces are negative
    //pawn = 1
    //rook = 2
    //horse = 3
    //bishop = 4
    //king = 5
    //queen = 6
    const inValidMoves = (r,c) => {
        for(var i = 0; i<validMoves.length; i++){
            if(validMoves[i][0] === r && validMoves[i][1] === c){
                return true;
            }
        }
        return false;
    }

    const updateValidMoves = (r, c, p) => {
        console.log(p);
        setValidMoves([]);
        let temp = [];
        if(p === 1){ //black pawn
            if(r+1 < 8 && board[r+1][c] === 0){
                temp.push([r+1, c]);
            }
            if(r === 1){ //pawn has not moved yet
                temp.push([r+2,c]);
            }
            //take diagonally
            if(r+1 < 8 && board[r+1][c+1] < 0){
                temp.push([r+1,c+1]);
            }
            if(r+1 < 8 && board[r+1][c-1] < 0){
                temp.push([r+1,c-1]);
            }
        }
        else if(p === -1){ //white pawn
            if(r-1 >= 0 && board[r-1][c] === 0){
                temp.push([r-1, c]);
            }
            if(r === 6){ //pawn has not moved yet
                temp.push([r-2,c]);
            }
            //take diagonally
            if(r-1 >= 0 && board[r-1][c+1] > 0){
                temp.push([r-1,c+1]);
            }
            if(r-1 >= 0 && board[r-1][c-1] > 0){
                temp.push([r-1,c-1]);
            }
        }
        else if(p === 3){ // black knight
            for(let i = 0; i<knight.length; i++){
                if(knight[i][0] + r < 8 && knight[i][0]+r  >= 0 && knight[i][1]+c < 8 && knight[i][1]+c>= 0 
                    && board[knight[i][0] + r][knight[i][1]+c] <=0)
                    temp.push([knight[i][0] + r, knight[i][1]+c]);
            }
        }
        else if(p === -3){ // white knight
            for(let i = 0; i<knight.length; i++){
                if(knight[i][0] + r < 8 && knight[i][0]+r  >= 0 && knight[i][1]+c < 8 && knight[i][1]+c>= 0
                    && board[knight[i][0] + r][knight[i][1]+c] >=0)
                    temp.push([knight[i][0] + r, knight[i][1]+c]);
            }
        }
        if(p === 2 || p === 6){ //black rook
            for(let i = 0; i< 4; i++){
                let x = r;
                let y = c;
                while(x < 8 && x >= 0 && y < 8 && y >=0){
                    x+=horoArray[i][0];
                    y+=horoArray[i][1];
                    if(x >= 8 || x <0 || y >= 8 || y < 0){
                        break;
                    }
                    console.log(x + " " + y);
                    if(board[x][y] > 0){
                        break;
                    }
                    temp.push([x,y]);
                    if(board[x][y] < 0){
                        break;
                    }
                }
            }
        }
        if(p === -2 || p === -6){ //white rook
            for(let i = 0; i< 4; i++){
                let x = r;
                let y = c;
                while(x < 8 && x >= 0 && y < 8 && y >=0){
                    x+=horoArray[i][0];
                    y+=horoArray[i][1];
                    if(x >= 8 || x <0 || y >= 8 || y < 0){
                        break;
                    }
                    console.log(x + " " + y);
                    if(board[x][y] < 0){
                        break;
                    }
                    temp.push([x,y]);
                    if(board[x][y] > 0){
                        break;
                    }
                }
            }
        }
        if(p === 4 || p === 6){ //black rook
            for(let i = 0; i< 4; i++){
                let x = r;
                let y = c;
                while(x < 8 && x >= 0 && y < 8 && y >=0){
                    x+=diagArray[i][0];
                    y+=diagArray[i][1];
                    if(x >= 8 || x <0 || y >= 8 || y < 0){
                        break;
                    }
                    console.log(x + " " + y);
                    if(board[x][y] > 0){
                        break;
                    }
                    temp.push([x,y]);
                    if(board[x][y] < 0){
                        break;
                    }
                }
            }
        }
        if(p === -4 || p === -6){ //white rook
            for(let i = 0; i< 4; i++){
                let x = r;
                let y = c;
                while(x < 8 && x >= 0 && y < 8 && y >=0){
                    x+=diagArray[i][0];
                    y+=diagArray[i][1];
                    if(x >= 8 || x <0 || y >= 8 || y < 0){
                        break;
                    }
                    console.log(x + " " + y);
                    if(board[x][y] < 0){
                        break;
                    }
                    temp.push([x,y]);
                    if(board[x][y] > 0){
                        break;
                    }
                }
            }
        }
        if(p === 5){ // black king
            for(let i = 0; i<8; i++){
                if(kingArray[i][0] + r < 8 && kingArray[i][0]+r  >= 0 && kingArray[i][1]+c < 8 && kingArray[i][1]+c>= 0
                    && board[kingArray[i][0] + r][kingArray[i][1]+c] <= 0 //&& !inDanger(r,c)
                    ){
                        temp.push([kingArray[i][0] + r,kingArray[i][1]+c]);
                    }
            }
        }
        if(p === -5){ // white king
            for(let i = 0; i<8; i++){
                if(kingArray[i][0] + r < 8 && kingArray[i][0]+r  >= 0 && kingArray[i][1]+c < 8 && kingArray[i][1]+c>= 0
                    && board[kingArray[i][0] + r][kingArray[i][1]+c] >= 0 //&& !inDanger(r,c)
                    ){
                        temp.push([kingArray[i][0] + r,kingArray[i][1]+c]);
                    }
            }
        }
        
        setValidMoves(temp);
       // console.log(validMoves)
    }

    const tilePress = (r, c, p) => {
        if(select[0] === r && select[1] === c){
            changeSelection([-1,-1]);
            setValidMoves([]);
        }
        else if(select[0] === -1 && select[1] === -1){
            if(board[r][c] === 0 || (turn && board[r][c] > 0) || (!turn && board[r][c] < 0)){
                changeSelection([-1,-1]);
                setValidMoves([]);
            }
            else{
                changeSelection([r,c]);
                updateValidMoves(r, c, p);
            }
                
        }
        else{
            if(inValidMoves(r, c)){ //move
                let temp = board;
                let newArray = temp.map(function(arr) {
                    return arr.slice();
                });
                pastMoves.push(newArray);
                if(board[r][c] !== 0){
                    let t = caputred;
                    t.push(board[r][c]);
                    setCaptured(t);
                    console.log(caputred);
                }
                temp[r][c] = board[select[0]][select[1]];
                // console.log(pastMoves);
                // console.log(temp);
                changeSelection([-1,-1]);
                setValidMoves([]);
                //console.log(board[select[0]][select[1]] + " " + r);
                if(board[select[0]][select[1]] === -1 && r === 0){
                    temp[r][c] = -6;
                    console.log("promote");
                }
                if(board[select[0]][select[1]] === 1 && r === 7){
                    temp[r][c] = 6;
                    console.log("promote");
                }
                temp[select[0]][select[1]] = 0;
                // if(p === 1 && r === 0){
                //     temp[r][c] = -6;
                // }
                setBoard(temp);
                setTurn(!turn);
            }
            else{
                changeSelection([-1,-1]);
                setValidMoves([]);
            }
        }

    }

    useEffect(() => {
        initBoard();
    }, []);

    return (
        <div>
            <div className = 'flex flex-col items-center'>
                <div className='text-2xl p-4 flex flex-col'> 
                    {turn ? "White Move" : "Black Move"}
                    {caputred}
                   
                </div>
                <div className = 'flex flex-col justify-center'>
                    <div className='flex flex-row justify-start'>
                        {caputred && caputred.map((val, i) =>
                           { if(val < 0){
                                return <ChessIcon piece = {val} key = {i}></ChessIcon>
                            } 
                        }
                        )}
                    </div>
                    <div className='flex flex-col'>
                        {board && board.map((row, i) => 
                            <div key = {i} className='flex flex-row'>
                                {row.map((col, j) =>
                                    {if(i === select[0] && j === select[1]){
                                        return <Tile width={tW} piece={col} key ={i*8+j} r = {i} c = {j} select = {true}
                                        valid = {false}
                                        onPress = {tilePress}
                                        ></Tile>
                                    }
                                    else if(inValidMoves(i, j)){
                                        return <Tile width={tW} piece={col} key ={i*8+j} r = {i} c = {j} select = {false} 
                                        valid = {true} onPress = {tilePress}
                                        ></Tile>
                                    }
                                    else{
                                        return <Tile width={tW} piece={col} key ={i*8+j} r = {i} c = {j} select = {false}
                                        valid = {false} onPress = {tilePress}
                                        ></Tile>
                                    }
                                }
                                
                                )}            
                            </div>
                        )}
                    </div>
                    <div className='flex flex-row justify-start'>
                        {caputred && caputred.map((val, i) =>
                           { if(val > 0){
                                return <ChessIcon piece = {val} key = {i}></ChessIcon>
                            } 
                        }
                        )}
                    </div>
                </div>
                
                <div className='flex flex-row scroll-pl-6'>
                    {pastMoves}
                </div>
            </div>
            
        </div>
        
    )
}

export default ChessBoard
