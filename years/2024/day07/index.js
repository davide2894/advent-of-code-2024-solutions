import { readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1() {
  function findAllSolutions(numbers) {
    console.log("numbers", numbers);
  }

  const lines = readLines(path.join(__dirname, "input.txt"));
  let count = 0;
  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];
    const [target, numbers] = currentLine
      .split(":")
      .map((part) => part.trim(""));
    console.log("target", target);
    console.log("numbers", numbers.split(" "));
    const formatttedNUmbers = numbers.split(" ").map((n) => parseInt(n));
    console.log("formatttedNUmbers", formatttedNUmbers);
    const numberOfSolutions = findAllSolutions(formatttedNUmbers);
    if (numberOfSolutions) {
      count += numberOfSolutions;
    }
  }
  return count;
}

// export function part2() {
//   const lines = readLines(path.join(__dirname, "input.txt"));
//   console.log("lines", lines);
//   return "TODO";
// }
