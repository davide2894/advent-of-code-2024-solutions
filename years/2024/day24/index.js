import { readInput, readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lines = readLines(path.join(__dirname, "input.txt"));
const inputSeparatorIndex = lines.indexOf("");
const knownWires = lines.splice(0, inputSeparatorIndex);
const gates = lines.splice(1); // remove empty line

function calcOutput(value1, operator, value2) {
  if (operator === "AND") {
    return value1 & value2 ? 1 : 0;
  } else if (operator === "OR") {
    return value1 | value2 ? 1 : 0;
  } else if (operator === "XOR") {
    return value1 === value2 ? 0 : 1;
  }
}

export function solution() {
  const wires = new Map();
  const outputs = new Map();
  knownWires.forEach((wire) =>
    wires.set(wire.split(": ")[0], parseInt(wire.split(": ")[1]))
  );
  const corruptedWires = [];
  knownWires.forEach((wire) =>
    wires.set(wire.split(": ")[0], parseInt(wire.split(": ")[1]))
  );
  const processedGates = [];
  let processGates = true;

  while (processGates) {
    for (const gate of gates) {
      // if can process gate
      // check if inputs are known
      //  - if they are known
      //  - else -> skip
      // add gate to processed gates
      if (processedGates.includes(gate)) continue;
      const [operations, outputWire] = gate.split(" -> ");
      const [wire1, operator, wire2] = operations.split(" ");
      if (wires.get(wire1) === undefined || wires.get(wire2) === undefined) {
        continue;
      }
      const outputValue = calcOutput(
        wires.get(wire1),
        operator,
        wires.get(wire2)
      );

      wires.set(outputWire, outputValue);
      outputs.set(outputWire, outputValue);
      processedGates.push(gate);
    }

    // if processedGates contain all gates -> break
    if (processedGates.length === gates.length) {
      processGates = false;
    }
  }

  const sortedMap = new Map(
    [...outputs.entries()].sort((a, b) => {
      if (a[0] > b[0]) return -1;
      if (a[0] < b[0]) return 1;
      return 0;
    })
  );
  console.log("sortedMap", sortedMap);
  let result = "";

  // iterate map
  for (const [key, value] of sortedMap) {
    if (key.startsWith("z")) {
      result += value.toString();
    }
  }

  /**
   * 1. define corrupted wires array
   * 2. iterate over all gates
   * 3. apply checks to see if gate is corrupted
   * 4. if gate is corrupted, save its output wire into the array of corrupted wires
   */

  for (const gate of gates) {
    const [operations, outputWire] = gate.split(" -> ");
    const [wire1, operator, wire2] = operations.split(" ");

    if (outputWire.startsWith("z") && operator !== "XOR") {
      corruptedWires.push(outputWire);
    }

    if (operator === "XOR") {
      if (wire1.startsWith("x)" && wire2.startsWith("y"))) {
        // TODO: if the output is not used as input to any other gate, mark as corrupte
      } else {
        corruptedWires.push(outputWire);
      }
    }

    if (corruptedWires.length === 8) {
      // exite loop
      break;
    }
  }

  return JSON.stringify({
    part1: parseInt(result, 2),
    part2: corruptedWires.sort().join(","),
  });
}
