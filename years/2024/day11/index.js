import {
  convertArrayOfStringsToArrayOfNumbers,
  readInput,
  readLines,
} from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blinks = 25;
const lines = readLines(path.join(__dirname, "input.txt"));
const convertedInput = lines[0].split(" ").map((x) => parseInt(x, 10));

export function part1() {
  console.log(lines[0].split(" "));
  console.log(convertedInput);
  const stones = getSones(convertedInput, blinks);
}

function getStones(input, blink) {
  const stones = [];
  for (let i = 0; i < input.length; i++) {
    const stonesForCurrentBlink = getStonesForBlink(input[i], blink);
  }
}

function getStonesForBlink(input, blink) {
  const updateStoreLine = input.map((stone) => {
    if (stone === 0) {
      return 1;
    } else if (stone.toString().length % 2 === 0) {
      //TODO: If the stone is engraved with a number that has an even number of digits,
      // it is replaced by two stones.
      // The left half of the digits are engraved on the new left stone,
      // and the right half of the digits are engraved on the new right stone.
      // (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)

      const stonePair = [];
      const stoneString = stone.toString();
      const digitsFirstHalf = stoneString.slice(0, stoneString.length / 2);
      const digitsSecondHalf = stoneString.slice(stoneString.length / 2);
      stonePair.push(
        parseInt(digitsFirstHalf, 10),
        parseInt(digitsSecondHalf, 10)
      );
    } else {
      return stone * 2024;
    }
  });
  return updateStoreLine;
}

// export function part2() {
//   console.log("lines", lines);
//   return "TODO";
// }
