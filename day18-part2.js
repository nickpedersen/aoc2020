const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day18input.txt")
  .toString()
  .split("\n");

// const puzzleInput = `2 * 3 + (4 * 5)
// 5 + (8 * 3 + 9 + 3 * 4 * 3)
// 5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))
// ((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`.split("\n");

const evaluateString = (string) => {
  let instructions = [];
  const pieces = string.split("").filter((p) => p !== " ");

  let bracketCount = 0;
  let insideBracketString = "";

  pieces.forEach((p) => {
    if (p === "(") {
      bracketCount++;
    }

    if (bracketCount > 0) {
      insideBracketString = `${insideBracketString}${p}`;
    } else {
      instructions.push(p);
    }

    if (p === ")") {
      bracketCount--;

      if (bracketCount === 0) {
        instructions.push(insideBracketString);
        insideBracketString = "";
      }
    }
  });

  // Evaluate the brackets
  instructions.forEach((instruction, ix) => {
    if (instruction.startsWith("(")) {
      const v = evaluateString(instruction.slice(1, instruction.length - 1));
      // replace with result
      instructions[ix] = v;
    }
  });

  // Evaluate the plusses
  instructions.forEach((instruction, ix) => {
    if (instruction === "+") {
      const prevNumber = instructions[ix - 1];
      const nextNumber = instructions[ix + 1];
      // replace with result
      instructions[ix - 1] = null;
      instructions[ix] = null;
      instructions[ix + 1] = Number(prevNumber) + Number(nextNumber);
    }
  });

  // Strip the nulls
  instructions = instructions.filter((f) => f !== null);

  // Evaluate the multiplication
  instructions.forEach((instruction, ix) => {
    if (instruction === "*") {
      const prevNumber = instructions[ix - 1];
      const nextNumber = instructions[ix + 1];
      // replace with result
      instructions[ix - 1] = null;
      instructions[ix] = null;
      instructions[ix + 1] = Number(prevNumber) * Number(nextNumber);
    }
  });

  // There should only be one non-null left and that's our number
  instructions = instructions.filter((f) => f !== null);

  return instructions[0];
};

const counts = puzzleInput.map((i) => evaluateString(i));
console.log(counts.reduce((prev, curr) => prev + curr, 0));
