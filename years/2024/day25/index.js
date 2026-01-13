import { readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1() {
  function getLock(grid) {
    const pins = [];
    for (let col = 0; col < grid[0].length; col++) {
      let pinHeight = undefined;
      for (let row = 0; row < grid.length; row++) {
        if (grid[row][col] === "#") {
          if (pinHeight === undefined) {
            pinHeight = 0;
          } else {
            pinHeight++;
          }
        } else {
          break;
        }
      }
      pins.push(pinHeight);
    }
    return pins;
  }
  function getKey(grid) {
    const heights = [];
    for (let col = 0; col < grid[0].length; col++) {
      let keyHeight = undefined;
      for (let row = grid.length - 1; row >= 0; row--) {
        if (grid[row][col] === "#") {
          if (keyHeight === undefined) {
            keyHeight = 0;
          } else {
            keyHeight++;
          }
        } else {
          break;
        }
      }
      heights.push(keyHeight);
    }
    return heights;
  }

  const lines = readLines(path.join(__dirname, "input.txt"));
  const grids = lines
    .join("\n")
    .split("\n\n")
    .map((group) => group.split("\n"));
  const locks = [];
  const keys = [];
  let fitCounter = 0;
  /**
   * 0. parse input to get locks and keys
   * 1. convert locks to pins (i.e. an array of numbers)
   * 2. convert keys to heights (i.e. an array of numbers)
   * 3. try every comination of keys to locks to find the unique fits
   *    - when you find the fit, increase result score by 1
   *    - comparison logic
   *     - for each pin
   *       - iterate over each key code
   * 4. return result score
   */

  grids.forEach((grid) => {
    const isLockTypeGrid = grid[0][0] === "#";
    if (isLockTypeGrid) {
      locks.push(getLock(grid));
    } else {
      keys.push(getKey(grid));
    }
  });

  for (let lock = 0; lock < locks.length; lock++) {
    for (let key = 0; key < keys.length; key++) {
      let overlaps = false;
      console.log("comparing lock ", locks[lock], "with key", keys[key]);
      for (let keyDigit = 0; keyDigit < keys[key].length; keyDigit++) {
        if (locks[lock][keyDigit] + keys[key][keyDigit] > 5) {
          console.log(
            `overlap found at locks[lock][keyDigit] ${locks[lock][keyDigit]} and keys[key][keyDigit] ${keys[key][keyDigit]} `
          );
          overlaps = true;
          break;
        }
      }
      if (!overlaps) {
        fitCounter++;
        console.log(
          `fit found between lock ${locks[lock]} and key ${keys[key]}`
        );
      }
    }
  }
  return fitCounter;
}

// export function part2() {
//     const lines = readLines(path.join(__dirname, 'input.txt'));
//     console.log('lines', lines);
//     return 'TODO';
// }
