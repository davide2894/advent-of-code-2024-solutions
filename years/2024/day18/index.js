import { readInput, readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const wide = 71;
const tall = 71;
const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
const fallingBytes = 1024;

export function solution() {
  //   Pseudocode (BFS approach - think of it like ripples in a pond):
  //   - Define directions for BFS traversal
  //   - Read input file to get corrupted byte positions
  //   - Initialize grid of size wide x tall
  //   - Initialize visited set to track visited positions
  //   - Initialize corrupted set to track corrupted byte positions
  //   - Initialize BFS queue with starting position (0,0) and distance 0
  //   - Mark corrupted bytes on the grid
  //   - A while (queue.length > 0) loop
  //   - Pop from the queue
  //   - Check if current node is the goal
  //   - Explore all 4 directions
  //   - For each valid neighbor (in bounds, not corrupted, not visited), add to queue
  //   - Return the steps when goal is reached

  const lines = readLines(path.join(__dirname, "input.txt"));
  const grid = new Array(tall).fill(null).map(() => new Array(wide).fill("."));
  const corrupted = new Set();
  const visited = new Set();
  const queue = [{ node: "0,0", distance: 0 }];
  visited.add("0,0");

  for (let i = 0; i < fallingBytes; i++) {
    const [byteX, byteY] = lines[i].split(",");
    grid[byteY][byteX] = "#";
    console.log(`Marking corrupted byte at (${byteX}, ${byteY})`);
    corrupted.add(`${byteX},${byteY}`);
  }

  while (queue.length > 0) {
    const { node, distance } = queue.shift();

    if (node === `${wide - 1},${tall - 1}`) {
      return distance;
    }

    // Explore neighbors
    const [x, y] = node.split(",").map(Number);

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      const neighbour = `${newX},${newY}`;

      // Check bounds
      if (
        newX >= 0 &&
        newX < wide &&
        newY >= 0 &&
        newY < tall &&
        !corrupted.has(neighbour) &&
        !visited.has(neighbour)
      ) {
        // Check if not corrupted and not visited
        visited.add(neighbour);
        queue.push({ node: neighbour, distance: distance + 1 });
      }
    }
  }
}
