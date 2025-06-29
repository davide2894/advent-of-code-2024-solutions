import { readInput, readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function calculateSumOfMultiplications(validMuls) {
  let sumOfMultiplications = 0;
  for (const mul of validMuls) {
    const matchedNumbers = mul.match(/\d{1,3}/g);
    if (matchedNumbers && matchedNumbers.length === 2) {
      const [num1, num2] = matchedNumbers.map(Number);
      sumOfMultiplications += num1 * num2;
    }
  }
  return sumOfMultiplications;
}

export function part1() {
  const input = readInput(path.join(__dirname, "input.txt"));
  //   const mulRegex = /mul\(\d{1,3},\d{1,3}\)/g;
  //   const validMuls = input.match(mulRegex);
  //   return calculateSumOfMultiplications(validMuls);
  //   console.log("input", input);
  const arrAfterSplittingMul = input.split("mul");
  arrAfterSplittingMul.forEach((item, index) => {
    console.log(item);
    item.split("(");
    console.log(item.split("(").split(")"));
  });
}

export function part2() {
  const input = readInput(path.join(__dirname, "input.txt"));
  const instructionRegex = /(do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\))/g;
  const matchedInstructions = input.match(instructionRegex);
  const validMuls = [];
  let isMulEnabled = true;

  for (const instruction of matchedInstructions) {
    if (instruction.startsWith("do()")) {
      isMulEnabled = true; // Toggle mul state
    } else if (instruction.startsWith("don't()")) {
      isMulEnabled = false; // Toggle mul state
    } else if (instruction.startsWith("mul") && isMulEnabled) {
      validMuls.push(instruction);
    }
  }
  return calculateSumOfMultiplications(validMuls);
}
