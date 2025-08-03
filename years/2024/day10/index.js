import { get } from "http";
import {
  convertArrayOfStringsToArrayOfNumbers,
  readLines,
} from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lines = readLines(path.join(__dirname, "input.txt"));
const arr = convertArrayOfStringsToArrayOfNumbers(lines);

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
  uniquePaths
) {
  if (currentCharValue === 9) {
    if (uniquePaths) {
      uniquePaths.add(`${currentLineIndex},${currentCharIndex}`);
      return;
    } else {
      return 1;
    }
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

  return uniquePaths ? uniquePaths.size : pathsCount;
}

export function part1() {
  let trailingPathCount = 0;

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
        const trailingHeadCount = findTrailingPaths(
          arr,
          currentLineIndex,
          currentCharIndex,
          currentCharValue,
          new Set()
        );
        trailingPathCount += trailingHeadCount;
      }
    }
  }
  return trailingPathCount;
}

export function part2() {
  let trailingPathCount = 0;

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
        const trailingHeadCount = findTrailingPaths(
          arr,
          currentLineIndex,
          currentCharIndex,
          currentCharValue
        );
        trailingPathCount += trailingHeadCount;
      }
    }
  }
  return trailingPathCount;
}
