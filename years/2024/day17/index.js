import { get } from "http";
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

  function dv(numerator, operand) {
    console.log(
      "Calculating DV with numerator:",
      numerator,
      "and operand:",
      operand
    );
    const denominator = 2 ** operand;
    const result = numerator / denominator;
    console.log("result of dv:", result);
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
        console.log(
          "Since input is 4, returning register A as operand, which is:",
          registerA
        );
        return registerA;
      case 5:
        console.log(
          "Since input is 5, returning register B as operand, which is:",
          registerB
        );
        return registerB;
      case 6:
        console.log(
          "Since input is 6, returning register C as operand, which is:",
          registerC
        );
        return registerC;
      default:
        console.log(`since input is ${input}, returning it as operand`);
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
    console.log("Processing instruction at index:", i);
    console.log(
      "Current Registers - A:",
      registerA,
      "B:",
      registerB,
      "C:",
      registerC
    );
    const opCode = instructions[i];
    let operand = getOperand(instructions[i + 1]);
    switch (opCode) {
      case 0:
        console.log("case 0, Executing ADV");
        registerA = adv(registerA, operand);
        break;
      case 1:
        console.log("case 1, Executing BXL");
        operand = instructions[i + 1];
        registerB = bxl(registerB, operand);
        break;
      case 2:
        console.log("case 2, Executing BST");
        registerB = bst(operand);
        break;
      case 3:
        console.log("case 3, Executing JNZ");
        operand = instructions[i + 1];
        if (registerA !== 0) {
          console.log("current operand is:", operand);
          console.log("current i:", i);
          console.log("setting i to:", operand - 2);
          console.log("new i will be:", operand - 2);
          i = operand - 2;
        }
        break;
      case 4:
        console.log("case 4, Executing BXC");
        registerB = bxc(registerB, registerC);
        break;
      case 5:
        console.log("case 5, Executing OUT");
        outRsesults.push(out(operand));
        break;
      case 6:
        console.log("case 6, Executing BDV");
        registerB = bdv(registerA, operand);
        break;
      case 7:
        console.log("case 7, Executing CDV");
        registerC = cdv(registerA, operand);
        break;
    }
  }

  console.log("Output results:", outRsesults);

  return outRsesults.join(",");
}
