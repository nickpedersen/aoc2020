const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day12input.txt")
  .toString()
  .split("\n");

const instructions = puzzleInput.map((l) => {
  return [l.slice(0, 1), Number(l.slice(1))];
});

let x = 0;
let y = 0;
let direction = "E";

const move = (dir, amount) => {
  switch (dir) {
    case "N": {
      y -= amount;
      break;
    }
    case "S": {
      y += amount;
      break;
    }
    case "E": {
      x += amount;
      break;
    }
    case "W": {
      x -= amount;
      break;
    }
  }
};

const turn = (amount) => {
  const directions = ["N", "E", "S", "W"];
  const rotation = amount / 90;
  const ix = directions.indexOf(direction);
  // Index + rotation + directions.length forces the value to be positive
  // mod direction.length makes sure the value loops back around
  const newIx = (ix + rotation + directions.length) % directions.length;
  direction = directions[newIx];
};

instructions.forEach(([instruction, amount]) => {
  switch (instruction) {
    case "N":
    case "S":
    case "E":
    case "W": {
      move(instruction, amount);
      break;
    }
    case "L": {
      turn(-amount);
      break;
    }
    case "R": {
      turn(amount);
      break;
    }
    case "F": {
      move(direction, amount);
      break;
    }
  }
});

const manhattanDistance = Math.abs(x) + Math.abs(y);

console.log(manhattanDistance);
