import { match } from "assert";
import { readInput, readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { Socket } from "dgram";
import { get } from "http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1() {
  const lines = readLines(path.join(__dirname, "input.txt"));
  return (
    getHorizontalXmasCount(lines) +
    getVerticalXmasCount(lines) +
    getDiagonalXmasCount(lines)
  );
}

function getHorizontalXmasCount(lines) {
  let xmasCount = 0;
  for (const line of lines) {
    const pattern = /XMAS/gi;
    const reversePattern = /SAMX/gi; 
    const matches = line.match(pattern);
    const inverseMatches = line.match(reversePattern);
    xmasCount += (matches ? matches.length : 0) + (inverseMatches ? inverseMatches.length : 0);
  }
  return xmasCount;
}

function getVerticalXmasCount(lines) {
  let count = 0;
  for (let i = 0; i < lines.length; i++) {
    const topDownLine = lines.map((line) => line[i]).join("");
    count += topDownLine.match(/XMAS/gi)?.length || 0;
    count += topDownLine.match(/SAMX/gi)?.length || 0;
  }
  return count;
}

function getDiagonalXmasCount(matrix) {
  const leftToRightDiagonals = getLeftToRightDiagonals(matrix);
  const rightToLeftDiagonals = getLeftToRightDiagonals(matrix.map(row => row.split("").reverse().join("")));

  return leftToRightDiagonals + rightToLeftDiagonals;
}

function getLeftToRightDiagonals(matrix){
  let n = matrix.length;
  let m = matrix[0].length;
  let count = 0;
  
  // Process all diagonals starting from the first column
  // console.log("Process all diagonals starting from the first column")
  for (let row = 0; row < n; row++) {
    let i = row, j = 0;
    let res = [];
    // console.log("row:", row);
    // console.log("i:", i);
    // console.log("j:", j);

    // Follow each diagonal going up and right
    // console.log("checking if I can enter the while loop");
    // console.log("n:", n);
    // console.log("m:", m); 
    // console.log("i", i);
    // console.log("j", j);
    // console.log("i >= 0:", i >= 0);
    // console.log("j < m:", j < m); 
    while (i >= 0 && j < m) {
      // console.log("inside while loop");
      // console.log("i:", i);
      // console.log("j:", j);
      // console.log("mat[i][j]:", matrix[i][j]);
      // console.log("while loop current iteration result:", res);
      res.push(matrix[i][j]);
      
      i--;
      j++;
      // console.log("i after decrement:", i);
      // console.log("j after increment:", j);
    }
    count += res.length >= 4 && res.join("").match(/XMAS/gi)?.length || 0;
    count += res.length >= 4 && res.join("").match(/SAMX/gi)?.length || 0;
  }
  
  // Process remaining diagonals starting from 
  // the bottom row (except first column)
  // console.log("Process remaining diagonals starting from the bottom row (except first column)");
  for (let col = 1; col < m; col++) {
    let i = n - 1, j = col;
    let res = [];
    // console.log("n:", n);
    // console.log("m:", m);
    // console.log("col:", col);
    // console.log("i:", i);
    
    // Follow each diagonal going up and right
    while (i >= 0 && j < m) {
      // console.log("inside second while loop");
      // console.log("i:", i);
      // console.log("j:", j);
      // console.log("i>= 0:", i >= 0);
      // console.log("j < m:", j < m);
      // console.log("i < m && j >= 0:", i < m && j >= 0); 
      // console.log("mat[i][j]:", matrix[i][j]);
      // console.log("while loop current iteration result:", res);
      res.push(matrix[i][j]);
      
      i--;
      j++;
      // console.log("i after decrement:", i);
      // console.log("j after increment:", j);
    }
    count += res.length >= 4 && res.join("").match(/XMAS/gi)?.length || 0;
    count += res.length >= 4 && res.join("").match(/SAMX/gi)?.length || 0;
  }

  return count;
}

export function part2() {
  const lines = readLines(path.join(__dirname, "input.txt"));
  console.log("lines:", lines);
  let count = 0;
  for(let row = 0; row < lines.length; row++) {
    for(let col = 0; col < lines[row].length; col++) {
      if(lines[row][col] === "A"){
        if(row >= 1 && row !== lines.length -1 && col >=1 && col !== lines[row].length - 1) {
          const corners = {
            topLeft: lines[row-1][col-1],
            topRight: lines[row-1][col+1],
            bottomLeft: lines[row+1][col-1],
            bottomRight: lines[row+1][col+1]
          };
          // Check if there is an X-MAS
          if(
             (
              corners.topLeft === "M" && 
              corners.topRight === "S" && 
              corners.bottomLeft === "M" && 
              corners.bottomRight === "S"
             ) || 
             (
              corners.topLeft === "M" && 
              corners.topRight === "M" && 
              corners.bottomLeft === "S" && 
              corners.bottomRight === "S") 
              || 
             (
              corners.topLeft === "S" && 
              corners.topRight === "S" && 
              corners.bottomLeft === "M" && 
              corners.bottomRight === "M") 
              || 
            (
              corners.topLeft === "S" && 
              corners.topRight === "M" && 
              corners.bottomLeft === "S" && 
              corners.bottomRight === "M"
            )
          ){
            count++;
          }
        }
      }
    }
  }
  return count;
}
