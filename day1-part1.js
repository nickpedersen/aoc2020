const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day1input.txt")
  .toString()
  .split("\n")
  .map((i) => Number(i));

// Loop through each number and compare to each other number
// We can skip earlier numbers in the sequence since they would
// have been tested earlier
let solutionNumbers = [null, null];

solutionNumbers[0] = puzzleInput.find((number, ix) => {
  const toCompare = puzzleInput.slice(ix);
  return (solutionNumbers[1] = toCompare.find((compareNumber) => {
    return number + compareNumber === 2020;
  }));
});

console.log(solutionNumbers[0] * solutionNumbers[1]);
