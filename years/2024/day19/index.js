import { count } from "console";
import { readInput, readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lines = readLines(path.join(__dirname, "input.txt"));
const patterns = lines[0].split(",").map((x) => x.trim());
const designs = lines.slice(2);

export function part1() {
  function canFormDesign(design) {
    // Create array to track which positions we can reach
    const reachable = Array(design.length + 1).fill(false);

    // Set starting position to true
    // Corresponds to empty string
    reachable[0] = true;

    // Loop through each position in the design
    for (let i = 1; i <= design.length; i++) {
      // Try each pattern
      for (const pattern of patterns) {
        // Check if pattern fits ending at position i
        if (i >= pattern.length) {
          // Extract substring from design
          const substring = design.substring(i - pattern.length, i);

          // Check if substring matches pattern AND we could reach the position before
          if (substring === pattern && reachable[i - pattern.length]) {
            reachable[i] = true;
            break; // Found a way, stop checking other patterns
          }
        }
      }
    }

    return reachable[design.length];
  }

  // Count how many designs are possible
  return designs.filter(canFormDesign).length;
}

export function part2() {
  function countWaysToFormDesign(design) {
    const ways = Array(design.length + 1).fill(0);
    ways[0] = 1;

    // loop through each position in the design
    for (let i = 1; i <= design.length; i++) {
      // try each pattern
      for (const pattern of patterns) {
        if (i >= pattern.length) {
          const substring = design.substring(i - pattern.length, i);
          if (substring === pattern) {
            ways[i] += ways[i - pattern.length];
          }
        }
      }
    }
    return ways[design.length];
  }

  let waysCount = 0;

  for (const design of designs) {
    waysCount += countWaysToFormDesign(design);
  }

  return waysCount;
}
