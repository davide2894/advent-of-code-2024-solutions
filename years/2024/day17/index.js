import { readInput, readLines } from "../../../utils/index.js";
import path, { parse } from "path";
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
    const denominator = 2 ^ operand;
    return opCode / denominator;
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

  const lines = readLines(path.join(__dirname, "input.txt"));
  console.log(lines);
  let registerA = parseInt(lines[0].split(": ")[1]);
  let registerB = parseInt(lines[1].split(": ")[1]);
  let registerC = parseInt(lines[2].split(": ")[1]);
  const outRsesults = [];
  console.log("Register A:", registerA);
  console.log("Register B:", registerB);
  console.log("Register C:", registerC);
  const instructionsLine = lines[4];
  const instructions = instructionsLine
    .split(": ")[1]
    .split(",")
    .map((x) => x.trim())
    .map((x) => parseInt(x));
  console.log("Instructions:", instructions);

  for (let i = 0; i < instructions.length; i += 2) {
    const opCode = instructions[i];
    const operand = getOperand(instructions[i + 1]);
    console.log("OpCode:", opCode, "Operand:", operand);
    switch (opCode) {
      case 0:
        console.log("case 0, Executing BXL");
        bxl(registerB, operand);
        break;
      case 1:
        console.log("case 1, Executing BST");
        bst(parseInt(operand));
        break;
      case 2:
        console.log("case 2, Executing JNZ");
        jnz(registerA);
        break;
      case 3:
        console.log("case 3, Executing BXC");
        bxc(registerB, registerC);
        break;
      case 4:
        console.log("case 4, Executing OUT");
        out();
        break;
      case 5:
        console.log("case 5, Executing BDV");
        bdv(registerB, operand);
        break;
      case 6:
        console.log("case 6, Executing CDV");
        cdv(registerC, operand);
        break;
    }
  }

  //TODO: code is there but doesn't woerk as intended yet
  console.log("Output results:", outRsesults);

  return "TODO";
}
