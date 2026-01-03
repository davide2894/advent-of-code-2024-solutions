import { DIRECTIONS, readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1() {
  const lines = readLines(path.join(__dirname, "input.txt"));
  let queue = [];
  let S = null;

  // find S
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === "S") {
        S = [i, j];
        queue.push([i, j]);
      }
    }
  }

  const distances = new Map([[`${S[0]},${S[1]}`, 0]]);

  // find optmial path by using BFS algorithm
  while (queue.length) {
    const [x, y] = queue.shift();

    // explore neighbors
    for (const [dx, dy] of DIRECTIONS) {
      const newX = x + dx;
      const newY = y + dy;

      // check bounds
      if (
        newX >= 0 &&
        newX < lines.length &&
        newY >= 0 &&
        newY < lines[0].length &&
        lines[newX][newY] !== "#" &&
        !distances.has(`${newX},${newY}`)
      ) {
        if (lines[newX][newY] === "E") {
          console.log("Found E at distance", distances.get(`${x},${y}`) + 1);
        } else {
          queue.push([newX, newY]);
        }
        distances.set(`${newX},${newY}`, distances.get(`${x},${y}`) + 1);
      }
    }
  }

  // now that we know the optimal path, let's calculate every cheat for each step
  // if distance from point A to point B, with the cheat, is more than a 100, increment final counter
  let counter = 0;

  // iterate through distances
  for (const [dKey, dValue] of distances) {
    const [x, y] = dKey.split(",").map(Number);

    const directions = [
      [0, 2],
      [2, 0],
      [-2, 0],
      [0, -2],
    ];

    for (const [dirX, dirY] of directions) {
      const newX = x + dirX;
      const newY = y + dirY;

      // check bounds
      if (
        newX >= 0 &&
        newX < lines.length &&
        newY >= 0 &&
        newY < lines[0].length
      ) {
        const newDKey = `${newX},${newY}`;
        if (distances.has(newDKey)) {
          const newDValue = distances.get(newDKey);
          if (newDValue - dValue - 2 >= 100) {
            counter++;
          }
        }
      }
    }
  }

  return counter;
}

// export function part2() {
//   const lines = readLines(path.join(__dirname, "input.txt"));
//   console.log("lines", lines);
//   return "TODO";
// }
