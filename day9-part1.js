const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day9input.txt")
  .toString()
  .split("\n");

const numbers = puzzleInput.map((i) => Number(i));

const checkIndex = (index) => {
  const validOptions = numbers.slice(index - 25, index);
  const currentNumber = numbers[index];
  // Check if any option has another valid option that
  // sums to the current number
  let partnerFound = false;
  validOptions.forEach((n) => {
    if (validOptions.includes(currentNumber - n)) {
      partnerFound = true;
    }
  });
  return partnerFound;
};

let index = 25;

while (true) {
  const isValid = checkIndex(index);
  if (isValid) {
    index++;
  } else {
    console.log(numbers[index]);
    break;
  }
}
