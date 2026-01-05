import { readInput, readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function part1() {
  /* 
    what do i need here:
    1. parse input to extract
        - all known wire values
        - all gates operations
    1. get all wire values
    2. calc outputs for all gates
    3. calc return value: 
    - use all outputs to calc final decimanl value
  */

  function calcOutput(value1, operator, value2) {
    if (operator === "AND") {
      return value1 & value2 ? 1 : 0;
    } else if (operator === "OR") {
      return value1 | value2 ? 1 : 0;
    } else if (operator === "XOR") {
      return value1 === value2 ? 0 : 1;
    }
  }

  const lines = readLines(path.join(__dirname, "input.txt"));
  const inputSeparatorIndex = lines.indexOf("");
  const knownWires = lines.splice(0, inputSeparatorIndex);
  const gates = lines.splice(1); // remove empty line
  console.log(knownWires);
  console.log(gates);
  const wires = new Map();
  const outputs = new Map();
  knownWires.forEach((wire) =>
    wires.set(wire.split(": ")[0], parseInt(wire.split(": ")[1]))
  );
  console.log("wires", wires);
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

      // TODO: something is wrong witg wires I use to calc final bits number
      // my calculation returns 0001011111100
      // while expected is      0011111101000
      wires.set(outputWire, outputValue);
      outputs.set(outputWire, outputValue);
      processedGates.push(gate);
    }

    // if processedGates contain all gates -> break
    if (processedGates.length === gates.length) {
      processGates = false;
    }
  }

  console.log("outputs", outputs);

  // process final output
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

  return parseInt(result, 2);
}
