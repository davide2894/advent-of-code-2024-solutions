import { readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lines = readLines(path.join(__dirname, "input.txt"));
const leftList = [];
const rightList = [];
lines.forEach((line) => {
  const [left, right] = line.trim().split(/\s+/); // Split on any whitespace
  leftList.push(parseInt(left));
  rightList.push(parseInt(right));
});

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

export function part1() {
  let totalDistance = 0;

  return (totalDistance = leftList.reduce(
    (accumulator, currentValue, index) => {
      const distance = Math.abs(
        currentValue > rightList[index]
          ? currentValue - rightList[index]
          : rightList[index] - currentValue
      );
      return accumulator + distance;
    },
    0
  ));
}

export function part2() {
  /**
   * 1. get list
   * 2. loop leftList
   *    - for each left item at index i
   *      - find how many times it appears in rightList
   *      - save the number of appearances
   * 3. multiply the number of appearances by the left item value
   * 4. store the result in the similarityScore
   * 5. return the similarityScore
   */
  let similarityScore = 0;
  for (let i = 0; i < leftList.length; i++) {
    const currentLeftItem = leftList[i];
    const numberOfAppearances = rightList.filter(
      (item) => item === currentLeftItem
    ).length;
    similarityScore += currentLeftItem * numberOfAppearances;
  }
  return similarityScore;
}
