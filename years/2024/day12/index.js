import { readInput, readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

/**
 * 1) for each line
 *   for each char
 *    if line is the first one
 *        check if region for same char exisits
 *            if it does exist -> add this char to that region count
 *            else
 *                create region for that char
 *    check if the char is also present up and/or left
 *        - if yes
 *            - we are in a region
 *                - actions
 *                   - increase area count for the region
 *                   - increase perimeter count for that cell
 *        - if no
 *            - we are not in a region
 *               - create a new region
 *                 - actions
 *                   - increase area count for the region
 *                   - increase perimeter count for that cell
 *
 * 2) for each region
 *   - calculate price
 *   - add price to total
 * 3) return total
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let regions = [];

// {
//   char: "A",
//   area: 10,
//   perimeter: 14,
//   isClosed: false,
// }

function getRegion(char) {
  return regions.find((region) => region.char === char);
}

function closeRegion(char) {
  // close existing region for that char
  regions = regions.map((r) => {
    if (r.char === char) {
      return { ...r, isClosed: true };
    } else {
      return r;
    }
  });
}

function createRegion(char, perimeter) {
  console.log(`creating region for char ${char}`);
  const region = {
    char,
    area: 1,
    perimeter,
    isClosed: false,
  };

  console.log(region);

  regions.push(region);
}

function updateRegion(char, perimeter) {
  console.log(`updateRegion function called with char ${char} whose perimeter is ${perimeter}`);
  regions = regions.map((r) => {
    if (r.char === char && !r.isClosed) {
      // update matching region
      console.log("update matching region with char", char);
      console.log("region before update", r);
      const updatedRegion = {
        ...r,
        area: r.area + 1,
        perimeter: r.perimeter + perimeter,
      };
      console.log("updatedRegion", updatedRegion)
      return updatedRegion;
    } else {
      return r;
    }
  });
}

function getCharPerimeter(char, charAbove, charAfter, charBelow, charBefore) {
  // Perimeter increases by 1 for each side when the adjacent char is different
  let perimeter = 0;

  if(!charBefore || charBefore !== char){
    perimeter++;
  }

  if(!charAbove || charAbove !== char) {
    perimeter++;
  }

  if(!charAfter || charAfter !== char) {
    perimeter++;
  }

  if(!charBelow || charBelow !== char) {
    perimeter++;
  }

  console.log("calculated perimeter is ", perimeter);

  return perimeter;
}

export function part1() {
  //TODO: implement region closing logic to avoid putting in same region when in reality 
  // should create new region

  const rawLines = readLines(path.join(__dirname, "input.txt"));
  const lines = rawLines.map((line) => line.split(""));

  // iterate over each line
  for (let i = 0; i < lines.length; i++) {
    console.log("===============================");
    console.log("line", lines[i]);
    let char,
    charBefore,
    charAfter,
    charBelow,
    charAbove,
      charPerimiter = undefined;
    
    // if line is the first one
    //   - check if a region for same char exisits
    //   - if it does exist
    //      add this char to that region count
    //   - else
    //      create region for that char
    
    // iterate over each char in the line
    for (let j = 0; j < lines[i].length; j++) {
      char = lines[i][j];
      charAbove = i > 0 ? lines[i-1][j] : undefined;
      charAfter = j < lines[i].length - 1 ? lines[i][j+1] : undefined;
      charBelow = i < lines.length - 1 ? lines[i+1][j] : undefined;
      charBefore = j > 0 ? lines[i][j-1] : undefined;

      // console.log("char", char);
      // console.log("charAbove", charAbove);
      // console.log("charBelow", charBelow);
      // console.log("charBefore", charBefore);
      // console.log("charAfter", charAfter);

      console.log("-------------------------------");
      console.log(`char ${char} at line ${i}, index ${j}`);
      
      if (i == 0) {
        charPerimiter = getCharPerimeter(char, charAbove, charAfter, charBelow, charBefore);
        if (getRegion(char)) {
          updateRegion(char, charPerimiter);
        } else {
          createRegion(char, charPerimiter);
        }
      } else {
        char = lines[i][j];
        charPerimiter = getCharPerimeter(char, charAbove, charAfter, charBelow, charBefore);
        // if the same letter is in the cell above or on the left
        // it means we are in an existing region, so we can update it
        if (char === charAbove || (j > 0 && char == lines[i][j-1])) {
          updateRegion(char, charPerimiter);
        } else {
          createRegion(char, charPerimiter);
        }
      }
      console.log("regions", regions);
    }
  }


  // Now, we have all the regions
  // So for each region
  //  we can calculate the price for each region
  //  add price to total

  // return the final total

  let total = 0;

  regions.forEach(r => {
    total += r.area * r.perimeter;
  });

  return total;
}

// export function part2() {
//     const lines = readLines(path.join(__dirname, 'input.txt'));
//     console.log('lines', lines);
//     return 'TODO';
// }
