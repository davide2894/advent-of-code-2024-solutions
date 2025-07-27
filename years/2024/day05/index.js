import { read } from "fs";
import { readInput, readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1() {
  const lines = readLines(path.join(__dirname, "input.txt"));
  console.log(lines.indexOf(""));
  const rules = lines.slice(0, lines.indexOf(""));
  const updates = lines.slice(lines.indexOf("") + 1);
  console.log("updates", updates);
  const formattedUpdates = updates.map((update) =>
    update.split(",").map((el) => parseInt(el, 10))
  );
  console.log("formattedUpdates", formattedUpdates);
  const middleNumbers = [];

  const validUpdates = formattedUpdates.filter((update) =>
    isValidUpdate(update, rules)
  );
  console.log("validUpdates", validUpdates);
  validUpdates.forEach((update) => {
    const middleNumber = getArrayElementInTheMiddle(update);
    middleNumbers.push(middleNumber);
  });
  console.log("middleNumbers", middleNumbers);
  const result = middleNumbers.reduce((acc, num) => {
    return acc + num;
  }, 0);

  return result;
}

function isValidUpdate(update, rules) {
  console.log("Validating update:", update);
  console.log("rules", rules);
  for (const rule of rules) {
    const [before, after] = rule.split("|");
    const beforeIndex = update.indexOf(parseInt(before, 10));
    if (beforeIndex === -1) {
      continue;
    }
    const afterIndex = update.indexOf(parseInt(after, 10));
    if (afterIndex === -1) {
      continue;
    }
    if (beforeIndex > afterIndex) {
      return false;
    }
  }
  return true;
  // TODO: Implement validation logic
}

function getArrayElementInTheMiddle(arr) {
  return arr[Math.floor(arr.length / 2)];
}

export function part2() {
  //   const lines = readLines(path.join(__dirname, "input.txt"));
  //   console.log("lines", lines);
  return "TODO";
}
