const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day17input.txt")
  .toString()
  .split("\n")
  .map((l) => l.split(""));

const emptyCol = () => [...new Array(30)].map((_) => ".");
const emptyPlane = () => [...new Array(30)].map((_) => emptyCol());
const board = [...new Array(30)].map((_) => emptyPlane());

// Start at x/y/z of 10 to make sure we have adequate space
puzzleInput.forEach((col, colIx) => {
  col.forEach((item, rowIx) => {
    board[10][10 + colIx][10 + rowIx] = item;
  });
});

const countNeighbours = (state, planeIx, colIx, rowIx) => {
  const neighbourCoordinates = [
    [planeIx - 1, colIx - 1, rowIx - 1],
    [planeIx - 1, colIx - 1, rowIx],
    [planeIx - 1, colIx - 1, rowIx + 1],
    [planeIx - 1, colIx, rowIx - 1],
    [planeIx - 1, colIx, rowIx],
    [planeIx - 1, colIx, rowIx + 1],
    [planeIx - 1, colIx + 1, rowIx - 1],
    [planeIx - 1, colIx + 1, rowIx],
    [planeIx - 1, colIx + 1, rowIx + 1],

    [planeIx, colIx - 1, rowIx - 1],
    [planeIx, colIx - 1, rowIx],
    [planeIx, colIx - 1, rowIx + 1],
    [planeIx, colIx, rowIx - 1],
    [planeIx, colIx, rowIx + 1],
    [planeIx, colIx + 1, rowIx - 1],
    [planeIx, colIx + 1, rowIx],
    [planeIx, colIx + 1, rowIx + 1],

    [planeIx + 1, colIx - 1, rowIx - 1],
    [planeIx + 1, colIx - 1, rowIx],
    [planeIx + 1, colIx - 1, rowIx + 1],
    [planeIx + 1, colIx, rowIx - 1],
    [planeIx + 1, colIx, rowIx],
    [planeIx + 1, colIx, rowIx + 1],
    [planeIx + 1, colIx + 1, rowIx - 1],
    [planeIx + 1, colIx + 1, rowIx],
    [planeIx + 1, colIx + 1, rowIx + 1],
  ];

  const neighbourValues = neighbourCoordinates.map(([p, c, r]) => {
    if (!state[p]) return ".";
    if (!state[p][c]) return ".";
    if (!state[p][c][r]) return ".";
    return state[p][c][r];
  });

  const activeNeighbours = neighbourValues.filter((p) => p === "#").length;
  return activeNeighbours;
};

const tick = (state) => {
  const nextState = state.map((plane, planeIx) => {
    return plane.map((col, colIx) => {
      return col.map((item, rowIx) => {
        const activeNeighbours = countNeighbours(state, planeIx, colIx, rowIx);
        if (item === "#") {
          if (activeNeighbours === 2 || activeNeighbours === 3) {
            return "#";
          } else {
            return ".";
          }
        } else if (activeNeighbours === 3) {
          return "#";
        } else {
          return ".";
        }
      });
    });
  });
  return nextState;
};

let state = board;
for (let i = 0; i < 6; i++) {
  state = tick(state);
}

let activeCount = 0;
state.forEach((plane) => {
  plane.forEach((col) => {
    col.forEach((item) => {
      if (item === "#") activeCount++;
    });
  });
});

console.log(activeCount);
