import { readInput, readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1() {
  const lines = readLines(path.join(__dirname, "input.txt"));
  console.log("lines", lines);

  /**
   * 1) for each line
   *   for each char
   *     check if the char is also present up and/or left
   *        - if yes
   *            - we are in a region
   *                - actions
   *                   - increase area count for the zone
   *                   - increase perimeter count for that cell
   *        - if no
   *            - we are not in a region
   *               - create a new zone
   *                 - actions
   *                   - increase area count for the zone
   *                   - increase perimeter count for that cell
   *
   * 2) for each zone
   *   - calculate price
   *   - add price to total
   * 3) return total
   */

  return "TODO";
}

// export function part2() {
//     const lines = readLines(path.join(__dirname, 'input.txt'));
//     console.log('lines', lines);
//     return 'TODO';
// }
