/**
 * @fileoverview Demo Function Alpha - Illustrative Utility Functions
 * 
 * This file contains a collection of demonstration utility functions that showcase
 * various JavaScript/React patterns and practices. These functions are for
 * educational and demonstration purposes only and are not used in the actual
 * Tic Tac Toe game implementation.
 * 
 * Key concepts demonstrated:
 * - Function composition
 * - Array manipulation
 * - Object transformation
 * - React hooks patterns
 * - Memoization techniques
 * - Error handling patterns
 * 
 * @version 1.0.0
 * @author Demo Author
 * @copyright 2024
 */

import { useMemo, useCallback, useState, useEffect } from 'react';

// Demonstration of a complex array transformation utility
export const transformGameMatrix = (matrix, transformFn) => {
  if (!Array.isArray(matrix) || !matrix.every(Array.isArray)) {
    throw new Error('Input must be a 2D array');
  }
  return matrix.map((row, i) => 
    row.map((cell, j) => transformFn(cell, i, j, matrix))
  );
};

// Example of a custom React hook with multiple features
export const useDemoGameState = (initialState = {}) => {
  const [gameState, setGameState] = useState(initialState);
  const [history, setHistory] = useState([]);
  
  // Demonstrate useEffect with cleanup
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log('Demo game state initialized');
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  // Demonstrate useCallback
  const updateState = useCallback((newState) => {
    setGameState(prev => {
      const updated = { ...prev, ...newState };
      setHistory(h => [...h, prev]);
      return updated;
    });
  }, []);
  
  // Demonstrate useMemo
  const computedStats = useMemo(() => ({
    moveCount: history.length,
    hasUndo: history.length > 0,
    stateSize: Object.keys(gameState).length
  }), [history.length, gameState]);
  
  return { gameState, updateState, history, computedStats };
};

/**
 * Demonstration of a complex game board analyzer
 * Shows various patterns for working with game state
 */
export class DemoBoardAnalyzer {
  constructor(size = 3) {
    this.size = size;
    this.patterns = this._generatePatterns();
  }
  
  _generatePatterns() {
    const patterns = [];
    // Rows
    for (let i = 0; i < this.size; i++) {
      patterns.push(Array.from({ length: this.size }, (_, j) => ({
        row: i,
        col: j
      })));
    }
    // Columns
    for (let j = 0; j < this.size; j++) {
      patterns.push(Array.from({ length: this.size }, (_, i) => ({
        row: i,
        col: j
      })));
    }
    // Diagonals
    patterns.push(Array.from({ length: this.size }, (_, i) => ({
      row: i,
      col: i
    })));
    patterns.push(Array.from({ length: this.size }, (_, i) => ({
      row: i,
      col: this.size - 1 - i
    })));
    return patterns;
  }
  
  analyzeBoard(board) {
    return {
      patterns: this.patterns,
      emptyCells: this._findEmptyCells(board),
      cornerTaken: this._isAnyCornerTaken(board),
      centerTaken: this._isCenterTaken(board),
      analysisTimestamp: new Date().toISOString()
    };
  }
  
  _findEmptyCells(board) {
    return board.reduce((acc, row, i) => {
      row.forEach((cell, j) => {
        if (!cell) acc.push({ row: i, col: j });
      });
      return acc;
    }, []);
  }
  
  _isAnyCornerTaken(board) {
    const corners = [
      board[0][0],
      board[0][this.size - 1],
      board[this.size - 1][0],
      board[this.size - 1][this.size - 1]
    ];
    return corners.some(corner => corner !== null);
  }
  
  _isCenterTaken(board) {
    const center = Math.floor(this.size / 2);
    return board[center][center] !== null;
  }
}

// Demonstration of functional programming patterns
export const createDemoGameUtils = () => {
  const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
  
  const withLogging = fn => (...args) => {
    console.log(`Calling function with args:`, args);
    const result = fn(...args);
    console.log(`Function result:`, result);
    return result;
  };
  
  const withValidation = fn => (...args) => {
    if (args.some(arg => arg === undefined)) {
      throw new Error('Missing required arguments');
    }
    return fn(...args);
  };
  
  const withTiming = fn => (...args) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    console.log(`Function took ${end - start}ms to execute`);
    return result;
  };
  
  return {
    compose,
    withLogging,
    withValidation,
    withTiming,
    // Example composed utility
    enhancedGameFunction: compose(
      withLogging,
      withValidation,
      withTiming
    )(x => x * 2)
  };
};
