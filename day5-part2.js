const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day5input.txt")
  .toString()
  .split("\n");

const binaryPartition = (str, upperKey) => {
  const max = Math.pow(2, str.length);
  let range = [0, max];
  str.split("").forEach((value) => {
    const remainingSize = range[1] - range[0];
    if (value === upperKey) {
      range[0] = range[1] - remainingSize / 2;
    } else {
      range[1] = range[0] + remainingSize / 2;
    }
  });
  return range[0];
};

const processLine = (line) => {
  const row = binaryPartition(line.slice(0, 7), "B");
  const col = binaryPartition(line.slice(7), "R");
  const seat = row * 8 + col;
  return [row, col, seat];
};

const seats = puzzleInput.map(processLine).map((r) => r[2]);

const allSeats = [...new Array(871)].map((_, ix) => ix);
const missingSeats = allSeats.filter((s) => !seats.includes(s));

const mySeat = missingSeats.find((s) => {
  return seats.includes(s - 1) && seats.includes(s + 1);
});

console.log(mySeat);
