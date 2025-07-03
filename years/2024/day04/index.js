import { match } from "assert";
import { readInput, readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1() {
  const lines = readLines(path.join(__dirname, "input.txt"));
  const xmasCount = findXmasCount(lines);
  const invertedLines = lines.map((line) => line.split("").reverse().join(""));
  const invertedXmasCount = findXmasCount(invertedLines);
  const topDownXmasCount = findVerticalXmasCount(lines);
  const bottomUPXmasCount = findVerticalXmasCount(invertedLines, true);

  return xmasCount + invertedXmasCount + topDownXmasCount + bottomUPXmasCount;
}

function findXmasCount(lines) {
  let xmasCount = 0;
  for (const line of lines) {
    const pattern = /XMAS/gi;
    const matches = line.match(pattern);
    xmasCount += matches ? matches.length : 0;
  }
  return xmasCount;
}

function findVerticalXmasCount(lines, isInverted = false) {
  let verticalLines = "";

  if (isInverted) {
    let lineIndexToUse = 0;
    for (let lineNumber = lines.length - 1; lineNumber >= 0; lineNumber--) {
      //note: print line char corresponding in increasing order
      //      es. start from bottom line and go up
      //      first get all chars at index 0 of each line
      //      then get all chars at index 1 of each line
      //      and so on until the end of the line
      //      right now i'm iterating only on the lines
      console.log("proceessing line number:", lineNumber);
      console.log("line[lineIndexToUse]:", lines[lineNumber][lineIndexToUse]);
      const bottomUpLine = lines.map((line) => line[lineIndexToUse]).join("");
      verticalLines += bottomUpLine;
      lineIndexToUse++;
    }
  } else {
    for (let i = 0; i < lines.length; i++) {
      const topDownLine = lines.map((line) => line[i]).join("");
      verticalLines += topDownLine;
      // console.log("Top-down line:", topDownLine);
    }
  }

  const topDownLinesCount = verticalLines.match(/XMAS/gi).length || 0;
  return topDownLinesCount;
}

export function part2() {
  const lines = readLines(path.join(__dirname, "input.txt"));
  return "TODO";
}
