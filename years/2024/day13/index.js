import { readLines } from '../../../utils/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lines = readLines(path.join(__dirname, 'input.txt'));


// 1: parse input into machines
// 2. for each machine
    // - solve machine
    // - store result
// 3. calculate total cost

/*
* A_x * A_presses + B_x * B_presses = prize_x;
* A_y * A_presses + B_y * B_presses = prize_y;
*/

function solveMachine(machine, hasLimit) {
  const { buttonA, buttonB, prize } = machine;
  
  // Calculate b (B button presses)
  const numeratorB = prize.y * buttonA.x - buttonA.y * prize.x;
  const denominatorB = buttonB.y * buttonA.x - buttonA.y * buttonB.x;
  
  // Check if there's no solution (denominator is 0)
  if (denominatorB === 0) {
    return null;
  }
  
  const b = numeratorB / denominatorB;
  
  // Calculate a (A button presses)
  const a = (prize.x - buttonB.x * b) / buttonA.x;
  
  // Check if solutions are valid:
  // 1. Must be positive integers
  // 2. Must be within limits (≤100 for part 1)
  if (
    !Number.isInteger(a) || 
    !Number.isInteger(b) || 
    a < 0 || 
    b < 0 ||
    hasLimit && (a > 100 || b > 100)
  ) {
    return null;
  }
  
  // Calculate cost: A costs 3 tokens, B costs 1 token
  const cost = a * 3 + b * 1;
  
  return { aPresses: a, bPresses: b, cost };
}

export function part1() {
  let totalCost = 0;
  const parsedMachines = getParsedMachines(lines);
  const formattedMachines = getFormattedMachines(parsedMachines, false);

  for(const machine of formattedMachines) {
    const solvedMachine = solveMachine(machine, true);
    if(solvedMachine) {
      totalCost += solvedMachine.cost;
    }
  }

  return totalCost;
}

export function part2() {
  let totalCost = 0;
  const parsedMachines = getParsedMachines(lines);
  const formattedMachines = getFormattedMachines(parsedMachines, true);

  for(const machine of formattedMachines) {
    const solvedMachine = solveMachine(machine, false);
    if(solvedMachine) {
      totalCost += solvedMachine.cost;
    }
  }

  return totalCost;
}

function getParsedMachines(lines) {
  const result = [];

  for(let i = 0; i < lines.length; i += 4) {
    if(lines[i] && lines[i+1] && lines[i+2]) {
      result.push([lines[i], lines[i+1], lines[i+2]]);
    }
  }

  return result;
}

function getFormattedMachines(parsedMachines, shouldFixConversionError) {
  const formattedMachines = new Array(parsedMachines.length);

  for(let i = 0; i < parsedMachines.length; i++) {
    formattedMachines[i] = formatMachine(parsedMachines[i], shouldFixConversionError);
  }

  return formattedMachines;
}

function formatMachine(input, shouldFixConversionError) {
  const buttonA = extractMachinePart(input[0].toString());
  const buttonB = extractMachinePart(input[1].toString());
  const prize = extractMachinePart(input[2].toString(), true, shouldFixConversionError);
  return { buttonA, buttonB, prize };
}

function extractMachinePart(rawString, isPrize = false, shouldFixConversionError) {
  const values = rawString.split(":")[1].trim().split(", ");
  const x = values[0].split("+")[1] ?? values[0].split("=")[1];
  const y = values[1].split("+")[1] ?? values[1].split("=")[1];
  const parsedX = parseInt(x);
  const parsedY = parseInt(y);
  let returnedX = parsedX;
  let returnedY = parsedY;

  if(shouldFixConversionError) {
    const conversionFix = 10000000000000;
    returnedX = parsedX + conversionFix;
    returnedY = parsedY + conversionFix;
  }

  return { x: returnedX, y: returnedY };
}


