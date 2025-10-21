import { readInput, readLines } from '../../../utils/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MOVE = {
    UP: '^',
    DOWN: 'v',
    LEFT: '<',
    RIGHT: '>',
}

function calculateSumOfAllBoxes(grid) {}

function getGridAfterMovements(grid, movements) {
    console.log('grid', grid);
    console.log('movements', movements);
}




export function part1() {
    const lines = readLines(path.join(__dirname, 'input.txt'));
    const grid = lines.splice(0, lines.indexOf('')).map(row => row.split(''));
    const moves = lines.splice(lines.indexOf('')).filter(el => el !== "").map(m => m.split(''));
    const gridAfterMoves = getGridAfterMovements(grid, moves);
    const sumOfAllBoxes = calculateSumOfAllBoxes(gridAfterMoves);
    return sumOfAllBoxes;
}

// export function part2() {
//     const lines = readLines(path.join(__dirname, 'input.txt'));
//     console.log('lines', lines);    
//     return 'TODO';
// }
