import { readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lines = readLines(path.join(__dirname, "input.txt"));
const rules = lines.slice(0, lines.indexOf(""));
const updates = lines.slice(lines.indexOf("") + 1);
const formattedUpdates = updates.map((update) =>
  update.split(",").map((el) => parseInt(el, 10))
);

export function part1() {
  const middleNumbers = [];
  const validUpdates = formattedUpdates.filter((update) =>
    isValidUpdate(update, rules)
  );
  validUpdates.forEach((update) => {
    const middleNumber = getArrayElementInTheMiddle(update);
    middleNumbers.push(middleNumber);
  });
  const result = middleNumbers.reduce((acc, num) => {
    return acc + num;
  }, 0);

  return result;
}

function isValidUpdate(update, rules) {
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
}

function getArrayElementInTheMiddle(arr) {
  return arr[Math.floor(arr.length / 2)];
}

export function part2() {
  function getInvalidUpdates(updates, rules) {
    return updates.filter((update) => !isValidUpdate(update, rules));
  }
  const middleNumbers = [];
  const invalidUpdates = getInvalidUpdates(formattedUpdates, rules);
  const correctedUpdates = invalidUpdates.map((update) => {
    let allRulesAreValid = false;
    while (!allRulesAreValid) {
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
          const temp = update[beforeIndex];
          update[beforeIndex] = update[afterIndex];
          update[afterIndex] = temp;
        }
      }
      if (isValidUpdate(update, rules)) {
        allRulesAreValid = true;
        break;
      }
    }
    return update;
  });

  correctedUpdates.forEach((update) => {
    const middleNumber = getArrayElementInTheMiddle(update);
    middleNumbers.push(middleNumber);
  });

  return middleNumbers.reduce((acc, num) => {
    return acc + num;
  }, 0);
}
