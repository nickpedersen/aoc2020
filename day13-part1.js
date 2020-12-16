const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day13input.txt")
  .toString()
  .split("\n");

const earliestDepartureTime = Number(puzzleInput[0]);

const busTimes = puzzleInput[1]
  .split(",")
  .filter((t) => t !== "x")
  .map((t) => Number(t));

const waitTimes = busTimes.map(
  (t) => Math.ceil(earliestDepartureTime / t) * t - earliestDepartureTime
);

const earliestBusIx = waitTimes.indexOf(Math.min(...waitTimes));

console.log(busTimes[earliestBusIx] * Math.min(...waitTimes));
