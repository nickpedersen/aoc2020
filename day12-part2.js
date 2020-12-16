const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day12input.txt")
  .toString()
  .split("\n");

const instructions = puzzleInput.map((l) => {
  return [l.slice(0, 1), Number(l.slice(1))];
});

let shipX = 0;
let shipY = 0;
let waypointX = 10;
let waypointY = -1;

const moveWaypoint = (dir, amount) => {
  switch (dir) {
    case "N": {
      waypointY -= amount;
      break;
    }
    case "S": {
      waypointY += amount;
      break;
    }
    case "E": {
      waypointX += amount;
      break;
    }
    case "W": {
      waypointX -= amount;
      break;
    }
  }
};

const turnLeft = () => {
  // Cache values before we set them
  const _waypointX = waypointX;
  const _waypointY = waypointY;
  waypointY = -_waypointX;
  waypointX = _waypointY;
};

const turnRight = () => {
  // Cache values before we set them
  const _waypointX = waypointX;
  const _waypointY = waypointY;
  waypointY = _waypointX;
  waypointX = -_waypointY;
};

const turnWaypoint = (amount) => {
  const turnCount = amount / 90;
  for (let i = 0; i < Math.abs(turnCount); i++) {
    if (amount > 0) {
      turnRight();
    } else {
      turnLeft();
    }
  }
};

const moveToWaypoint = (amount) => {
  for (let i = 0; i < amount; i++) {
    shipX += waypointX;
    shipY += waypointY;
  }
};

instructions.forEach(([instruction, amount]) => {
  switch (instruction) {
    case "N":
    case "S":
    case "E":
    case "W": {
      moveWaypoint(instruction, amount);
      break;
    }
    case "L": {
      turnWaypoint(-amount);
      break;
    }
    case "R": {
      turnWaypoint(amount);
      break;
    }
    case "F": {
      moveToWaypoint(amount);
      break;
    }
  }
});

const manhattanDistance = Math.abs(shipX) + Math.abs(shipY);

console.log(manhattanDistance);
