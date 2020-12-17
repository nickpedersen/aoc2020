const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day14input.txt")
  .toString()
  .split("\n");

const memory = {};

let mask = null;

const applyMask = (number, mask) => {
  let binary = number.toString(2).padStart(36, "0");

  const maskParts = mask.split("");
  maskParts.forEach((value, ix) => {
    if (value !== "X") {
      binary = `${binary.slice(0, ix)}${value}${binary.slice(ix + 1)}`;
    }
  });

  return parseInt(binary, 2);
};

puzzleInput.forEach((line) => {
  const [instruction, value] = line.split(" = ");
  if (instruction === "mask") {
    mask = value;
  } else {
    const address = Number(instruction.replace("mem[", "").replace("]", ""));
    memory[address] = applyMask(Number(value), mask);
  }
});

const sum = Object.values(memory).reduce((prev, curr) => prev + curr, 0);
console.log(sum);
