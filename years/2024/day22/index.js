import { readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buyers = readLines(path.join(__dirname, "input.txt")).map((line) =>
  parseInt(line, 10)
);
const iterations = 2000;

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

function getLastDigit(number) {
  // % 10 returns the last digit of a number as the reimainder (cause we are dividing by 10)
  return number % 10n;
}

export function part1() {
  let result = 0n;

  for (const n of buyers) {
    let updatedN = BigInt(n);
    for (let i = 0; i < iterations; i++) {
      updatedN = process(updatedN);
    }
    result += updatedN;
  }

  return Number(result);
}

export function part2() {
  const totals = new Map();

  for (const secret of buyers) {
    let secretBigInt = BigInt(secret);
    const prices = [getLastDigit(secretBigInt)];

    for (let i = 0; i < iterations; i++) {
      secretBigInt = process(secretBigInt);
      const price = getLastDigit(secretBigInt);
      prices.push(price);
    }

    const seen = new Set();

    // Calc variations sequences prices
    for (let i = 1; i < prices.length - 3; i++) {
      const v1 = prices[i] - prices[i - 1];
      const v2 = prices[i + 1] - prices[i];
      const v3 = prices[i + 2] - prices[i + 1];
      const v4 = prices[i + 3] - prices[i + 2];

      const key = `${v1},${v2},${v3},${v4}`;

      if (!seen.has(key)) {
        seen.add(key);

        const sellingPrice = prices[i + 3];
        const currentTotal = totals.get(key) || 0n;
        totals.set(key, currentTotal + BigInt(sellingPrice));
      }
    }
  }

  let maxTotal = 0n;
  for (const total of totals.values()) {
    if (total > maxTotal) {
      maxTotal = total;
    }
  }

  return Number(maxTotal);
}
