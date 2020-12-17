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

let validTickets = [];

otherTickets.forEach((ticket) => {
  let isValid = true;
  ticket.forEach((field) => {
    if (!validateField(field)) isValid = false;
  });
  if (isValid) validTickets.push(ticket);
});

// Store all possible indexes a rule could land in
let viableRuleIndex = rules.map((rule) => {
  return rules.map((_, ix) => ix);
});

const validateRule = (field, rule) => {
  let valid = false;
  rule.ranges.forEach(([min, max]) => {
    if (field >= min && field <= max) {
      valid = true;
    }
  });
  return valid;
};

// Run through and start invalidating rules
[...validTickets, ticket].forEach((ticket) => {
  ticket.forEach((field, fieldIx) => {
    rules.forEach((rule, ruleIx) => {
      const isValid = validateRule(field, rule);
      if (!isValid) {
        // If the rule isn't valid, this indicates
        // this field (index) can't correspond to this
        // rule
        viableRuleIndex[ruleIx] = viableRuleIndex[ruleIx].filter(
          (r) => r !== fieldIx
        );
      }
    });
  });
});

const ruleIndexes = [];
// Find any rules that could only possible live at one index
while (true) {
  const knownRule = viableRuleIndex.findIndex((r) => r.length === 1);
  // If we can't find any more rules, stop
  if (knownRule === -1) {
    break;
  }
  ruleIndexes[knownRule] = viableRuleIndex[knownRule][0];
  // Remove that number from all other values
  viableRuleIndex = viableRuleIndex.map((r) => {
    return r.filter((v) => v !== ruleIndexes[knownRule]);
  });
}

// Find all the departure rules
let ticketValues = [];
rules.forEach((r, ix) => {
  if (r.name.startsWith("departure")) {
    const index = ruleIndexes[ix];
    const valueOnTicket = ticket[index];
    ticketValues.push(valueOnTicket);
  }
});

console.log(ticketValues.reduce((prev, curr) => prev * curr, 1));
