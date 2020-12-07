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

const findPossibleParents = (bag) => {
  const possibleParents = rules.filter((r) =>
    r.contents.find((c) => c.bag === bag)
  );
  return possibleParents.map((p) => p.bag);
};

let possibleBags = ["shiny gold"];
while (true) {
  const currentCount = possibleBags.length;
  const possibleParents = possibleBags
    .map((p) => findPossibleParents(p))
    .flat();

  possibleParents.forEach((p) => {
    if (!possibleBags.includes(p)) {
      possibleBags.push(p);
    }
  });
  const updatedCount = possibleBags.length;

  if (currentCount === updatedCount) {
    break;
  }
}

// Remove the shiny gold bag
console.log(possibleBags.length - 1);
