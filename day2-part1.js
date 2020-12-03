const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day2input.txt")
  .toString()
  .split("\n");

const formattedInput = puzzleInput.map((line) => {
  const parts = line.split(" ");
  const min = Number(parts[0].split("-")[0]);
  const max = Number(parts[0].split("-")[1]);
  const [character] = parts[1].split(":");
  const password = parts[2];
  return {
    min,
    max,
    character,
    password,
  };
});

const validCount = formattedInput.filter(
  ({ password, character, min, max }) => {
    const passwordParts = password.split("");
    const characterCount = passwordParts.filter((p) => p === character).length;
    const isValid = characterCount >= min && characterCount <= max;
    return isValid;
  }
).length;

console.log(validCount);
