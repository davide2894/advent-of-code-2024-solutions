import { readInput, readLines } from '../../../utils/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * 1. Read input file
 * 2. Parse input file
 * 3. update robots positions based on velocity on x and y axes
 *     - get new coordinates baed on robot velocity times 100
 * 4. determine x,y to skip for quadrants
 * 5. caclulate safest area
 *  - for each robot
 *    - if robot position is in q1 bounds -> q1++
 *    - if robot position is in q2 bounds -> q2++
 *    - if robot position is in q3 bounds -> q3++
 *    - if robot position is in q4 bounds -> q4++
 * 6. calculate final result -> q1 * q2 * q3 * q4
 * 7. return result
 */

export function part1() {
    const lines = readLines(path.join(__dirname, 'input.txt'));
    console.log('lines', lines);    
    return 'TODO';
}

export function part2() {
    const lines = readLines(path.join(__dirname, 'input.txt'));
    console.log('lines', lines);    
    return 'TODO';
}
