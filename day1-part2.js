const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day1input.txt")
  .toString()
  .split("\n")
  .map((i) => Number(i));

// Loop through each number and compare to each other number
// We can skip earlier numbers in the sequence since they would
// have been tested earlier
let solutionNumbers = [null, null, null];

solutionNumbers[0] = puzzleInput.find((number, ix) => {
  const toCompareSecond = puzzleInput.slice(ix);
  return (solutionNumbers[1] = toCompareSecond.find(
    (compareNumberSecond, ixSecond) => {
      // Run the same .find loop here, but this time slice from the index of both joined
      const toCompareThird = puzzleInput.slice(ix + ixSecond);
      return (solutionNumbers[2] = toCompareThird.find((compareNumberThird) => {
        return number + compareNumberSecond + compareNumberThird === 2020;
      }));
    }
  ));
});

console.log(solutionNumbers[0] * solutionNumbers[1] * solutionNumbers[2]);
