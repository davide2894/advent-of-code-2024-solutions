# Advent of Code Solutions

JavaScript solutions for Advent of Code problems.

## Setup

```bash
npm install
```

## Usage

### Running Solutions

```bash
# Run a specific day
npm start -- 2024 1

# Run all days for a year
npm start -- 2024

# Run with watch mode for development
npm run dev -- 2024 1
```

### Creating New Day

```bash
# Creates template files for a new day
npm run new -- 2024 1
```

## Structure

```
├── years/
│   └── 2024/
│       ├── day01/
│       │   ├── index.js
│       │   ├── input.txt
│       └── day02/
│           ├── index.js
│           ├── input.txt
├── utils/
│   └── index.js
└── runner.js
```

## Utilities

The `utils` module provides common functions for AoC problems:
- File reading and parsing
- Grid operations
- Math utilities
- String processing
- Array helpers

## Tips

1. Put your puzzle input in `input.txt`
2. Use the utilities for common operations
3. Each day exports `part1` and `part2` functions
