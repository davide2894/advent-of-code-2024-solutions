import { readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dot = ".";

function getDiskMap(string) {
  let res = [];
  let fileId = 0;
  for (let i = 0; i < string.length; i++) {
    const isFileBlock = i % 2 === 0;
    const numberOfTimesToRepeat = parseInt(string[i]);
    if (isFileBlock) {
      for (let j = 0; j < numberOfTimesToRepeat; j++) {
        res.push(fileId);
      }
      fileId++;
    } else {
      for (let j = 0; j < numberOfTimesToRepeat; j++) {
        res.push(dot);
      }
    }
  }
  return res;
}

function getFileBlokcs(diskMapArray) {
  for (let i = diskMapArray.length - 1; i > -1; i--) {
    if (diskMapArray[i] !== dot) {
      const firstDotOnTheLeftIndex = diskMapArray.indexOf(dot);
      diskMapArray[firstDotOnTheLeftIndex] = diskMapArray[i];
      diskMapArray[i] = dot;
    }
  }

  return diskMapArray.filter((block) => block !== dot);
}

export function part1() {
  const lines = readLines(path.join(__dirname, "input.txt"));
  const diskMap = getDiskMap(lines[0]);
  const fileBlocks = getFileBlokcs(diskMap);
  const checkSum = fileBlocks.reduce((acc, curr, i) => {
    return acc + curr * i;
  }, 0);
  return checkSum;
}

export function part2() {}
