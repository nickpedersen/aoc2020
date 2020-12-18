const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day17input.txt")
  .toString()
  .split("\n")
  .map((l) => l.split(""));

const emptyCol = () => [...new Array(30)].map((_) => ".");
const emptyPlane = () => [...new Array(30)].map((_) => emptyCol());
const emptyDimension = () => [...new Array(30)].map((_) => emptyPlane());
const board = [...new Array(30)].map((_) => emptyDimension());

// Start at x/y/z of 10 to make sure we have adequate space
puzzleInput.forEach((col, colIx) => {
  col.forEach((item, rowIx) => {
    board[10][10][10 + colIx][10 + rowIx] = item;
  });
});

const countNeighbours = (state, dimensionIx, planeIx, colIx, rowIx) => {
  let neighbourCoordinates = [];
  [-1, 0, 1].forEach((d) => {
    [-1, 0, 1].forEach((p) => {
      [-1, 0, 1].forEach((c) => {
        [-1, 0, 1].forEach((r) => {
          // Don't include self as a neighbour
          if (!(d === 0 && p === 0 && c === 0 && r === 0)) {
            neighbourCoordinates.push([
              dimensionIx - d,
              planeIx - p,
              colIx - c,
              rowIx - r,
            ]);
          }
        });
      });
    });
  });
  const neighbourValues = neighbourCoordinates.map(([d, p, c, r]) => {
    if (!state[d]) return ".";
    if (!state[d][p]) return ".";
    if (!state[d][p][c]) return ".";
    if (!state[d][p][c][r]) return ".";
    return state[d][p][c][r];
  });

  const activeNeighbours = neighbourValues.filter((p) => p === "#").length;
  return activeNeighbours;
};

const tick = (state) => {
  const nextState = state.map((dimension, dimensionIx) => {
    return dimension.map((plane, planeIx) => {
      return plane.map((col, colIx) => {
        return col.map((item, rowIx) => {
          const activeNeighbours = countNeighbours(
            state,
            dimensionIx,
            planeIx,
            colIx,
            rowIx
          );
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
  });
  return nextState;
};

let state = board;
for (let i = 0; i < 6; i++) {
  state = tick(state);
}

let activeCount = 0;
state.forEach((dimension) => {
  dimension.forEach((plane) => {
    plane.forEach((col) => {
      col.forEach((item) => {
        if (item === "#") activeCount++;
      });
    });
  });
});

console.log(activeCount);
