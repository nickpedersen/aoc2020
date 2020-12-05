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
  const rules = {
    byr: (val) => {
      return val && Number(val) >= 1920 && Number(val) <= 2002;
    },
    iyr: (val) => {
      return val && Number(val) >= 2010 && Number(val) <= 2020;
    },
    eyr: (val) => {
      return val && Number(val) >= 2020 && Number(val) <= 2030;
    },
    hgt: (val) => {
      if (!val) return false;
      if (val.includes("cm")) {
        return (
          Number(val.replace("cm", "")) >= 150 &&
          Number(val.replace("cm", "")) <= 193
        );
      } else if (val.includes("in")) {
        return (
          Number(val.replace("in", "")) >= 59 &&
          Number(val.replace("in", "")) <= 76
        );
      } else {
        return false;
      }
    },
    hcl: (val) => {
      if (!val) return false;
      return /^#[0-9a-f]{6}$/i.test(val);
    },
    ecl: (val) => {
      return (
        val && ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(val)
      );
    },
    pid: (val) => {
      return val && val.length === 9;
    },
    cid: (val) => true,
  };

  let isValid = true;
  Object.keys(rules).forEach((key) => {
    if (!rules[key]) return;
    const ruleIsValid = rules[key](passport[key]);
    if (!ruleIsValid) {
      isValid = false;
    }
  });
  return isValid;
};

console.log(formattedPassports.filter(validatePassport).length);
