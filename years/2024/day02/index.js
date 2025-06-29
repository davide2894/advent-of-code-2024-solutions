import { setFips } from "crypto";
import { readInput, readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lines = readLines(path.join(__dirname, "input.txt"));
const mappedLines = lines.map((line) =>
  line.split(/\s+/).map((num) => parseInt(num, 10))
);

function isSafeReport(report) {
  let isIncreasing = null;
  for (let j = 0; j < report.length - 1; j++) {
    const currentReportNumber = report[j];
    const nextReportNumber = report[j + 1];
    const difference = Math.abs(currentReportNumber - nextReportNumber);
    const nextNumberIsIncreasing = nextReportNumber > currentReportNumber;

    if (isIncreasing === null) {
      isIncreasing = nextNumberIsIncreasing;
    }

    if (
      isIncreasing !== nextNumberIsIncreasing ||
      difference < 1 ||
      difference > 3
    ) {
      return false;
    }
  }
  return true;
}

function isSafeReportWithTolerance(report) {
  if (isSafeReport(report)) {
    return true;
  }

  for (let i = 0; i < report.length; i++) {
    const updatedReport = report.slice(0, i).concat(report.slice(i + 1));
    if (isSafeReport(updatedReport)) {
      return true;
    }
  }

  return false;
}

export function part1() {
  let safeReportsCount = 0;

  for (let i = 0; i < mappedLines.length; i++) {
    const report = mappedLines[i];

    if (isSafeReport(report)) {
      safeReportsCount++;
    }
  }

  return safeReportsCount;
}

export function part2() {
  let safeReportsCount = 0;
  for (let i = 0; i < mappedLines.length; i++) {
    const report = mappedLines[i];

    if (isSafeReportWithTolerance(report)) {
      safeReportsCount++;
    }
  }

  return safeReportsCount;
}
