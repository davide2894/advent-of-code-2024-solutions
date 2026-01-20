import { get } from "http";
import { readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lines = readLines(path.join(__dirname, "input.txt"));
const guardPath = new Set();
const guard = "^";

function getGrid(lines) {
  return lines.map((line) => line.split(""));
}

export function part1() {
  let grid = getGrid(lines);
  let done = false;
  let cursorChar = guard;
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
        guardPath.add(`${startRow}-${startCol}`);
        continue;
      }

      guardPath.add(`${startRow}-${startCol}`);
      setNewReferenceValues(moveOutput);
    }

    if (cursorChar === ">") {
      const startRow = grid.findIndex((row) => row.includes(">"));
      const startCol = grid[startRow].indexOf(">");

      if (startCol + 1 >= grid[0].length) {
        done = true;
        guardPath.add(`${startRow}-${startCol}`);

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
        guardPath.add(`${startRow}-${startCol}`);

        continue;
      }
      guardPath.add(`${startRow}-${startCol}`);
      setNewReferenceValues(moveOutput);
    }

    if (cursorChar === "v") {
      const startRow = grid.findIndex((row) => row.includes("v"));
      const startCol = grid[startRow].indexOf("v");

      if (startRow + 1 >= grid.length) {
        done = true;
        guardPath.add(`${startRow}-${startCol}`);

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
        guardPath.add(`${startRow}-${startCol}`);

        continue;
      }
      guardPath.add(`${startRow}-${startCol}`);
      setNewReferenceValues(moveOutput);
    }

    if (cursorChar === "<") {
      const startRow = grid.findIndex((row) => row.includes("<"));
      const startCol = grid[startRow].indexOf("<");

      if (startCol - 1 < 0) {
        done = true;
        guardPath.add(`${startRow}-${startCol}`);

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
        guardPath.add(`${startRow}-${startCol}`);

        continue;
      }
      guardPath.add(`${startRow}-${startCol}`);
      setNewReferenceValues(moveOutput);
    }
  }
  return count;
}

export function part2() {
  const grid = getGrid(lines);
  const startRow = grid.findIndex((row) => row.includes(guard));
  const startCol = grid[startRow].indexOf(guard);
  let loopCount = 0;

  function getNextRow(row, direction) {
    if (direction === "up") return row - 1;
    if (direction === "down") return row + 1;
    return row;
  }

  function getNextCol(col, direction) {
    if (direction === "left") return col - 1;
    if (direction === "right") return col + 1;
    return col;
  }

  function getNextDirection(currentDirection) {
    if (currentDirection === "up") return "right";
    if (currentDirection === "right") return "down";
    if (currentDirection === "down") return "left";
    if (currentDirection === "left") return "up";
    return currentDirection;
  }

  function isWithinBounds(grid, row, col) {
    return row < 0 || col < 0 || row >= grid.length || col >= grid[0].length;
  }

  function isLoop(
    grid,
    startRow,
    startCol,
    obstacleRow,
    obstacleCol,
    startDir
  ) {
    // Placeholder function to handle loop detection
    const visited = new Set();
    let row = startRow;
    let col = startCol;
    let dir = startDir;

    while (true) {
      const key = `${row}-${col}-${dir}`;

      if (visited.has(key)) {
        return true;
      } else {
        // Mark the position as visited
        visited.add(key);

        // Find next position
        const nextRow = getNextRow(row, dir);
        const nextCol = getNextCol(col, dir);

        if (
          nextRow < 0 ||
          nextCol < 0 ||
          nextRow >= grid.length ||
          nextCol >= grid[0].length
        ) {
          return false;
        }

        const hitObstacle =
          grid[nextRow][nextCol] === "#" ||
          (nextRow === obstacleRow && nextCol === obstacleCol);

        // Check for obstacle or wall
        if (hitObstacle) {
          dir = getNextDirection(dir);
        } else {
          row = nextRow;
          col = nextCol;
        }
      }
    }
    return false;
  }

  for (const pos of guardPath) {
    const [row, col] = pos.split("-").map((val, idx) => {
      if (idx === 2) {
        return val;
      } else {
        return parseInt(val, 10);
      }
    });

    if (row === startRow && col === startCol) {
      continue;
    }

    if (isLoop(grid, startRow, startCol, row, col, "up")) {
      loopCount++;
    }
  }

  return loopCount;
}
