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
    return combo % 8;
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
    return combo % 8;
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
  let registerA = parseInt(lines[0].split(": ")[1]);
  let registerB = parseInt(lines[1].split(": ")[1]);
  let registerC = parseInt(lines[2].split(": ")[1]);

  // In part 1 the program loops 6 times, and
  // each iteration it divides register A by 8
  // Strategy:
  // - calc min and max attempts to reach 0 in register A
  // - brute force program executiiton with register A values in that range

  const minAttempts = 8 ** 15;
  const maxAttempts = 8 ** 16;

  //TODO:
  // this brute force strategy doesnt work for very large ranges...
  // Need to find a better way
  for (let i = minAttempts; i <= maxAttempts; i++) {
    const result = run(i, registerB, registerC);
    if (result === instructions.join(",")) {
      return i;
    }
  }

  return "No solution found";
}
