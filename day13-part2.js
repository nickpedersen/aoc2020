const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day13input.txt")
  .toString()
  .split("\n");

const busTimes = puzzleInput[1]
  .split(",")
  .map((t, ix) => ({ val: t === "x" ? -1 : Number(t), ix }))
  .filter((t) => t.val !== -1);

// Function looks something like:
// (time + index) % ID === 0
// We can probably increment by the highest one each time and test
// against the others
// This is a niave solution but it'll work
const checkTime = (val, ix) => {
  return (time + ix) % val === 0;
};

let time = 0;
let jump = busTimes[0].val;
let busIx = 0;

while (true) {
  // Check if the next bus passes
  const currentBus = busTimes[busIx + 1];
  if (!currentBus) {
    // We made it to the end!
    break;
  }
  if (checkTime(currentBus.val, currentBus.ix)) {
    // If this bus is fine, increase the jump
    jump *= currentBus.val;
    busIx++;
  } else {
    // Otherwise iterate
    time += jump;
  }
}
console.log(time);
