import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
const Square = ({ value, onClick, disabled }) => (
  <button 
    className={`square ${value?.toLowerCase()}`} 
    onClick={onClick}
    disabled={disabled}
    aria-label={`Square ${value || 'empty'}`}
  >
    {value}
  </button>
);

// PUBLIC_INTERFACE
function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  
  // Calculate winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // Check if game is a draw
  const isDraw = (squares) => {
    return squares.every(square => square !== null);
  };

  // Handle click on a square
  const handleClick = (i) => {
    const boardCopy = [...board];
    if (calculateWinner(boardCopy) || boardCopy[i]) return;
    
    boardCopy[i] = isXNext ? 'X' : 'O';
    setBoard(boardCopy);
    setIsXNext(!isXNext);
  };

  // Reset the game
  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(board);
  const draw = !winner && isDraw(board);
  let status;
  
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (draw) {
    status = "Game is a draw!";
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="App">
      <div className="game-status">{status}</div>
      <div className="game-board">
        {board.map((square, i) => (
          <Square
            key={i}
            value={square}
            onClick={() => handleClick(i)}
            disabled={!!winner || !!square || draw}
          />
        ))}
      </div>
      <button 
        className="restart-button"
        onClick={restartGame}
        aria-label="Restart game"
      >
        Restart Game
      </button>
    </div>
  );
}

export default App;
