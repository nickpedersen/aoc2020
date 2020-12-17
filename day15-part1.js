const input = `19,0,5,1,10,13`.split(",").map((t) => Number(t));

const numbers = [];

const findLastIndex = (arr, val) => {
  const ix = arr
    .slice(0, arr.length - 1)
    .reverse()
    .findIndex((v) => v === val);

  if (ix === -1) return ix;
  return arr.length - 1 - ix;
};

const findNextNumber = (i) => {
  if (i < input.length) {
    return input[i];
  }
  const lastNumber = numbers[i - 1];
  const ix = findLastIndex(numbers, lastNumber);
  if (ix === -1) {
    return 0;
  }
  return i - ix;
};

for (let i = 0; i <= 2020; i++) {
  const next = findNextNumber(i);
  numbers.push(next);
}

console.log(numbers[2020 - 1]);
