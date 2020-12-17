const input = `19,0,5,1,10,13`.split(",").map((t) => Number(t));

const limit = 30000000;

const numbers = [];
// 🔥🔥🔥 Knowing the size of an array speeds this up insanely
const indexHash = new Array(limit);

const findNextNumber = (i) => {
  if (i < input.length) {
    return input[i];
  }
  const lastNumber = numbers[i - 1];
  const ix = indexHash[lastNumber];
  if (ix === undefined) {
    return 0;
  }
  return i - ix - 1;
};

let prev;
for (let i = 0; i <= limit; i++) {
  const next = findNextNumber(i);
  indexHash[prev] = i - 1;
  numbers.push(next);
  prev = next;
}

console.log(numbers[limit - 1]);
