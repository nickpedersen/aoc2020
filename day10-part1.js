const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day10input.txt")
  .toString()
  .split("\n");

const numbers = puzzleInput.map((i) => Number(i));

const sorted = numbers.sort((a, b) => a - b);

const countDifferences = (difference) => {
  let count = 0;
  sorted.forEach((value, ix) => {
    const prev = sorted[ix - 1] || 0;
    if (value - prev === difference) {
      count++;
    }
  });

  // Add in the final 3 jolt jump
  if (difference === 3) {
    count++;
  }
  return count;
};

const oneJoltDifference = countDifferences(1);
const threeJoltDifference = countDifferences(3);

console.log(oneJoltDifference * threeJoltDifference);
