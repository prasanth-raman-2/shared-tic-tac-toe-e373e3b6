/**
 * @fileoverview Helper Beta - Additional Demo Utility Functions
 * 
 * This file contains additional demonstration utility functions that showcase
 * various JavaScript/React patterns. These functions are for demonstration
 * purposes and are not actively used in the Tic Tac Toe implementation.
 * 
 * @version 1.0.0
 * @author Demo Author
 * @copyright 2024
 */

// PUBLIC_INTERFACE
export const generateBoardStatistics = (board) => {
  const moveCount = board.filter(cell => cell !== null).length;
  const xCount = board.filter(cell => cell === 'X').length;
  const oCount = board.filter(cell => cell === 'O').length;
  
  return {
    totalMoves: moveCount,
    xMoves: xCount,
    oMoves: oCount,
    remainingMoves: 9 - moveCount,
    timestamp: new Date().toISOString()
  };
};

// PUBLIC_INTERFACE
export const createBoardSnapshot = (board) => {
  return {
    state: [...board],
    metadata: {
      capturedAt: Date.now(),
      boardSize: Math.sqrt(board.length),
      format: 'linear-array'
    }
  };
};

/**
 * Demo function to simulate delay for potential future animations
 */
export const createAnimationDelay = (duration = 500) => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

/**
 * Demo class for board position analysis
 * Shows object-oriented patterns in JavaScript
 */
export class BoardPositionAnalyzer {
  constructor(boardSize = 3) {
    this.boardSize = boardSize;
    this.centerPosition = Math.floor(boardSize / 2);
  }
  
  // PUBLIC_INTERFACE
  analyzePosition(row, col) {
    return {
      isCorner: this._isCornerPosition(row, col),
      isCenter: this._isCenterPosition(row, col),
      isEdge: this._isEdgePosition(row, col),
      distanceFromCenter: this._calculateDistanceFromCenter(row, col)
    };
  }
  
  _isCornerPosition(row, col) {
    return (row === 0 || row === this.boardSize - 1) && 
           (col === 0 || col === this.boardSize - 1);
  }
  
  _isCenterPosition(row, col) {
    return row === this.centerPosition && col === this.centerPosition;
  }
  
  _isEdgePosition(row, col) {
    return row === 0 || row === this.boardSize - 1 || 
           col === 0 || col === this.boardSize - 1;
  }
  
  _calculateDistanceFromCenter(row, col) {
    return Math.sqrt(
      Math.pow(row - this.centerPosition, 2) + 
      Math.pow(col - this.centerPosition, 2)
    );
  }
}

// Demo of functional composition for game utilities
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

// PUBLIC_INTERFACE
export const createGameMetrics = () => {
  const addTimestamp = data => ({ ...data, timestamp: Date.now() });
  const calculateDuration = data => ({ ...data, duration: Date.now() - data.timestamp });
  const formatOutput = data => ({
    ...data,
    formattedDuration: `${data.duration}ms`,
    type: 'game-metrics'
  });
  
  return pipe(
    addTimestamp,
    calculateDuration,
    formatOutput
  );
};
