
import './App.css';
import React, { useState } from 'react';

function App() {
  //0 is for x; 1 for o
  const [board, setBoard ] = useState(new Array(9).fill(undefined))
  const [turn, setTurn] = useState(0);
  const [winner, setWinner]= useState(undefined);

  const checkWinner= (board)=>{
    const conditions =[
      [0, 1 ,2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    // deconstructor array and check if any of the values of those 3 indexes match
    for (let i =0; i< conditions.length; i++){
      const [a, b, c] = conditions[i];
      if(board[a] && board[a] === board[b] && board[a] === board[c]){
        setWinner(board[a])
      }
    }
  }

  const makeMove = i =>{
    const boardCopy = [...board];
    //stop move if spot already filled or winner is declared
    if (winner || boardCopy[i]){
      return;
    }
    if (turn === 0){
      setTurn(1);
      boardCopy[i]='o';
    }
    else {
     setTurn(0);
     boardCopy[i]='x';
    }
    checkWinner(boardCopy);
    setBoard(boardCopy);
  }

  return (
    <div className="App">
       <div className="prompt"> 
        {turn === 1? <div className="turn">{`X's turn`}</div> : <div className="turn">{`O's turn`}</div> }
        {winner ? <div className="score"> {`${winner} wins`} </div> : null }
       </div>
          <div className="board">
            {board.map( (piece, index) => <div className={"grid "+ piece} key= { index }  onClick={()=> makeMove(index)}></div>
            )}
          </div>
    </div>
  );
}

export default App;
