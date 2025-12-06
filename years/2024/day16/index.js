import { readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lines = readLines(path.join(__dirname, "input.txt"));
const grid = lines.map((line) => line.split(""));
const DIRECTIONS = [
  { row: -1, col: 0, name: "UP" }, // index 0
  { row: 0, col: 1, name: "RIGHT" }, // index 1
  { row: 1, col: 0, name: "DOWN" }, // index 2
  { row: 0, col: -1, name: "LEFT" }, // index 3
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

export function solution() {
  const S = findCharCoordinates(grid, "S");
  const pq = createPQ();
  const minScores = new Map();
  const predecessors = new Map(); // value: array of parent stateKeys
  let minEndScore = undefined;
  let endStates = [];

  // Initial state: Start at S, facing RIGHT (index 1), score 0
  const startDirIndex = 1; // RIGHT
  pqPush(pq, {
    row: S[0],
    col: S[1],
    dirIndex: startDirIndex,
    score: 0,
  });
  minScores.set(stateKey(S[0], S[1], startDirIndex), 0);
  predecessors.set(stateKey(S[0], S[1], startDirIndex), []);

  while (!isPQEmpty(pq)) {
    const current = pqPop(pq);
    const { row, col, dirIndex, score } = current;

    const currentKey = stateKey(row, col, dirIndex);
    // Skip if we've already found a better path to this state
    if (minScores.has(currentKey) && score > minScores.get(currentKey)) {
      continue;
    }

    // Check if we reached the end
    if (grid[row][col] === "E") {
      if (!minEndScore || score < minEndScore) {
        minEndScore = score;
        endStates = []; // Clear old states
        endStates.push(currentKey);
      } else if (score === minEndScore) {
        endStates.push(currentKey);
      }
      continue; // I'm done with this state, move to the next one in queue
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

      // Only update if we haven't visited this state OR we found a better path
      if (!minScores.has(key) || newScore < minScores.get(key)) {
        minScores.set(key, newScore);
        predecessors.set(key, [currentKey]);
        pqPush(pq, { row: nr, col: nc, dirIndex, score: newScore });
      } else if (newScore === minScores.get(key)) {
        if (predecessors.has(key)) {
          predecessors.get(key).push(currentKey);
        }
      }
    }

    // 2. Turn Clockwise (90 degrees right)
    // Modulo wraps around: 0→1, 1→2, 2→3, 3→0
    // Examples:
    //   dirIndex=0 (UP):    (0+1) % 4 = 1 (RIGHT) ✓
    //   dirIndex=1 (RIGHT): (1+1) % 4 = 2 (DOWN)  ✓
    //   dirIndex=2 (DOWN):  (2+1) % 4 = 3 (LEFT)  ✓
    //   dirIndex=3 (LEFT):  (3+1) % 4 = 0 (UP)    ✓ wraps around!
    const cwDirIndex = (dirIndex + 1) % 4;
    const cwScore = score + 1000;
    const cwKey = stateKey(row, col, cwDirIndex);
    if (!minScores.has(cwKey) || cwScore < minScores.get(cwKey)) {
      minScores.set(cwKey, cwScore);
      predecessors.set(cwKey, [currentKey]);
      pqPush(pq, { row, col, dirIndex: cwDirIndex, score: cwScore });
    } else if (cwScore === minScores.get(cwKey)) {
      if (predecessors.has(cwKey)) {
        predecessors.get(cwKey).push(currentKey);
      }
    }

    // 3. Turn Counter-Clockwise (90 degrees left)
    // Adding 3 is same as subtracting 1 (in modulo 4 arithmetic)
    // Examples:
    //   dirIndex=0 (UP):    (0+3) % 4 = 3 (LEFT)  ✓
    //   dirIndex=1 (RIGHT): (1+3) % 4 = 0 (UP)    ✓
    //   dirIndex=2 (DOWN):  (2+3) % 4 = 1 (RIGHT) ✓
    //   dirIndex=3 (LEFT):  (3+3) % 4 = 2 (DOWN)  ✓
    //
    // Why +3 instead of -1?
    // Because (-1) % 4 = -1 in JavaScript (not 3!)
    // So (0-1) % 4 = -1 (WRONG!)
    // But (0+3) % 4 = 3 (CORRECT!)
    const ccwDirIndex = (dirIndex + 3) % 4;
    const ccwScore = score + 1000;
    const ccwKey = stateKey(row, col, ccwDirIndex);
    if (!minScores.has(ccwKey) || ccwScore < minScores.get(ccwKey)) {
      minScores.set(ccwKey, ccwScore);
      predecessors.set(ccwKey, [currentKey]);
      pqPush(pq, { row, col, dirIndex: ccwDirIndex, score: ccwScore });
    } else if (ccwScore === minScores.get(ccwKey)) {
      if (predecessors.has(ccwKey)) {
        predecessors.get(ccwKey).push(currentKey);
      }
    }
  }

  // add backtracking here
  const tilesOnOptimalPaths = new Set();
  const queue = [...endStates];
  const visited = new Set(endStates);

  while (queue.length > 0) {
    // Get next state to process
    const stateStr = pqPop(queue);
    // Parse the state string "1,13,0" into row=1, col=13, direction=0.
    const [row, col, dirIndex] = stateStr.split(",").map(Number);
    tilesOnOptimalPaths.add(`${row},${col}`);
    const preds = predecessors.get(stateStr) || [];
    for (const pred of preds) {
      if (!visited.has(pred)) {
        visited.add(pred);
        queue.push(pred);
      }
    }
  }

  return JSON.stringify({
    part1: minEndScore,
    part2: tilesOnOptimalPaths.size,
  });
}
