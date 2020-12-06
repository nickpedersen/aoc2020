const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day6input.txt")
  .toString()
  .split("\n\n");

const processGroup = (groupString) => {
  const people = groupString.split("\n");

  const lettersHash = {};

  people.forEach((person) => {
    person.split("").forEach((letter) => {
      if (!lettersHash[letter]) lettersHash[letter] = 0;
      lettersHash[letter] += 1;
    });
  });

  const allAnsweredYes = Object.keys(lettersHash).filter(
    (l) => lettersHash[l] === people.length
  );

  return allAnsweredYes.length;
};

const yesCounts = puzzleInput.map(processGroup);

const totalCount = yesCounts.reduce((prev, curr) => prev + curr, 0);

console.log(totalCount);
