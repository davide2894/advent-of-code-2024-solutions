import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runSolution(year, day) {
  const dayStr = day.toString().padStart(2, "0");
  const solutionPath = path.join(
    __dirname,
    "years",
    year.toString(),
    `day${dayStr}`,
    "index.js"
  );

  if (!fs.existsSync(solutionPath)) {
    console.log(`❌ Solution not found: ${solutionPath}`);
    return;
  }

  try {
    const { solution, part1, part2 } = await import(solutionPath);
    const inputPath = path.join(path.dirname(solutionPath), "input.txt");

    if (!fs.existsSync(inputPath)) {
      console.log(`❌ Input file not found: ${inputPath}`);
      return;
    }

    console.log(`\n🎄 Running ${year} Day ${day}`);
    console.log("━".repeat(30));

    if (solution) {
      //   console.time("solution");
      const result1 = await solution();
      //   console.timeEnd("solution");
      console.log(`solution: ${result1}`);
    }

    if (part1) {
      //   console.time("Part 1");
      const result1 = await part1();
      //   console.timeEnd("Part 1");
      console.log(`Part 1: ${result1}`);
    }

    if (part2) {
      //   console.time("Part 2");
      const result2 = await part2();
      //   console.timeEnd("Part 2");
      console.log(`Part 2: ${result2}`);
    }
  } catch (error) {
    console.error(`❌ Error running solution:`, error.message);
    console.error(error.stack);
  }
}

async function runAllDays(year) {
  const yearPath = path.join(__dirname, "years", year.toString());

  if (!fs.existsSync(yearPath)) {
    console.log(`❌ Year ${year} not found`);
    return;
  }

  const days = fs
    .readdirSync(yearPath)
    .filter((dir) => dir.startsWith("day"))
    .map((dir) => parseInt(dir.slice(3)))
    .sort((a, b) => a - b);

  for (const day of days) {
    await runSolution(year, day);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Usage: npm start -- <year> [day]");
  console.log("Examples:");
  console.log("  npm start -- 2024 1    # Run day 1 of 2024");
  console.log("  npm start -- 2024      # Run all days of 2024");
  process.exit(1);
}

const year = parseInt(args[0]);
const day = args[1] ? parseInt(args[1]) : null;

if (day) {
  await runSolution(year, day);
} else {
  await runAllDays(year);
}
