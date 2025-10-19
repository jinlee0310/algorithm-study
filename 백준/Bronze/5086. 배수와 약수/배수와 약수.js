const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim()
  .split("\n")
  .slice(0, -1);

const getRelation = (n, m) => {
  if (n % m === 0) return "multiple";
  else if (m % n === 0) return "factor";
  else return "neither";
};

const answer = input
  .map((v) => v.split(" ").map(Number))
  .map(([n, m]) => getRelation(n, m));

console.log(answer.join("\n"));
