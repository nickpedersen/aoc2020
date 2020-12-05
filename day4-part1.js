const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day4input.txt")
  .toString()
  .split("\n\n");

const formatPassport = (str) => {
  const singleLine = str.replace(/\n/gi, " ");
  const attributes = singleLine.split(" ");
  const pairs = attributes.map((attr) => attr.split(":"));
  return pairs.reduce((prev, [key, val]) => ({ ...prev, [key]: val }), {});
};

const formattedPassports = puzzleInput.map(formatPassport);

const validatePassport = (passport) => {
  const requiredFields = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid",
    // "cid",
  ];
  const fields = Object.keys(passport);

  const validation = requiredFields.map((f) => fields.includes(f));
  const validCount = validation.filter((v) => !!v).length;
  return validCount === validation.length;
};

console.log(formattedPassports.filter(validatePassport).length);
