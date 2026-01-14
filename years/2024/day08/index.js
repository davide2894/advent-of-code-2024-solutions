import { readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1() {
  const lines = readLines(path.join(__dirname, "input.txt"));
  const height = lines.length;
  const width = lines[0].length;
  const antennas = new Map();
  const uniqueAntinodes = new Set();

  function isInBounds(x, y) {
    return x >= 0 && x < width && y >= 0 && y < height;
  }

  function tryAddUniqueAntinode(frequency, antinodeX, antinodeY) {
    if (!uniqueAntinodes.has(`${antinodeX}-${antinodeY}`)) {
      uniqueAntinodes.add(`${antinodeX}-${antinodeY}`);
    }
  }

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];
      if (char !== ".") {
        const coordinates = { x: j, y: i };
        if (antennas.has(char)) {
          antennas.get(char).push(coordinates);
        } else {
          antennas.set(char, [coordinates]);
        }
      }
    }
  }

  for (const [frequency, coords] of antennas) {
    for (let i = 0; i < coords.length - 1; i++) {
      const a = coords[i];
      for (let j = i + 1; j < coords.length; j++) {
        const b = coords[j];
        const deltaX = b.x - a.x;
        const deltaY = b.y - a.y;
        const firstAntinodeX = a.x - deltaX;
        const firstAntinodeY = a.y - deltaY;
        const secondAntinodeX = b.x + deltaX;
        const secondAntinodeY = b.y + deltaY;

        // check if antinode x and y is within bounds

        if (isInBounds(firstAntinodeX, firstAntinodeY)) {
          tryAddUniqueAntinode(frequency, firstAntinodeX, firstAntinodeY);
        }

        if (isInBounds(secondAntinodeX, secondAntinodeY)) {
          tryAddUniqueAntinode(frequency, secondAntinodeX, secondAntinodeY);
        }
      }
    }
  }

  console.log("Antennas:", antennas);
  console.log("uniqueAntinodes:", uniqueAntinodes);

  return uniqueAntinodes.size;
}
