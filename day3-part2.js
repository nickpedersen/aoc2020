const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day3input.txt")
  .toString()
  .split("\n");

const map = puzzleInput.map((line) => line.split(""));

const mapWidth = map[0].length;

const evaluateSlope = (xSlope, ySlope) => {
  let x = 0,
    y = 0;

  let treeCount = 0;

  while (y < map.length - 1) {
    x += xSlope;
    y += ySlope;

    const currentLocation = map[y][x % mapWidth];
    if (currentLocation === "#") treeCount++;
  }
  return treeCount;
};

const allSlopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const allTrees = allSlopes.map(([x, y]) => evaluateSlope(x, y));

console.log(allTrees.reduce((prev, curr) => prev * curr, 1));
