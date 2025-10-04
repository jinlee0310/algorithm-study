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
  .split("\n");

const solution = (input) => {
  const odds = input.map(Number).filter((v) => v % 2 === 1);

  if (odds.length === 0) {
    console.log(-1);
    return;
  }

  const sum = odds.reduce((acc, cur) => acc + cur, 0);
  const min = Math.min(...odds);
  console.log([sum, min].join("\n"));
};

solution(input);
