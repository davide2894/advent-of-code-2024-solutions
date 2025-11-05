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

function calculateSumOfAllBoxes(grid) {}

function getRobotCoordinates(grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "@") {
        const coordinates = {
          row,
          col,
        };
        return coordinates;
      }
    }
  }
}

function calcGridAfterOneMove(grid, move) {
  const resultGrid = grid;

  function recursiveFn(row, col, move, grid) {
    const newRow = row + (move === MOVE.UP ? -1 : move === MOVE.DOWN ? 1 : 0);
    const newCol =
      col + (move === MOVE.LEFT ? -1 : move === MOVE.RIGHT ? 1 : 0);
    const nextCell = grid[newRow][newCol];

    if (nextCell === "#" || nextCell === undefined) {
      return false;
    } else if (nextCell === ".") {
      grid[newRow][newCol] = grid[row][col]; // Move whatever is in current cell
      grid[row][col] = ".";
      return true;
    } else {
      if (recursiveFn(newRow, newCol, move, grid)) {
        // Box was pushed successfully, now move current cell
        grid[newRow][newCol] = grid[row][col];
        grid[row][col] = ".";
        return true;
      }
    }
    return false; // Box couldn't be pushed
  }

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "@") {
        recursiveFn(row, col, move, grid);
        return resultGrid;
      }
    }
  }
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

// export function part2() {
//     const lines = readLines(path.join(__dirname, 'input.txt'));
//     console.log('lines', lines);
//     return 'TODO';
// }
