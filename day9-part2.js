const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day9input.txt")
  .toString()
  .split("\n");

const numbers = puzzleInput.map((i) => Number(i));

const targetSum = 27911108;

const checkIndex = (initialIndex) => {
  let accumulation = 0;
  let index = initialIndex;
  while (true) {
    accumulation += numbers[index];
    if (accumulation > targetSum) {
      return false;
    } else if (accumulation === targetSum) {
      return numbers.slice(initialIndex, index + 1);
    } else {
      index++;
    }
  }
};

let index = 0;

while (true) {
  const result = checkIndex(index);
  if (!result) {
    index++;
  } else {
    const solution = Math.min(...result) + Math.max(...result);
    console.log(solution);
    break;
  }
}
