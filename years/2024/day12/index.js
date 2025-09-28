import { readInput, readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rawLines = readLines(path.join(__dirname, "input.txt"));
console.log("rawLines", rawLines);

function exploreRegions(grid, visited, row, col, targetChar) {
  /**
   * if row is out of bounds, or cell is out of bounds, or cell is already visited, or cell contains a different char than the current one
   *  stop -> return area of 0 and permiter of 0
   * else
   *  i can explore neightbor cells
   *  mark the cell as visited
   *  set area to 1
   *  set perimeter to 0
   *  for each neightbour cell
   *    if out of bounds (row or cell) or char is different
   *      increase perimeter
   *    else
   *      is in bounds so:
   *        explore regiones from that cell on
   *        increase explore results by that area
   *        increase explore results by that perimeter
   *
   *   return explored region area and perimeter
   *
   */
  if (
    row < 0 ||
    row >= grid.length ||
    col < 0 ||
    col >= grid[row].length ||
    visited[row][col] ||
    grid[row][col] !== targetChar
  ) {
    return { area: 0, perimeter: 0, corners: 0 };
  } else {
    let area = 1;
    let perimeter = 0;
    let corners = countCorners(grid, row, col, targetChar);
    visited[row][col] = true;
    const directions = [
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1],
    ];

    for (const [r, c] of directions) {
      const nextRow = row + r;
      const nextCol = col + c;

      // If neighbor cell is out of bounds or not equal to current char
      // we can increase perimeter by 1
      if (
        nextRow < 0 ||
        nextRow >= grid.length ||
        nextCol < 0 ||
        nextCol >= grid[row].length ||
        grid[nextRow][nextCol] !== targetChar
      ) {
        perimeter++;
      } else if (!visited[nextRow][nextCol]) {
        // Explore from this cell as well, recursively
        const result = exploreRegions(
          grid,
          visited,
          nextRow,
          nextCol,
          grid[nextRow][nextCol]
        );
        area += result.area;
        perimeter += result.perimeter;
        corners += result.corners;
      }
    }
    return { area, perimeter, corners };
  }
}

function getCell(grid, row, col) {
  if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length) {
    return null;
  }
  return grid[row][col];
}

function countCorners(grid, row, col, targetChar) {
  let corners = 0;
    const directions = [
    [
      [-1,0],
      [0,1],
      [-1,1],
    ],
    [
      [0,1],
      [1,0],
      [1,1]
    ],
    [
      [1,0],
      [0,-1],
      [1,-1]
    ],
    [
      [0,-1],
      [-1,0],
      [-1,-1]
    ]
  ];

  for (const dir of directions) {
    const [neighbor1, neighbor2, diagonal] = dir;
    console.log({
      "firstNeightBor": neighbor1,
      "secondNeighbor": neighbor2,
      "diagonal": diagonal
    })
    
    const n1Char = getCell(grid, row  + neighbor1[0], col + neighbor1[1]);
    const n2Char = getCell(grid, row  + neighbor2[0], col + neighbor2[1]);
    const diagChar = getCell(grid, row  + diagonal[0], col + diagonal[1]);

    console.log(
      {
        n1Char, n2Char, diagChar
      }
    );
  
    if(
      (n1Char !== targetChar && n2Char !== targetChar) ||
      (n2Char === targetChar && n1Char === targetChar && diagChar !== targetChar)
    ){
      corners++;
    }
  }
  return corners;
}

export function part1() {
  const grid = rawLines.map((line) => line.split(""));
  console.log("grid", grid);
  const visited = Array(grid.length)
    .fill()
    .map(() => Array(grid[0].length).fill(false));

  console.log("visited", visited);
  let totalPrice = 0;

  // iterate each grid line
  for (let i = 0; i < grid.length; i++) {
    console.log("===============================");
    console.log("line", grid[i]);
    console.log("visited", visited[i]);

    // iterate each column
    for (let j = 0; j < grid[0].length; j++) {
      const cell = grid[i][j];
      console.log("visited", visited[i][j]);

      /**
       * if not visited
       *  explore regions to find connected components
       * else
       *  do nothing
       */

      if (!visited[i][j]) {
        console.log(`cell at line ${i} and col ${j} was not yet visited`);

        const { area, perimeter } = exploreRegions(grid, visited, i, j, cell);
        console.log("totalPrice", totalPrice);
        totalPrice += area * perimeter;
      } else {
        console.log(`cell at line ${i} and col ${j} was already visited`);
      }
    }
  }

  return totalPrice;
}

export function part2() {
  const grid = rawLines.map((line) => line.split(""));
  const visited = Array(grid.length)
    .fill()
    .map(() => Array(grid[0].length).fill(false));

  let totalPrice = 0;

  // iterate each grid line
  for (let i = 0; i < grid.length; i++) {
    // iterate each column
    for (let j = 0; j < grid[0].length; j++) {
      const cell = grid[i][j];
      /**
       * if not visited
       *  explore regions to find connected components
       * else
       *  do nothing
       */
      if (!visited[i][j]) {
        console.log(`cell at line ${i} and col ${j} was not yet visited`);
        const { area, corners } = exploreRegions(
          grid,
          visited,
          i,
          j,
          cell
        );
        console.log("corners", corners);
        totalPrice += area * corners;
      } else {
        console.log(`cell at line ${i} and col ${j} was already visited`);
      }
    }
  }

  return totalPrice;
}
