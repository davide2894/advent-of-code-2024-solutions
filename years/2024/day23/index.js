import { readInput, readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1() {
  const lines = readLines(path.join(__dirname, "input.txt"));
  console.log("lines", lines);
  const adj = new Map();
  const triangles = new Set();
  let count = 0;

  for (const line of lines) {
    const [a, b] = line.split("-");
    if (!adj.has(a)) {
      adj.set(a, new Set());
    }
    if (!adj.has(b)) {
      adj.set(b, new Set());
    }
    adj.get(a).add(b);
    adj.get(b).add(a);
  }

  console.log("adj", adj);

  const nodes = Array.from(adj.keys());
  console.log("nodes", nodes);

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      console.log("checking", a, b);
      // check if edge exists between a and b
      if (adj.get(a).has(b)) {
        // look for common neightbors
        for (const c of adj.get(a)) {
          // check if c is connected to b
          if (adj.get(b).has(c)) {
            // found a triangle
            const triangle = [a, b, c].sort().join(",");
            triangles.add(triangle);
          }
        }
      }
    }
  }

  for (const trianngle of triangles) {
    const [a, b, c] = trianngle.split(",");
    if (a.startsWith("t") || b.startsWith("t") || c.startsWith("t")) {
      count++;
    }
  }

  return count;
}
