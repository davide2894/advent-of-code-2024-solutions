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

function hasMatchingEquations(numbers, target, base) {
  const combinations = Math.pow(base, numbers.length - 1);
  for (let i = 0; i < combinations; i++) {
    const operationSequence = i.toString(base).padStart(numbers.length - 1, 0);
    let k = 0;
    let operationResult;

    const reduceResult = numbers.reduce((acc, curr) => {
      if (operationSequence[k] == 0) {
        operationResult = acc + curr;
      } else if (operationSequence[k] == 1) {
        operationResult = acc * curr;
      } else if (operationSequence[k] == 2) {
        operationResult = parseInt(acc.toString() + curr.toString());
      }
      k++;
      return operationResult;
    });
    if (reduceResult === target) {
      console.log(
        "Found matching equation:",
        target,
        "with sequence:",
        operationSequence
      );
      return true;
    }
  }
  return false;
}

export function part1() {
  let finalSum = 0;
  for (const line of mappedLines) {
    const { target, formatttedNUmbers } = line;
    if (hasMatchingEquations(formatttedNUmbers, target, 2)) {
      finalSum += parseInt(target);
    }
  }
  return finalSum;
}

export function part2() {
  let finalSum = 0;
  for (const line of mappedLines) {
    const { target, formatttedNUmbers } = line;
    if (hasMatchingEquations(formatttedNUmbers, target, 3)) {
      finalSum += parseInt(target);
    }
  }
  return finalSum;
}
