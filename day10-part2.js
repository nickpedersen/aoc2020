const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day10input.txt")
  .toString()
  .split("\n");

const numbers = puzzleInput.map((i) => Number(i));

const sorted = numbers.sort((a, b) => a - b);

// Finds the adapters that this value could be plugged in to
const findPossibleJumps = (endValue) => {
  return [0, ...numbers].filter((n) => endValue - n > 0 && endValue - n <= 3);
};

const chains = {};

// Starting at the smallest adapter, keep track of the number
// of possibilities to reach that adapter
// By working forwards we should always have the values of the parents
// figured out, so we can add those to the chain
sorted.forEach((value) => {
  const possibleParents = findPossibleJumps(value);
  let total = 0;
  possibleParents.forEach((parent) => {
    // Or 1 is to accomodate the parent of 0 which doesn't exist in the numbers
    total += chains[parent] || 1;
  });
  chains[value] = total;
});

const lastChain = Math.max(...Object.keys(chains));
console.log(chains[lastChain]);
