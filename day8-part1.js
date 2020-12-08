const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day8input.txt")
  .toString()
  .split("\n");

const runProgram = (program) => {
  let accumulator = 0;
  let executedLines = [0];
  let currentLine = 0;

  while (true) {
    const [instruction, _value] = program[currentLine].split(" ");
    const value = Number(_value);
    switch (instruction) {
      case "nop":
        currentLine++;
        break;
      case "acc":
        accumulator += value;
        currentLine++;
        break;
      case "jmp":
        currentLine += value;
        break;
    }
    // Check if the new line has been run before
    if (executedLines.includes(currentLine)) {
      break;
    } else {
      executedLines.push(currentLine);
    }
  }
  return accumulator;
};

const output = runProgram(puzzleInput);

console.log(output);
