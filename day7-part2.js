const fs = require("fs");

const puzzleInput = fs
  .readFileSync(__dirname + "/day7input.txt")
  .toString()
  .split("\n");

const processRule = (rule) => {
  const bag = rule.split("contain")[0].replace("bags", "").trim();

  const isEmpty = rule.includes("no other bags");

  if (isEmpty) {
    return { bag, contents: [] };
  }
  const contents = rule
    .split("contain")[1]
    .split(",")
    .map((c) => c.trim())
    .map((c) => {
      const count = Number(c.split(" ")[0]);
      const bagType = c
        .replace(`${count} `, "")
        .replace("bags", "")
        .replace("bag", "")
        .replace(".", "")
        .trim();
      return { count, bag: bagType };
    });
  return { bag, contents };
};

const rules = puzzleInput.map(processRule);

let currentBags = [{ bag: "shiny gold", count: 1, evaluated: false }];

const evaluateBags = () => {
  const unevaluatedBags = currentBags.filter((b) => !b.evaluated);
  unevaluatedBags.forEach((b) => {
    const { contents } = rules.find((r) => r.bag === b.bag);
    currentBags.push(
      ...contents.map((c) => ({
        ...c,
        count: c.count * b.count,
        evaluated: false,
      }))
    );
    b.evaluated = true;
  });
};

while (true) {
  const unevaluatedBags = currentBags.filter((b) => !b.evaluated);
  if (!unevaluatedBags.length) {
    break;
  }
  evaluateBags();
}

const totalBagCount = currentBags.reduce((prev, curr) => prev + curr.count, 0);

// Remove the shiny gold from count
console.log(totalBagCount - 1);
