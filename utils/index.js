import fs from "fs";
import path from "path";

/**
 * Read file content as string
 */
export function readInput(filePath) {
  return fs.readFileSync(filePath, "utf-8").trim();
}

/**
 * Read file and split into lines
 */
export function readLines(filePath) {
  return readInput(filePath).split("\n");
}

/**
 * Read file and split into numbers
 */
export function readNumbers(filePath) {
  return readLines(filePath).map(Number);
}

/**
 * Read file and split into grid of characters
 */
export function readGrid(filePath) {
  return readLines(filePath).map((line) => line.split(""));
}

/**
 * Read file and parse as integers separated by whitespace
 */
export function readIntegers(filePath) {
  return readInput(filePath).match(/-?\d+/g).map(Number);
}

/**
 * Manhattan distance between two points
 */
export function manhattanDistance(p1, p2) {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

/**
 * Get all neighbors of a point (4-directional)
 */
export function getNeighbors(x, y) {
  return [
    { x: x[y] - 1, y },
    { x: x[y] + 1, y },
    { x: x[y], y: x[y] - 1 },
    { x: x[y], y: x[y] + 1 },
  ];
}

/**
 * Get all neighbors including diagonals (8-directional)
 */
export function getAllNeighbors(x, y) {
  const neighbors = [];
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx !== 0 || dy !== 0) {
        neighbors.push({ x: x + dx, y: y + dy });
      }
    }
  }
  return neighbors;
}

/**
 * Check if point is within grid bounds
 */
export function inBounds(grid, x, y) {
  return y >= 0 && y < grid.length && x >= 0 && x < grid[0].length;
}

/**
 * Sum of array
 */
export function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

/**
 * Product of array
 */
export function product(arr) {
  return arr.reduce((a, b) => a * b, 1);
}

/**
 * Greatest Common Divisor
 */
export function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

/**
 * Least Common Multiple
 */
export function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Range function like Python's range
 */
export function range(start, end, step = 1) {
  const result = [];
  if (end === undefined) {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}

/**
 * Count occurrences of each item in array
 */
export function counter(arr) {
  const count = {};
  for (const item of arr) {
    count[item] = (count[item] || 0) + 1;
  }
  return count;
}

/**
 * Deep clone an object/array
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Transpose a 2D array (flip rows and columns)
 */
export function transpose(matrix) {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]));
}

/**
 * Rotate a 2D array 90 degrees clockwise
 */
export function rotateClockwise(matrix) {
  return transpose(matrix).map((row) => row.reverse());
}

/**
 * Rotate a 2D array 90 degrees counter-clockwise
 */
export function rotateCounterClockwise(matrix) {
  return transpose(matrix.slice().reverse());
}

/**
 * Find all permutations of an array
 */
export function permutations(arr) {
  if (arr.length <= 1) return [arr];
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const perm of permutations(rest)) {
      result.push([arr[i], ...perm]);
    }
  }
  return result;
}

/**
 * Find all combinations of an array of given size
 */
export function combinations(arr, size) {
  if (size === 0) return [[]];
  if (arr.length === 0) return [];
  const [first, ...rest] = arr;
  return [
    ...combinations(rest, size - 1).map((combo) => [first, ...combo]),
    ...combinations(rest, size),
  ];
}

export function convertArrayOfStringsToArrayOfNumbers(arr) {
  return arr.map((str) => str.split("").map((el) => parseInt(el, 10)));
}

export const DIRECTIONS = {
  UP: { row: 0, col: -1 },
  DOWN: { row: 0, col: 1 },
  LEFT: { row: -1, col: 0 },
  RIGHT: { row: 1, col: 0 },
};

export function isValidGridCell(grid, row, col) {
  /* 
    - Basically, a cell is valid if 
    - it's inside the grid, hence
      - row is less than or rqual to grid length
      - col is less than or equal to grid[row] length
    - char at grid[row][col] is not a wall (assuming walls are represented by '#')
   */
  return (
    row >= 0 &&
    row < grid.length &&
    col >= 0 &&
    col < grid[0].length &&
    grid[row][col] !== "#"
  );
}
