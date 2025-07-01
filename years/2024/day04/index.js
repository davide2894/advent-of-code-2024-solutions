import { match } from "assert";
import { readInput, readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1() {
  const lines = readLines(path.join(__dirname, "input.txt"));
  let xmasCount = 0;
  for (const line of lines) {
    const pattern = /XMAS/gi;
    const matches = line.match(pattern);
    xmasCount += matches ? matches.length : 0;
  }
  return xmasCount;
}

export function part2() {
  const lines = readLines(path.join(__dirname, "input.txt"));
  return "TODO";
}
