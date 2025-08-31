import { readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blinks = 25;
const lines = readLines(path.join(__dirname, "input.txt"));
const convertedInput = lines[0].split(" ").map((x) => parseInt(x, 10));

export function part1() {
  console.log(lines[0].split(" "));
  console.log("convertedInput", convertedInput);
  const stones = getStones(convertedInput, blinks);
  return stones.length;
}

function getStones(input, blinks) {
  let stonesResult = input;
  for (let i = 1; i <= blinks; i++) {
    stonesResult = getStonesForBlink(stonesResult).flat();
    console.log(stonesResult);
  }
  return stonesResult;
}

function getStonesForBlink(input) {
  // console.log("inside getStonesForBlink function");
  // console.log("input", input);
  const updateStoreLine = input.map((stone) => {
    // console.log("====================");
    // console.log("processing stone", stone);
    if (stone === 0) {
      // console.log("stone is 0, returning 1");
      return 1;
    } else if (stone.toString().length % 2 === 0) {
      // console.log("stone has even number of digits");
      // console.log("number of digits", stone.toString().length);
      const stonePair = [];
      const stoneString = stone.toString();
      const lefttHalf = stoneString.slice(0, stoneString.length / 2);
      const rightHalf = stoneString.slice(stoneString.length / 2);
      // remove any leading zeroes from
      rightHalf.length > 1 ? rightHalf.replace(/^0+/, "") : rightHalf;
      // console.log("lefttHalf", lefttHalf);
      // console.log("rightHalf", rightHalf);
      stonePair.push(parseInt(lefttHalf, 10), parseInt(rightHalf, 10));
      // console.log("stonePair", stonePair);
      return stonePair;
    } else {
      return stone * 2024;
    }
  });
  // console.log("updateStoreLine", updateStoreLine);
  return updateStoreLine;
}

// export function part2() {
//   console.log("lines", lines);
//   return "TODO";
// }
