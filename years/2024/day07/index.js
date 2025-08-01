import { readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lines = readLines(path.join(__dirname, "input.txt"));
const mappedLines = getMappedLines(lines);

function getMappedLines(lines) {
  const parsedInput = [];
  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];
    const [target, numbers] = currentLine
      .split(":")
      .map((part) => part.trim(""));
    const formatttedNUmbers = numbers.split(" ").map((n) => parseInt(n));
    parsedInput.push({ target: parseInt(target), formatttedNUmbers });
  }
  return parsedInput;
}

export function part1() {
  function hasMatchingEquations(numbers, target) {
    const combinations = Math.pow(2, numbers.length - 1);
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
      if (reduceResult === target) {
        return true;
      }
    }
    return false;
  }

  let finalSum = 0;

  for (const line of mappedLines) {
    const { target, formatttedNUmbers } = line;
    if (hasMatchingEquations(formatttedNUmbers, target)) {
      finalSum += parseInt(target);
    }
  }
  return finalSum;
}

export function part2() {
  return "TODO";
}
