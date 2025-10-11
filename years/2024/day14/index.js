import { readLines } from '../../../utils/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const size = {
    wide: 101,
    tall: 103
}

/**
 * 1. Read input file
 * 2. Parse input file
 * 3. update robots positions based on velocity on x and y axes
 *     - get new coordinates baed on robot velocity times 100
 *       formula: new_px = px + vx * 100 % grid_width
 *                new_py = py + vy * 100 % grid_height
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

    const robots = lines.map(line => {
        const [position, velocity] = line.split(" ");
        const positionValues = position.split("=")[1];
        const velocityValues = velocity.split("=")[1];
        const [positionX, positionY] = positionValues.split(",").map(v => parseInt(v));
        const [velocityX, velocityY] = velocityValues.split(",").map(v => parseInt(v));
        const p = {x: positionX, y: positionY};
        const v = {x: velocityX, y: velocityY};
        return {p, v};
    })

    const updatedRobots = robots.map(robot => {
        const newP = {
            // new_px = px + vx * 100 % grid_width
            x: mod(robot.p.x + robot.v.x * 100, size.wide),
            // new_py = py + vy * 100 % grid_height
            y: mod(robot.p.y + robot.v.y * 100, size.tall),
        }
        return {p: newP, v: robot.v};
    })
    
    const rowToSkip = (size.tall - (size.tall % 2)) / 2;
    const colToSkip = (size.wide - (size.wide % 2)) / 2;

    console.log('rowToSkip', rowToSkip);
    console.log('colToSkip', colToSkip);

    let q1 = 0;
    let q2 = 0;
    let q3 = 0;
    let q4 = 0;

    for(let robot of updatedRobots){
        if(robot.p.y < rowToSkip && robot.p.x < colToSkip){
            q1++;
        } else if(robot.p.y < rowToSkip && robot.p.x > colToSkip ){
            q2++;
        } else if(robot.p.y > rowToSkip && robot.p.x < colToSkip){
            q3++;
        } else if(robot.p.y > rowToSkip && robot.p.x > colToSkip){
            q4++;
        }
    }

    console.log('q1', q1);
    console.log('q2', q2);
    console.log('q3', q3);
    console.log('q4', q4);

    return q1 * q2 * q3 * q4;
}

/**
 * Handle native js modulo operator for negative numbers
 * Source: https://stackoverflow.com/a/17323608
 */
function mod(n, m) {
  return ((n % m) + m) % m;
}

// export function part2() {
//     const lines = readLines(path.join(__dirname, 'input.txt'));
//     console.log('lines', lines);    
//     return 'TODO';
// }
