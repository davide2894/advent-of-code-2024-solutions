import { readLines } from "../../../utils/index.js";
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

export function part1() {
  const wires = new Map();
  const outputs = new Map();
  const processedGates = [];
  let shouldProcessGates = true;

  knownWires.forEach((wire) =>
    wires.set(wire.split(": ")[0], parseInt(wire.split(": ")[1]))
  );
  knownWires.forEach((wire) =>
    wires.set(wire.split(": ")[0], parseInt(wire.split(": ")[1]))
  );

  while (shouldProcessGates) {
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

    if (processedGates.length === gates.length) {
      shouldProcessGates = false;
    }
  }

  const sortedMap = new Map(
    [...outputs.entries()].sort((a, b) => {
      if (a[0] > b[0]) return -1;
      if (a[0] < b[0]) return 1;
      return 0;
    })
  );

  let part1Output = "";

  for (const [key, value] of sortedMap) {
    if (key.startsWith("z")) {
      part1Output += value.toString();
    }
  }

  return parseInt(part1Output, 2);
}

export function part2() {
  const inputAssociatedOperators = new Map();
  const corruptedWires = [];

  for (const gate of gates) {
    const [operations] = gate.split(" -> ");
    const [wire1, operator, wire2] = operations.split(" ");

    if (!inputAssociatedOperators.has(wire1)) {
      inputAssociatedOperators.set(wire1, [operator]);
    }
    if (!inputAssociatedOperators.get(wire1).includes(operator)) {
      inputAssociatedOperators.get(wire1).push(operator);
    }
    if (!inputAssociatedOperators.has(wire2)) {
      inputAssociatedOperators.set(wire2, [operator]);
    }
    if (!inputAssociatedOperators.get(wire2).includes(operator)) {
      inputAssociatedOperators.get(wire2).push(operator);
    }
  }

  for (const gate of gates) {
    const [operations, outputWire] = gate.split(" -> ");
    const [wire1, operator, wire2] = operations.split(" ");
    const isXYInput =
      wire1.startsWith("x") ||
      wire2.startsWith("y") ||
      wire1.startsWith("y") ||
      wire2.startsWith("x");
    const isFirstBit =
      wire1 === "x00" || wire1 === "y00" || wire2 === "x00" || wire2 === "y00";
    const isLastBit = outputWire === "z45";

    if (outputWire.startsWith("z") && !isLastBit && operator !== "XOR") {
      corruptedWires.push(outputWire);
      continue;
    }

    if (operator === "XOR" && !outputWire.startsWith("z") && !isXYInput) {
      corruptedWires.push(outputWire);
      continue;
    }

    if (operator === "XOR" && isXYInput && !isFirstBit) {
      const inputOperators = inputAssociatedOperators.get(outputWire);
      if (!inputOperators.includes("XOR")) {
        corruptedWires.push(outputWire);
        continue;
      }
    }

    if (operator === "AND" && isXYInput && !isFirstBit) {
      const inputOperators = inputAssociatedOperators.get(outputWire);
      if (!inputOperators.includes("OR")) {
        corruptedWires.push(outputWire);
        continue;
      }
    }
  }

  return corruptedWires.sort().join(",");
}
