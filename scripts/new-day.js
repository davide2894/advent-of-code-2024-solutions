import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TEMPLATE = `import { readInput, readLines } from '../../../utils/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
`;

function createNewDay(year, day) {
  const dayStr = day.toString().padStart(2, "0");
  const dayPath = path.join(
    __dirname,
    "..",
    "years",
    year.toString(),
    `day${dayStr}`
  );

  // Create directory
  fs.mkdirSync(dayPath, { recursive: true });

  // Create files
  const indexPath = path.join(dayPath, "index.js");
  const inputPath = path.join(dayPath, "input.txt");
  const examplePath = path.join(dayPath, "example.txt");

  if (!fs.existsSync(indexPath)) {
    fs.writeFileSync(indexPath, TEMPLATE);
    console.log(`✅ Created ${indexPath}`);
  } else {
    console.log(`⚠️  ${indexPath} already exists`);
  }

  if (!fs.existsSync(inputPath)) {
    fs.writeFileSync(inputPath, "");
    console.log(`✅ Created ${inputPath}`);
  } else {
    console.log(`⚠️  ${inputPath} already exists`);
  }

  if (!fs.existsSync(examplePath)) {
    fs.writeFileSync(examplePath, "");
    console.log(`✅ Created ${examplePath}`);
  } else {
    console.log(`⚠️  ${examplePath} already exists`);
  }

  console.log(`\n🎄 Ready to solve ${year} Day ${day}!`);
  console.log(`📁 Files created in: ${dayPath}`);
  console.log(`\nNext steps:`);
  console.log(`1. Copy your puzzle input to ${inputPath}`);
  console.log(`2. Copy the example input to ${examplePath}`);
  console.log(`3. Implement your solution in ${indexPath}`);
  console.log(`4. Run with: npm start -- ${year} ${day}`);
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.log("Usage: npm run new -- <year> <day>");
  console.log("Example: npm run new -- 2024 1");
  process.exit(1);
}

const year = parseInt(args[0]);
const day = parseInt(args[1]);

if (isNaN(year) || isNaN(day) || day < 1 || day > 25) {
  console.log("❌ Invalid year or day. Day must be between 1 and 25.");
  process.exit(1);
}

createNewDay(year, day);
