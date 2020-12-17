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

  let xSlots = [];
  maskParts.forEach((value, ix) => {
    if (value !== "0") {
      binary = `${binary.slice(0, ix)}${value}${binary.slice(ix + 1)}`;
    }
    if (value === "X") {
      xSlots.push(ix);
    }
  });

  let result = [];

  // There are 2^xCount possibilities now
  for (let i = 0; i < Math.pow(2, xSlots.length); i++) {
    const iAsBinary = i.toString(2).padStart(xSlots.length, 0);
    let possibleString = binary.slice();

    iAsBinary.split("").forEach((val, ix) => {
      const slot = xSlots[ix];
      possibleString = `${possibleString.slice(
        0,
        slot
      )}${val}${possibleString.slice(slot + 1)}`;
    });
    result.push(possibleString);
  }

  return result.map((r) => parseInt(r, 2));
};

puzzleInput.forEach((line) => {
  const [instruction, value] = line.split(" = ");
  if (instruction === "mask") {
    mask = value;
  } else {
    const address = Number(instruction.replace("mem[", "").replace("]", ""));
    const addresses = applyMask(Number(address), mask);
    addresses.forEach((a) => {
      memory[a] = Number(value);
    });
  }
});

const sum = Object.values(memory).reduce((prev, curr) => prev + curr, 0);
console.log(sum);
