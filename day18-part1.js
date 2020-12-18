const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day18input.txt")
  .toString()
  .split("\n");

const evaluateString = (string) => {
  let nextOperator = "+";
  let count = 0;

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

  instructions.forEach((instruction) => {
    if (instruction.startsWith("(")) {
      // Recursively run this method again
      const v = evaluateString(instruction.slice(1, instruction.length - 1));
      if (nextOperator === "+") {
        count += v;
      } else {
        count *= v;
      }
    }
    switch (instruction) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0": {
        if (nextOperator === "+") {
          count += Number(instruction);
        } else {
          count *= Number(instruction);
        }
      }
      case "+":
      case "*": {
        nextOperator = instruction;
      }
    }
  });
  return count;
};

const counts = puzzleInput.map((i) => evaluateString(i));
console.log(counts.reduce((prev, curr) => prev + curr, 0));
