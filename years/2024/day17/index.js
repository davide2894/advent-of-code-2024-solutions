import { readLines } from "../../../utils/index.js";
import path, { parse } from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lines = readLines(path.join(__dirname, "input.txt"));
const instructionsLine = lines[4];
const instructions = instructionsLine
  .split(": ")[1]
  .split(",")
  .map((x) => x.trim())
  .map((x) => parseInt(x));

export function run(regA, regB, regC) {
  /**
   * - Extract input
   *    - extract register values
   *    - extract instructiions
   *       - extract
   *       - put in pairs
   * - run through instructions
   *   - for each instruction, update registers accordingly
   *   - keep track of the result
   *
   */

  function dv(numerator, operand) {
    const denominator = 2 ** operand;
    const result = numerator / denominator;
    return result;
  }

  function adv(registerA, operand) {
    return Math.trunc(dv(registerA, operand));
  }

  function bdv(registerA, operand) {
    return Math.trunc(dv(registerA, operand));
  }

  function cdv(registerA, operand) {
    return Math.trunc(dv(registerA, operand));
  }

  function bxl(registerB, instructionLiteralOperand) {
    return registerB ^ instructionLiteralOperand; // calc result
  }

  function bst(combo) {
    return ((combo % 8) + 8) % 8;
  }

  function jnz(registerA) {
    if (registerA !== 0) {
      // The jnz instruction (opcode 3) does nothing if the A register is 0.
      // However, if the A register is not zero,
      // it jumps by setting the instruction pointer to the value of its literal operand;
      // if this instruction jumps, the instruction pointer is not increased by 2 after this instruction.
    }
  }

  function bxc(registerB, registerC) {
    return registerB ^ registerC;
  }

  function out(combo) {
    //The out instruction (opcode 5) calculates the value of its combo operand modulo 8,
    // then outputs that value. (If a program outputs multiple values, they are separated by commas.)
    return ((combo % 8) + 8) % 8;
  }

  function getOperand(input) {
    switch (input) {
      case 4:
        return registerA;
      case 5:
        return registerB;
      case 6:
        return registerC;
      default:
        return input;
    }
  }

  let registerA = regA;
  let registerB = regB;
  let registerC = regC;
  const outRsesults = [];

  for (let i = 0; i < instructions.length; i += 2) {
    const opCode = instructions[i];
    let operand = getOperand(instructions[i + 1]);
    switch (opCode) {
      case 0:
        registerA = adv(registerA, operand);
        break;
      case 1:
        operand = instructions[i + 1];
        registerB = bxl(registerB, operand);
        break;
      case 2:
        registerB = bst(operand);
        break;
      case 3:
        operand = instructions[i + 1];
        if (registerA !== 0) {
          i = operand - 2;
        }
        break;
      case 4:
        registerB = bxc(registerB, registerC);
        break;
      case 5:
        outRsesults.push(out(operand));
        break;
      case 6:
        registerB = bdv(registerA, operand);
        break;
      case 7:
        registerC = cdv(registerA, operand);
        break;
    }
  }

  return outRsesults.join(",");
}

export function part1() {
  let registerA = parseInt(lines[0].split(": ")[1]);
  let registerB = parseInt(lines[1].split(": ")[1]);
  let registerC = parseInt(lines[2].split(": ")[1]);
  return run(registerA, registerB, registerC);
}

export function part2() {
  let registerB = parseInt(lines[1].split(": ")[1]);
  let registerC = parseInt(lines[2].split(": ")[1]);

  // Build candidates iteratively, starting from length 1 up to full program length
  let candidates = [0];

  for (let length = 1; length <= instructions.length; length++) {
    const targetSuffix = instructions.slice(-length);
    const newCandidates = [];

    for (const baseA of candidates) {
      for (let digit = 0; digit < 8; digit++) {
        const candidateA = baseA * 8 + digit;
        const output = run(candidateA, registerB, registerC)
          .split(",")
          .map((x) => parseInt(x));

        if (output.length >= length) {
          const outputSuffix = output.slice(-length);
          if (outputSuffix.every((v, i) => v === targetSuffix[i])) {
            newCandidates.push(candidateA);
          }
        }
      }
    }

    if (newCandidates.length === 0) {
      return "No solution found";
    }

    candidates = newCandidates;
  }

  // Return the smallest candidate that produces the full output
  candidates.sort((a, b) => a - b);
  for (const candidate of candidates) {
    const output = run(candidate, registerB, registerC)
      .split(",")
      .map((x) => parseInt(x));
    if (
      output.length === instructions.length &&
      output.every((v, i) => v === instructions[i])
    ) {
      return candidate;
    }
  }

  return "No solution found";
}
