const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day11input.txt")
  .toString()
  .split("\n")
  .map((l) => l.split(""));

const width = puzzleInput.length;
const height = puzzleInput[0].length;

// Looks in a direction (denoted by xFactor and yFactor)
// For the nearest seat and returns the value found
const findNearestSeat = (layout, initialR, initialC, rFactor, cFactor) => {
  let r = initialR;
  let c = initialC;

  let result = null;

  while (true) {
    // Move
    r += rFactor;
    c += cFactor;

    // Check if value exists
    if (r < 0) break;
    if (r >= width) break;
    if (c < 0) break;
    if (c >= height) break;

    if (layout[r][c] !== ".") {
      result = layout[r][c];
      break;
    }
    // If we hit a ., run another round
  }
  return result;
};

const simulateRound = (previousRound) => {
  let changes = 0;
  const nextRound = previousRound.map((row, rowIx) => {
    return row.map((seat, colIx) => {
      if (seat === ".") return ".";

      const adjacentSeats = [
        findNearestSeat(previousRound, rowIx, colIx, -1, -1),
        findNearestSeat(previousRound, rowIx, colIx, 0, -1),
        findNearestSeat(previousRound, rowIx, colIx, 1, -1),
        findNearestSeat(previousRound, rowIx, colIx, -1, 0),
        findNearestSeat(previousRound, rowIx, colIx, 1, 0),
        findNearestSeat(previousRound, rowIx, colIx, -1, 1),
        findNearestSeat(previousRound, rowIx, colIx, 0, 1),
        findNearestSeat(previousRound, rowIx, colIx, 1, 1),
      ];

      const currentSeatOccupied = seat === "#";
      const occupiedSeats = adjacentSeats.filter((s) => s === "#").length;

      if (!currentSeatOccupied && occupiedSeats === 0) {
        changes++;
        return "#";
      } else if (currentSeatOccupied && occupiedSeats >= 5) {
        changes++;
        return "L";
      } else {
        return seat;
      }
    });
  });
  return [nextRound, changes];
};

let currentState = puzzleInput;

// Loop until no more changes
while (true) {
  const [nextState, changes] = simulateRound(currentState);
  currentState = nextState;
  if (!changes) {
    break;
  }
}

// Count occupied seats
let occupiedSeats = 0;

currentState.forEach((row) => {
  row.forEach((seat) => {
    if (seat === "#") occupiedSeats++;
  });
});

console.log(occupiedSeats);
