import { readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1() {
  function matchingEquations(numbers, target) {
    const combinations = Math.pow(2, numbers.length - 1);
    let matches = 0;
    for (let i = 0; i < combinations; i++) {
      const operationSequence = i.toString(2).padStart(numbers.length - 1, 0);
      let k = 0;
      let operationResult;
      const reduceResult = numbers.reduce((acc, curr) => {
        if (operationSequence[k] == 0) {
          operationResult = acc + curr;
        } else {
          operationResult = acc * curr;
        }
        k++;
        return operationResult;
      });
      if (reduceResult == target) {
        matches++;
      }
    }
    return matches;
  }

  const lines = readLines(path.join(__dirname, "input.txt"));
  let finalSum = 0;
  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];
    const [target, numbers] = currentLine
      .split(":")
      .map((part) => part.trim(""));
    const formatttedNUmbers = numbers.split(" ").map((n) => parseInt(n));
    console.log(
      "matchingEquations",
      matchingEquations(formatttedNUmbers, target)
    );
    if (matchingEquations(formatttedNUmbers, target)) {
      finalSum += target;
    }
  }
  return finalSum;
}

// export function part2() {
//   const lines = readLines(path.join(__dirname, "input.txt"));
//   console.log("lines", lines);
//   return "TODO";
// }
