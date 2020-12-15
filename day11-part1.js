const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day11input.txt")
  .toString()
  .split("\n")
  .map((l) => l.split(""));

const width = puzzleInput.length;
const height = puzzleInput[0].length;

const simulateRound = (previousRound) => {
  let changes = 0;
  const nextRound = previousRound.map((row, rowIx) => {
    return row.map((seat, colIx) => {
      if (seat === ".") return ".";

      const adjacentSeatIndexes = [
        [rowIx - 1, colIx - 1],
        [rowIx, colIx - 1],
        [rowIx + 1, colIx - 1],
        [rowIx - 1, colIx],
        [rowIx + 1, colIx],
        [rowIx - 1, colIx + 1],
        [rowIx, colIx + 1],
        [rowIx + 1, colIx + 1],
      ];

      const adjacentSeats = adjacentSeatIndexes.map(([r, c]) => {
        if (r < 0) return null;
        if (r >= width) return null;
        if (c < 0) return null;
        if (c >= height) return null;
        return previousRound[r][c];
      });

      const currentSeatOccupied = seat === "#";
      const occupiedSeats = adjacentSeats.filter((s) => s === "#").length;

      if (!currentSeatOccupied && occupiedSeats === 0) {
        changes++;
        return "#";
      } else if (currentSeatOccupied && occupiedSeats >= 4) {
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
