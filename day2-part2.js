const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day2input.txt")
  .toString()
  .split("\n");

const formattedInput = puzzleInput.map((line) => {
  const parts = line.split(" ");
  const ix0 = Number(parts[0].split("-")[0]);
  const ix1 = Number(parts[0].split("-")[1]);
  const [character] = parts[1].split(":");
  const password = parts[2];
  return {
    ix0,
    ix1,
    character,
    password,
  };
});

const validCount = formattedInput.filter(
  ({ password, character, ix0, ix1 }) => {
    const passwordParts = password.split("");
    const position1Valid = passwordParts[ix0 - 1] === character;
    const position2Valid = passwordParts[ix1 - 1] === character;
    const isValid =
      (position1Valid || position2Valid) && !(position1Valid && position2Valid);

    return isValid;
  }
).length;

console.log(validCount);
