const fs = require("fs");
const path = require("path");

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
  const avg = input.map(Number).reduce((acc, cur) => acc + cur, 0) / 5;
  const mid = input.map(Number).sort((a, b) => a - b)[2];

  console.log([avg, mid].join("\n"));
};

solution(input);
