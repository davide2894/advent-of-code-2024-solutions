import { readInput, readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const numbers = readLines(path.join(__dirname, "input.txt")).map((line) =>
  parseInt(line, 10)
);
console.log("numbers", numbers);
const iterations = 2000;

export function part1() {
  let result = 0n;

  function mix(secret, numberToMix) {
    return secret ^ numberToMix;
  }

  function prune(secret) {
    return secret % 16777216n;
  }

  function process(secret) {
    let res = 0n;

    // step 1
    res = secret * 64n;
    secret = mix(secret, res);
    secret = prune(secret);

    // step 2
    res = secret / 32n;
    secret = mix(secret, res);
    secret = prune(secret);

    // step 3
    res = secret * 2048n;
    secret = mix(secret, res);
    secret = prune(secret);

    return secret;
  }

  for (const n of numbers) {
    let updatedN = BigInt(n);
    for (let i = 0; i < iterations; i++) {
      updatedN = process(updatedN);
    }
    console.log("updatedN", updatedN);
    result += updatedN;
  }

  return Number(result);
}

// export function part2() {
//   const lines = readLines(path.join(__dirname, "input.txt"));
//   console.log("lines", lines);
//   return "TODO";
// }
