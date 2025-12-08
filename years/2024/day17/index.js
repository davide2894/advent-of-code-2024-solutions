import { readInput, readLines } from "../../../utils/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function solution() {
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

  function adv(opCode, operand) {
    return opCode / operand;
  }

  function bxl(registerB, instructionLiteralOperand) {
    const result = registerB ^ instructionLiteralOperand; // calc result
    registerB = result;
  }

  function bst(combo) {
    const result = combo % 8;
    registerB = result;
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
    const result = registerB ^ registerC;
    registerB = result;
  }

  function out() {
    //The out instruction (opcode 5) calculates the value of its combo operand modulo 8,
    // then outputs that value. (If a program outputs multiple values, they are separated by commas.)

    outRsesults.push(registerB % 8);
  }

  function bdv(opCode, operand) {
    registerB = adv(opCode, operand);
  }

  function cdv(opCode, operand) {
    registerB = adv(opCode, operand);
  }

  const lines = readLines(path.join(__dirname, "input.txt"));
  console.log(lines);
  let registerA = parseInt(lines[0].split(": ")[1]);
  let registerB = parseInt(lines[1].split(": ")[1]);
  let registerC = parseInt(lines[2].split(": ")[1]);
  const outRsesults = [];
  console.log("Register A:", registerA);
  console.log("Register B:", registerB);
  console.log("Register C:", registerC);
  const instructions = lines[4];
  console.log("Instructions:", instructions);

  return "TODO";
}
