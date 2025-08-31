import { readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lines = readLines(path.join(__dirname, "input.txt"));
const convertedInput = lines[0].split(" ").map((x) => parseInt(x, 10));

export function part1() {
  return getStonesNumber(convertedInput, 25);
}

export function part2() {
  return getStonesNumber(convertedInput, 75);
}

function getStonesNumber(input, blinks) {
  let stonesResult = input;
  for (let i = 1; i <= blinks; i++) {
    stonesResult = getStonesForBlink(stonesResult).flat();
  }
  return stonesResult.length ?? 0;
}

function getStonesForBlink(input) {
  // console.log("inside getStonesForBlink function");
  // console.log("input", input);
  return input.map((stone) => {
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
}
