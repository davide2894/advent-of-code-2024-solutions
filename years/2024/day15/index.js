import { readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { writeFile } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MOVE = {
  UP: "^",
  DOWN: "v",
  LEFT: "<",
  RIGHT: ">",
};

function calcGridAfterOneMove(grid, move) {
  const resultGrid = grid.map((row) => [...row]); // Create a copy

  function canMove(row, col, move, grid) {
    const newRow = row + (move === MOVE.UP ? -1 : move === MOVE.DOWN ? 1 : 0);
    const newCol =
      col + (move === MOVE.LEFT ? -1 : move === MOVE.RIGHT ? 1 : 0);

    if (
      newRow < 0 ||
      newRow >= grid.length ||
      newCol < 0 ||
      newCol >= grid[0].length
    ) {
      return false;
    }

    const nextCell = grid[newRow][newCol];

    if (nextCell === "#") {
      return false;
    }

    if (nextCell === ".") {
      return true;
    }

    // Horizontal movement
    if (move === MOVE.LEFT || move === MOVE.RIGHT) {
      return canMove(newRow, newCol, move, grid);
    }

    // Vertical movement with wide boxes
    if (nextCell === "[" || nextCell === "]") {
      const otherHalfCol = nextCell === "[" ? newCol + 1 : newCol - 1;
      return (
        canMove(newRow, newCol, move, grid) &&
        canMove(newRow, otherHalfCol, move, grid)
      );
    }

    // Old single box (for part 1 compatibility)
    if (nextCell === "O") {
      return canMove(newRow, newCol, move, grid);
    }

    return false;
  }

  function doMove(row, col, move, grid) {
    const newRow = row + (move === MOVE.UP ? -1 : move === MOVE.DOWN ? 1 : 0);
    const newCol =
      col + (move === MOVE.LEFT ? -1 : move === MOVE.RIGHT ? 1 : 0);
    const nextCell = grid[newRow][newCol];

    if (nextCell === ".") {
      grid[newRow][newCol] = grid[row][col];
      grid[row][col] = ".";
      return;
    }

    // Horizontal movement
    if (move === MOVE.LEFT || move === MOVE.RIGHT) {
      doMove(newRow, newCol, move, grid);
      grid[newRow][newCol] = grid[row][col];
      grid[row][col] = ".";
      return;
    }

    // Vertical movement
    if (nextCell === "[" || nextCell === "]") {
      const otherHalfCol = nextCell === "[" ? newCol + 1 : newCol - 1;
      // Move both halves of the box
      doMove(newRow, newCol, move, grid);
      doMove(newRow, otherHalfCol, move, grid);
      grid[newRow][newCol] = grid[row][col];
      grid[row][col] = ".";
      return;
    }

    if (nextCell === "O") {
      doMove(newRow, newCol, move, grid);
      grid[newRow][newCol] = grid[row][col];
      grid[row][col] = ".";
      return;
    }
  }

  // Find robot and try to move
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "@") {
        if (canMove(row, col, move, resultGrid)) {
          doMove(row, col, move, resultGrid);
        }
        return resultGrid;
      }
    }
  }

  return resultGrid;
}

function getGridAfterMoves(grid, moves) {
  let gridAfterMoves = grid;

  for (const [index, move] of moves.entries()) {
    gridAfterMoves = calcGridAfterOneMove(gridAfterMoves, move);
    writeFile(
      path.join(__dirname, `output_${index}.txt`),
      gridAfterMoves.map((r) => r.join("")).join("\n"),
      {
        encoding: "utf-8",
        flag: "w",
      },
      (err) => {
        if (err) {
          console.error("Error writing file", err);
        }
      }
    );
  }

  return gridAfterMoves;
}

export function part1() {
  const lines = readLines(path.join(__dirname, "input.txt"));
  const grid = lines.splice(0, lines.indexOf("")).map((row) => row.split(""));
  const moves = lines
    .splice(lines.indexOf(""))
    .filter((el) => el !== "")
    .map((m) => m.split(""))
    .flat();

  const gridAfterMoves = getGridAfterMoves(grid, moves);

  let sumOfAllBoxes = 0;

  for (let row = 0; row < gridAfterMoves.length; row++) {
    for (let col = 0; col < gridAfterMoves[row].length; col++) {
      if (gridAfterMoves[row][col] === "O") {
        sumOfAllBoxes += 100 * row + col;
      }
    }
  }

  return sumOfAllBoxes;
}

export function part2() {
  const lines = readLines(path.join(__dirname, "input.txt"));
  const originalGrid = lines
    .splice(0, lines.indexOf(""))
    .map((row) => row.split(""));
  const moves = lines
    .splice(lines.indexOf(""))
    .filter((el) => el !== "")
    .map((m) => m.split(""))
    .flat();

  // Expand the grid for part 2
  const grid = originalGrid.map((row) => {
    return row.flatMap((cell) => {
      if (cell === "#") return ["#", "#"];
      if (cell === "O") return ["[", "]"];
      if (cell === ".") return [".", "."];
      if (cell === "@") return ["@", "."];
      return [cell, cell];
    });
  });

  const gridAfterMoves = getGridAfterMoves(grid, moves);

  let sumOfAllBoxes = 0;

  for (let row = 0; row < gridAfterMoves.length; row++) {
    for (let col = 0; col < gridAfterMoves[row].length; col++) {
      if (gridAfterMoves[row][col] === "[") {
        sumOfAllBoxes += 100 * row + col;
      }
    }
  }

  return sumOfAllBoxes;
}
