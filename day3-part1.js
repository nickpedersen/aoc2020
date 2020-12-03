const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day3input.txt")
  .toString()
  .split("\n");

const map = puzzleInput.map((line) => line.split(""));

const mapWidth = map[0].length;

let x = 0,
  y = 0;

let treeCount = 0;

while (y < map.length - 1) {
  x += 3;
  y += 1;

  const currentLocation = map[y][x % mapWidth];
  if (currentLocation === "#") treeCount++;
}

console.log(treeCount);
