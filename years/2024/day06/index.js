import { readLines } from "../../../utils/index.js";
import path from "path";
import { start } from "repl";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1() {
  const lines = readLines(path.join(__dirname, "input.txt"));
  let grid = lines.map((line) => line.split(""));
  let done = false;
  let cursorChar = "^";
  let count = 1;

  function moveCursor({ grid, cursorChar, startRow, startCol, nextChar }) {
    if (cursorChar === "^") {
      const nextRow = startRow - 1;
      const nextCol = startCol;
      if (nextChar === "." || nextChar === "X") {
        grid[nextRow][nextCol] = cursorChar;
        grid[startRow][startCol] = "X";
        count = nextChar === "." ? count + 1 : count;
      } else if (nextChar === "#") {
        cursorChar = ">";
        grid[startRow][startCol] = cursorChar;
      }
    } else if (cursorChar === ">") {
      const nextRow = startRow;
      const nextCol = startCol + 1;
      if (nextChar === "." || nextChar === "X") {
        grid[nextRow][nextCol] = cursorChar;
        grid[startRow][startCol] = "X";
        count = nextChar === "." ? count + 1 : count;
      } else if (nextChar === "#") {
        cursorChar = "v";
        grid[startRow][startCol] = cursorChar;
      }
    } else if (cursorChar === "v") {
      const nextRow = startRow + 1;
      const nextCol = startCol;
      if (nextChar === "." || nextChar === "X") {
        grid[nextRow][nextCol] = cursorChar;
        grid[startRow][startCol] = "X";
        count = nextChar === "." ? count + 1 : count;
      } else if (nextChar === "#") {
        cursorChar = "<";
        grid[startRow][startCol] = cursorChar;
      }
    } else if (cursorChar === "<") {
      const nextRow = startRow;
      const nextCol = startCol - 1;
      if (nextChar === "." || nextChar === "X") {
        grid[nextRow][nextCol] = cursorChar;
        grid[startRow][startCol] = "X";
        count = nextChar === "." ? count + 1 : count;
      } else if (nextChar === "#") {
        cursorChar = "^";
        grid[startRow][startCol] = cursorChar;
      }
    }

    return { grid, cursorChar, count };
  }

  function setNewReferenceValues(newData) {
    grid = newData.grid;
    cursorChar = newData.cursorChar;
    count = newData.count;
  }

  while (!done) {
    if (cursorChar === "^") {
      const startRow = grid.findIndex((row) => row.includes(cursorChar));
      const startCol = grid[startRow].indexOf(cursorChar);

      // Check bounds before accessing
      if (startRow - 1 < 0) {
        done = true;
        continue;
      }
      const nextChar = grid[startRow - 1][startCol];
      const nextCursorChar = ">";
      const moveOutput = moveCursor({
        grid,
        cursorChar,
        startRow,
        startCol,
        nextChar,
        nextCursorChar,
      });
      if (!moveOutput) {
        done = true;
        continue;
      }
      setNewReferenceValues(moveOutput);
    }

    if (cursorChar === ">") {
      const startRow = grid.findIndex((row) => row.includes(">"));
      const startCol = grid[startRow].indexOf(">");

      if (startCol + 1 >= grid[0].length) {
        done = true;
        continue;
      }
      const nextChar = grid[startRow][startCol + 1];
      const nextCursorChar = "v";
      const moveOutput = moveCursor({
        grid,
        cursorChar,
        startRow,
        startCol,
        nextChar,
        nextCursorChar,
      });
      if (!moveOutput) {
        done = true;
        continue;
      }
      setNewReferenceValues(moveOutput);
    }

    if (cursorChar === "v") {
      const startRow = grid.findIndex((row) => row.includes("v"));
      const startCol = grid[startRow].indexOf("v");

      if (startRow + 1 >= grid.length) {
        done = true;
        continue;
      }
      const nextChar = grid[startRow + 1][startCol];
      const nextCursorChar = "<";

      const moveOutput = moveCursor({
        grid,
        cursorChar,
        startRow,
        startCol,
        nextChar,
        nextCursorChar,
      });
      if (!moveOutput) {
        done = true;
        continue;
      }
      setNewReferenceValues(moveOutput);
    }

    if (cursorChar === "<") {
      const startRow = grid.findIndex((row) => row.includes("<"));
      const startCol = grid[startRow].indexOf("<");

      if (startCol - 1 < 0) {
        done = true;
        continue;
      }
      const nextChar = grid[startRow][startCol - 1];
      const nextCursorChar = "^";
      const moveOutput = moveCursor({
        grid,
        cursorChar,
        startRow,
        startCol,
        nextChar,
        nextCursorChar,
      });
      if (!moveOutput) {
        done = true;
        continue;
      }
      setNewReferenceValues(moveOutput);
    }
  }

  return count;
}

export function part2() {
  const lines = readLines(path.join(__dirname, "input.txt"));
  console.log("lines", lines);
  return "TODO";
}
