const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day16input.txt")
  .toString()
  .split("\n\n");

const rules = puzzleInput[0].split("\n").map((r) => {
  const [name, rest] = r.split(":");
  const ranges = rest.trim().split(" or ");
  const parsedRanges = ranges.map((rr) => rr.split("-").map((n) => Number(n)));
  return { name, ranges: parsedRanges };
});

const ticket = puzzleInput[1]
  .replace("your ticket:\n", "")
  .split(",")
  .map((n) => Number(n));

const otherTickets = puzzleInput[2]
  .replace("nearby tickets:\n", "")
  .split("\n")
  .map((t) => {
    return t
      .replace("your ticket:\n", "")
      .split(",")
      .map((n) => Number(n));
  });

const validateField = (field) => {
  let valid = false;
  rules.forEach((rule) => {
    rule.ranges.forEach(([min, max]) => {
      if (field >= min && field <= max) {
        valid = true;
      }
    });
  });
  return valid;
};

let invalidFields = [];

otherTickets.forEach((ticket) => {
  ticket.forEach((field) => {
    const isValid = validateField(field);
    if (!isValid) invalidFields.push(field);
  });
});

console.log(invalidFields.reduce((prev, curr) => prev + curr, 0));
