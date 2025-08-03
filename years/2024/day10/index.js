import { get } from "http";
import {
  convertArrayOfStringsToArrayOfNumbers,
  readLines,
} from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getDirections(currentLine, currentCharIndex, prevLine, nextLine) {
  return {
    left: currentLine[currentCharIndex - 1],
    right: currentLine[currentCharIndex + 1],
    up: prevLine ? prevLine[currentCharIndex] : undefined,
    down: nextLine ? nextLine[currentCharIndex] : undefined,
  };
}

function findTrailingPaths(
  linesArray,
  currentLineIndex,
  currentCharIndex,
  currentCharValue,
  uniquePaths = new Set()
) {
  if (currentCharValue === 9) {
    uniquePaths.add(`${currentLineIndex},${currentCharIndex}`);
    return;
  }
  let pathsCount = 0;
  const currentLine = linesArray[currentLineIndex];
  const prevLine = linesArray[currentLineIndex - 1] || [];
  const nextLine = linesArray[currentLineIndex + 1] || [];

  const directions = getDirections(
    currentLine,
    currentCharIndex,
    prevLine,
    nextLine
  );
  if (directions.left && directions.left === currentCharValue + 1) {
    pathsCount += findTrailingPaths(
      linesArray,
      currentLineIndex,
      currentCharIndex - 1,
      directions.left,
      uniquePaths
    );
  }
  if (directions.right && directions.right === currentCharValue + 1) {
    pathsCount += findTrailingPaths(
      linesArray,
      currentLineIndex,
      currentCharIndex + 1,
      directions.right,
      uniquePaths
    );
  }
  if (directions.up && directions.up === currentCharValue + 1) {
    pathsCount += findTrailingPaths(
      linesArray,
      currentLineIndex - 1,
      currentCharIndex,
      directions.up,
      uniquePaths
    );
  }
  if (directions.down && directions.down === currentCharValue + 1) {
    pathsCount += findTrailingPaths(
      linesArray,
      currentLineIndex + 1,
      currentCharIndex,
      directions.down,
      uniquePaths
    );
  }

  return uniquePaths.size;
}

export function part1() {
  const lines = readLines(path.join(__dirname, "input.txt"));
  let trailingPathCount = 0;
  const arr = convertArrayOfStringsToArrayOfNumbers(lines);

  // Loop through each line in the array
  for (
    let currentLineIndex = 0;
    currentLineIndex < arr.length;
    currentLineIndex++
  ) {
    const currentLine = arr[currentLineIndex];
    // Loop through each character in the current line
    for (
      let currentCharIndex = 0;
      currentCharIndex < currentLine.length;
      currentCharIndex++
    ) {
      const currentCharValue = currentLine[currentCharIndex];
      const isTrailingHead = currentCharValue === 0;
      if (isTrailingHead) {
        const trailingHeadScore = findTrailingPaths(
          arr,
          currentLineIndex,
          currentCharIndex,
          currentCharValue
        );
        trailingPathCount += trailingHeadScore;
      }
    }
  }
  return trailingPathCount;
}

// export function part2() {
//   const lines = readLines(path.join(__dirname, "input.txt"));
//   console.log("lines", lines);
//   return "TODO";
// }
