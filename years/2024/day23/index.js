import { readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lines = readLines(path.join(__dirname, "input.txt"));
const adj = new Map();

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

export function part1() {
  const triangles = new Set();
  let count = 0;
  const nodes = Array.from(adj.keys());

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
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

export function part2() {
  // 1. find largest set of computers that are all connected to each other
  // 2. return the password, which is the concatenation of their names in alphabetical order
  console.log("adj", adj);
  const nodes = Array.from(adj.keys());
  console.log("nodes", nodes);
  let largestClique = [];

  for (let i = 0; i < nodes.length; i++) {
    const currentClique = [nodes[i]];
    // check all pairings of current nodes and its neighbors
    for (let j = i + 1; j < nodes.length; j++) {
      // check if neightbor node is connected to all nodes in clique
      const neightbor = nodes[j];
      let isConnectedToAll = currentClique.every((cliqueNode) =>
        adj.get(cliqueNode).has(neightbor)
      );
      if (isConnectedToAll) {
        currentClique.push(neightbor);
      }
    }
    if (currentClique.length > largestClique.length) {
      largestClique = currentClique;
    }
  }

  console.log("largestClique", largestClique);

  return largestClique.sort().join(",");
}
