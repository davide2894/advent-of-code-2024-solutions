import { readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lines = readLines(path.join(__dirname, "input.txt"));
const height = lines.length;
const width = lines[0].length;
const antennas = new Map();

function isInBounds(x, y) {
  return x >= 0 && x < width && y >= 0 && y < height;
}

function tryAddUniquePoint(x, y, uniquePoints) {
  if (!uniquePoints.has(`${x}-${y}`)) {
    uniquePoints.add(`${x}-${y}`);
  }
}

function buidAntennasMap() {
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
}

export function part1() {
  const uniquePoints = new Set();

  if (antennas.size === 0) {
    buidAntennasMap();
  }

  for (const [_, coords] of antennas) {
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

        if (isInBounds(firstAntinodeX, firstAntinodeY)) {
          tryAddUniquePoint(firstAntinodeX, firstAntinodeY, uniquePoints);
        }

        if (isInBounds(secondAntinodeX, secondAntinodeY)) {
          tryAddUniquePoint(secondAntinodeX, secondAntinodeY, uniquePoints);
        }
      }
    }
  }

  return uniquePoints.size;
}

export function part2() {
  const uniquePoints = new Set();

  if (antennas.size === 0) {
    buidAntennasMap();
  }

  for (const [_, coords] of antennas) {
    for (let i = 0; i < coords.length - 1; i++) {
      for (let j = i + 1; j < coords.length; j++) {
        const a = coords[i];
        const b = coords[j];

        const deltaX = b.x - a.x;
        const deltaY = b.y - a.y;
        let firstAntinodeX = a.x;
        let firstAntinodeY = a.y;
        let secondAntinodeX = b.x;
        let secondAntinodeY = b.y;

        while (isInBounds(firstAntinodeX, firstAntinodeY)) {
          tryAddUniquePoint(firstAntinodeX, firstAntinodeY, uniquePoints);
          firstAntinodeX -= deltaX;
          firstAntinodeY -= deltaY;
        }

        while (isInBounds(secondAntinodeX, secondAntinodeY)) {
          tryAddUniquePoint(secondAntinodeX, secondAntinodeY, uniquePoints);
          secondAntinodeX += deltaX;
          secondAntinodeY += deltaY;
        }
      }
    }
  }

  return uniquePoints.size;
}
