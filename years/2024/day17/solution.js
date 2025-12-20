import { readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lines = readLines(path.join(__dirname, "input.txt"));

// Parse input
const registerA = parseInt(lines[0].split(": ")[1]);
const registerB = parseInt(lines[1].split(": ")[1]);
const registerC = parseInt(lines[2].split(": ")[1]);
const program = lines[4].split(": ")[1].split(",").map(Number);

function runProgram(a, b, c, program) {
  let regA = a;
  let regB = b;
  let regC = c;
  let ip = 0;
  const output = [];

  const getCombo = (operand) => {
    if (operand <= 3) return operand;
    if (operand === 4) return regA;
    if (operand === 5) return regB;
    if (operand === 6) return regC;
    throw new Error("Invalid combo operand 7");
  };

  while (ip < program.length) {
    const opcode = program[ip];
    const operand = program[ip + 1];

    switch (opcode) {
      case 0: // adv
        regA = Math.floor(regA / Math.pow(2, getCombo(operand)));
        break;
      case 1: // bxl
        regB = regB ^ operand;
        break;
      case 2: // bst
        regB = ((getCombo(operand) % 8) + 8) % 8;
        break;
      case 3: // jnz
        if (regA !== 0) {
          ip = operand;
          continue;
        }
        break;
      case 4: // bxc
        regB = regB ^ regC;
        break;
      case 5: // out
        output.push(((getCombo(operand) % 8) + 8) % 8);
        break;
      case 6: // bdv
        regB = Math.floor(regA / Math.pow(2, getCombo(operand)));
        break;
      case 7: // cdv
        regC = Math.floor(regA / Math.pow(2, getCombo(operand)));
        break;
    }
    ip += 2;
  }

  return output;
}

function part1() {
  const output = runProgram(registerA, registerB, registerC, program);
  return output.join(",");
}

function part2() {
  // Work backwards from the END
  // If we want output [... x], find which A%8 values give output ending in x
  // Then for those, multiply by 8 and try 0-7 to find [... y, x]

  let candidates = [0];

  for (let length = 1; length <= program.length; length++) {
    const targetSuffix = program.slice(-length);

    const newCandidates = [];
    for (const baseA of candidates) {
      for (let digit = 0; digit < 8; digit++) {
        const candidateA = baseA * 8 + digit;
        const output = runProgram(candidateA, registerB, registerC, program);

        if (output.length >= length) {
          const outputSuffix = output.slice(-length);
          if (outputSuffix.every((v, i) => v === targetSuffix[i])) {
            newCandidates.push(candidateA);
          }
        }
      }
    }

    if (newCandidates.length === 0) {
      return null;
    }

    candidates = newCandidates;
  }

  // Return the smallest candidate that produces the full output
  candidates.sort((a, b) => a - b);
  for (const candidate of candidates) {
    const output = runProgram(candidate, registerB, registerC, program);
    if (
      output.length === program.length &&
      output.every((v, i) => v === program[i])
    ) {
      return candidate;
    }
  }

  return null;
}

console.log("Part 1:", part1());
console.log("Part 2:", part2());
