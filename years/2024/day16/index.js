import { readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lines = readLines(path.join(__dirname, "input.txt"));
const grid = lines.map((line) => line.split(""));
const DIRECTIONS = [
  { row: -1, col: 0, name: "UP" }, // 0
  { row: 0, col: 1, name: "RIGHT" }, // 1
  { row: 1, col: 0, name: "DOWN" }, // 2
  { row: 0, col: -1, name: "LEFT" }, // 3
];

function findCharCoordinates(grid, char) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === char) {
        return [r, c];
      }
    }
  }
}

function createPQ() {
  return [];
}

function pqPush(pq, item) {
  pq.push(item);
  // Sort by lowest score
  pq.sort((a, b) => a.score - b.score);
}

function pqPop(pq) {
  return pq.shift();
}

function isPQEmpty(pq) {
  return pq.length === 0;
}

function stateKey(row, col, dirIndex) {
  return `${row},${col},${dirIndex}`;
}

export function part1() {
  const S = findCharCoordinates(grid, "S");
  const pq = createPQ();
  const minScores = new Map();

  // Initial state: Start at S, facing RIGHT (index 1), score 0
  const startDirIndex = 1; // RIGHT
  pqPush(pq, {
    row: S[0],
    col: S[1],
    dirIndex: startDirIndex,
    score: 0,
  });
  minScores.set(stateKey(S[0], S[1], startDirIndex), 0);

  let finalScore = Infinity;

  while (!isPQEmpty(pq)) {
    const current = pqPop(pq);
    const { row, col, dirIndex, score } = current;

    // Optimization: If we've found a path to this state with a lower score already, skip
    if (score > (minScores.get(stateKey(row, col, dirIndex)) ?? Infinity)) {
      continue;
    }

    // Check if we reached the end
    if (grid[row][col] === "E") {
      if (score < finalScore) {
        finalScore = score;
      }
      // We continue to find potentially shorter paths if any (though Dijkstra guarantees first found is shortest)
      // But since we just want the shortest score, we can return immediately if we trust the PQ order.
      return score;
    }

    // 1. Move Forward
    const dr = DIRECTIONS[dirIndex].row;
    const dc = DIRECTIONS[dirIndex].col;
    const nr = row + dr;
    const nc = col + dc;

    if (
      nr >= 0 &&
      nr < grid.length &&
      nc >= 0 &&
      nc < grid[0].length &&
      grid[nr][nc] !== "#"
    ) {
      const newScore = score + 1;
      const key = stateKey(nr, nc, dirIndex);
      if (newScore < (minScores.get(key) ?? Infinity)) {
        minScores.set(key, newScore);
        pqPush(pq, { row: nr, col: nc, dirIndex, score: newScore });
      }
    }

    // 2. Turn Clockwise
    const cwDirIndex = (dirIndex + 1) % 4;
    const cwScore = score + 1000;
    const cwKey = stateKey(row, col, cwDirIndex);
    if (cwScore < (minScores.get(cwKey) ?? Infinity)) {
      minScores.set(cwKey, cwScore);
      pqPush(pq, { row, col, dirIndex: cwDirIndex, score: cwScore });
    }

    // 3. Turn Counter-Clockwise
    const ccwDirIndex = (dirIndex + 3) % 4;
    const ccwScore = score + 1000;
    const ccwKey = stateKey(row, col, ccwDirIndex);
    if (ccwScore < (minScores.get(ccwKey) ?? Infinity)) {
      minScores.set(ccwKey, ccwScore);
      pqPush(pq, { row, col, dirIndex: ccwDirIndex, score: ccwScore });
    }
  }

  return finalScore;
}

// export function part2() {
//     const lines = readLines(path.join(__dirname, 'input.txt'));
//     console.log('lines', lines);
//     return 'TODO';
// }
