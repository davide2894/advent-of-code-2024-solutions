import { readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const dot = ".";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lines = readLines(path.join(__dirname, "input.txt"));

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

function getFileBlocks(diskMapArray) {
  const arr = diskMapArray;
  for (let i = arr.length - 1; i > -1; i--) {
    if (arr[i] !== dot) {
      const firstDotOnTheLeftIndex = arr.indexOf(dot);
      arr[firstDotOnTheLeftIndex] = arr[i];
      arr[i] = dot;
    }
  }
  return arr.filter((block) => block !== dot);
}

function calculateCheckSum(fileBlocks) {
  console.log("fileBlocks", fileBlocks.map((n) => n.toString()).join(""));
  return fileBlocks.reduce((acc, curr, i) => {
    return acc + curr * i;
  }, 0);
}

export function part1() {
  const diskMap = getDiskMap(lines[0]);
  const fileBlocks = getFileBlocks(diskMap);
  return calculateCheckSum(fileBlocks);
}

export function part2() {
  const diskMap = getDiskMap(lines[0]);
  const reorderedDiskMap = moveWholeFileBlocks(diskMap);
  return calculateCheckSum(reorderedDiskMap.filter((block) => block !== dot));
}

function moveWholeFileBlocks(diskMapArray) {
  const arr = diskMapArray;
  const arrString = arr.map((n) => n.toString()).join("");
  const processedFileBlocks = [];
  const skippedFileBlocks = [];
  // console.log("arrString", arrString);
  for (let i = arr.length - 1; i > -1; i--) {
    // console.log(
    //   "––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––"
    // );
    // console.log("checking arr[i]", arr[i], "at index", i);
    // console.log("processedFileBlocks", processedFileBlocks);
    // console.log("skippedFileBlocks", skippedFileBlocks);
    if (
      skippedFileBlocks.includes(arr[i]) ||
      arr[i] === dot ||
      processedFileBlocks.includes(arr[i])
    ) {
      // console.log(
      //   `skipping file block ${arr[i]} at index ${i} because it was already skipped`
      // );
      continue;
    }
    processedFileBlocks.push(arr[i]);
    const firstDotOnTheLeftIndex = arr.indexOf(dot);
    const fileBlockToMoveIndexes = [];
    // console.log(`pushing file block ${arr[i]} at index ${i}`);
    fileBlockToMoveIndexes.push(i);
    for (let j = i - 1; j > -1; j--) {
      // console.log(`checking arr[j] ${arr[j]} at index ${j}`);
      if (arr[j] === arr[i]) {
        // console.log(`pushing file block ${arr[j]} at index ${j}`);
        fileBlockToMoveIndexes.push(j);
      } else {
        // console.log("breaking the loop at index", j);
        break;
      }
    }
    const dotSequence = dot.padEnd(fileBlockToMoveIndexes.length, dot);
    // console.log(
    //   `resulting file block to move indexes is ${fileBlockToMoveIndexes} with length ${fileBlockToMoveIndexes.length}, so now we will look for the dot sequence ${dotSequence}`
    // );
    const dotSequenceLengh = fileBlockToMoveIndexes.length;
    let matchingDotsIndexes = [];
    if (arrString.includes(dotSequence)) {
      for (
        let startIdx = 0;
        startIdx <= arr.length - dotSequenceLengh;
        startIdx++
      ) {
        let consecutiveDots = 0;
        let tempIndexes = [];

        for (
          let checkIdx = startIdx;
          checkIdx < startIdx + dotSequenceLengh;
          checkIdx++
        ) {
          if (arr[checkIdx] === dot) {
            consecutiveDots++;
            tempIndexes.push(checkIdx);
          } else {
            break;
          }
        }

        if (
          consecutiveDots === dotSequenceLengh &&
          startIdx < Math.min(...fileBlockToMoveIndexes)
        ) {
          matchingDotsIndexes = tempIndexes;
          for (let k = 0; k < fileBlockToMoveIndexes.length; k++) {
            const fileBlockIndex = fileBlockToMoveIndexes[k];
            const dotIndex = matchingDotsIndexes[k];
            arr[dotIndex] = arr[fileBlockIndex];
            arr[fileBlockIndex] = dot;
          }
          break;
        }
      }
    } else {
      // console.log("dot sequence not found, skipping this file block");
      matchingDotsIndexes = [];
      skippedFileBlocks.push(arr[i]);
    }
    // console.log("arr", arr.map((n) => n.toString()).join(""));
  }
  // console.log("arr", arr.map((n) => n.toString()).join(""));
  // console.log("arr", arr);
  // console.log(
  //   "arr",
  //   arr.filter((block) => block !== dot)
  // );
  return arr;
}
