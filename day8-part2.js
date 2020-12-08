const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day8input.txt")
  .toString()
  .split("\n");

const runProgram = (program) => {
  let accumulator = 0;
  let executedLines = [0];
  let currentLine = 0;
  let infiniteLoop = false;

  while (true) {
    // If we reached the end, stop
    if (!program[currentLine]) break;
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
      infiniteLoop = true;
      break;
    } else {
      executedLines.push(currentLine);
    }
  }
  // Return the accumulator and an indication of whether we got stuck in a loop
  return [accumulator, infiniteLoop];
};

// This function is a bit messy, it could return a value (the correct accumulator)
// or `false` indicating the line wasn't the corrupted one and the program
// reached an infinite loop
const attemptFixProgram = (program, lineToTry) => {
  const isJump = program[lineToTry].startsWith("jmp");
  const isNoop = program[lineToTry].startsWith("nop");
  if (!isJump && !isNoop) {
    // This isn't a possible corrupted line
    return false;
  }
  const copiedProgram = program.slice();
  copiedProgram[lineToTry] = isJump
    ? copiedProgram[lineToTry].replace("jmp", "nop")
    : copiedProgram[lineToTry].replace("nop", "jmp");

  // Run the copied program and see if we get stuck in a loop
  const [accumulator, infiniteLoop] = runProgram(copiedProgram);

  if (infiniteLoop) return false;

  return accumulator;
};

// Try running through all possible corrupted lines
let index = 0;
let output;

while (true) {
  output = attemptFixProgram(puzzleInput, index);
  if (output !== false) {
    // This means we found an answer!
    break;
  }
  index++;
}

console.log(output);
